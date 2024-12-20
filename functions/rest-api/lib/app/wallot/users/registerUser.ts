import { v4 } from 'uuid';
import {
	RegisterUserParams,
	RegisterUserResponse,
	usersApi,
	authCredentialsApi,
	equityAccountsApi,
	licensesApi,
	getHomeWebAppRoute,
} from '@wallot/js';
import { FunctionResponse } from '@wallot/node';
import { auth, db } from '../../../services.js';
import { siteOriginByTarget } from '../../../variables.js';
import { createStripeCustomer } from '../../stripe/customers/createStripeCustomer.js';
import { sendWelcomeEmail } from './sendWelcomeEmail.js';
import { scheduleActivationReminderEmails } from './scheduleActivationReminderEmails.js';

export const registerUser = async ({
	email,
	password,
	username,
}: RegisterUserParams): Promise<FunctionResponse<RegisterUserResponse>> => {
	// Check that the username is unique
	const usernameDoc = await db
		.collection(usersApi.collectionId)
		.where('username', '==', username)
		.get();
	if (!usernameDoc.empty) {
		throw new Error('Username already exists');
	}

	// Check that the email is not already registered
	const emailDoc = await db
		.collection(authCredentialsApi.collectionId)
		.where('emails', 'array-contains', email)
		.get();
	if (!emailDoc.empty) {
		throw new Error('Email already registered');
	}

	// Initialize Firestore document IDs
	const userDocId = usersApi.generateId();
	const authCredentialDocId = authCredentialsApi.generateId();
	const equityAccountDocId = equityAccountsApi.generateId();
	const licenseDocId = licensesApi.generateId();

	// Initialize a Firestore batch transaction
	const batch = db.batch();

	// Register a Firebase User
	const firebaseUser = await auth.createUser({
		email,
		password,
		uid: authCredentialDocId,
	});

	// Create a Stripe Customer
	const stripeCustomer = await createStripeCustomer({
		email,
		metadata: { user_id: userDocId },
		username,
	});

	// Create a USER Firestore document
	const activationReminderTaskId = v4();
	const userDoc = usersApi.mergeCreateParams({
		createParams: {
			_id: userDocId,
			activation_reminder_task_id: activationReminderTaskId,
			category: 'default',
			name: '',
			stripe_customer_id: stripeCustomer.id,
			username,
		},
	});
	batch.set(db.collection(usersApi.collectionId).doc(userDocId), userDoc);

	// Create an AUTH_CREDENTIAL Firestore document
	const authCredentialDoc = authCredentialsApi.mergeCreateParams({
		createParams: {
			_id: authCredentialDocId,
			category: 'default',
			emails: [email],
			name: '',
			user: userDocId,
		},
	});
	batch.set(
		db.collection(authCredentialsApi.collectionId).doc(authCredentialDocId),
		authCredentialDoc,
	);

	// Create an EQUITY_ACCOUNT Firestore document
	const equityAccountDoc = equityAccountsApi.mergeCreateParams({
		createParams: {
			_id: equityAccountDocId,
			category: 'default',
			name: '',
			user: userDocId,
		},
	});
	batch.set(
		db.collection(equityAccountsApi.collectionId).doc(equityAccountDocId),
		equityAccountDoc,
	);

	// Create a LICENSE Firestore document
	const licenseDoc = licensesApi.mergeCreateParams({
		createParams: {
			_id: licenseDocId,
			category: 'default',
			name: '',
			user: userDocId,
		},
	});
	batch.set(
		db.collection(licensesApi.collectionId).doc(licenseDocId),
		licenseDoc,
	);

	// Commit the batch transaction
	await batch.commit();

	// Create a Firebase custom token (JWT)
	const customToken = await auth.createCustomToken(firebaseUser.uid);

	// Construct the redirect URL using custom token
	const redirectUrl = getHomeWebAppRoute({
		includeOrigin: true,
		origin: siteOriginByTarget.HOME_WEB_APP,
		queryParams: { client_token: customToken },
		routeStaticId: 'HOME_WEB_APP__/GET_STARTED',
	});

	// Construct the post-response callback
	const onFinished = async () => {
		// Send welcome email to USER
		await sendWelcomeEmail({ email, username });

		// Schedule activation reminder emails for USER
		await scheduleActivationReminderEmails({
			activationReminderTaskId,
			email,
			username,
		});
	};

	return {
		json: { custom_token: customToken, redirect_url: redirectUrl },
		onFinished,
	};
};
