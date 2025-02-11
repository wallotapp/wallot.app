import {
	RegisterUserParams,
	RegisterUserResponse,
	usersApi,
	licensesApi,
	getHomeSiteRoute,
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
	redirect_uri,
	username,
}: RegisterUserParams): Promise<FunctionResponse<RegisterUserResponse>> => {
	// Check that the username is unique and email is not already registered
	const [usernameDoc, emailDoc] = await Promise.all([
		db
			.collection(usersApi.collectionId)
			.where('username', '==', username)
			.get(),
		db
			.collection(usersApi.collectionId)
			.where('firebase_auth_email', '==', email)
			.get(),
	]);
	if (!usernameDoc.empty) {
		throw new Error('Username already exists');
	}
	if (!emailDoc.empty) {
		throw new Error('Email already registered');
	}

	// Initialize Firestore document IDs
	const userDocId = usersApi.generateId();
	const licenseDocId = licensesApi.generateId();

	// Initialize a Firestore batch transaction
	const batch = db.batch();

	// Register a Firebase User
	const firebaseUser = await auth.createUser({
		email,
		password,
		uid: userDocId,
	});

	// Create a USER Firestore document
	const userDoc = usersApi.mergeCreateParams({
		createParams: {
			_id: userDocId,
			category: 'default',
			firebase_auth_email: email,
			name: '',
			username,
		},
	});
	batch.set(db.collection(usersApi.collectionId).doc(userDocId), userDoc);

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
	const defaultRedirectURI = getHomeSiteRoute({
		includeOrigin: true,
		origin: siteOriginByTarget.HOME_SITE,
		queryParams: { client_token: customToken },
		routeStaticId: 'HOME_SITE__/GET_STARTED',
	});
	const redirectURI = redirect_uri
		? redirect_uri.includes('?')
			? `${redirect_uri}&client_token=${customToken}`
			: `${redirect_uri}?client_token=${customToken}`
		: defaultRedirectURI;

	// Construct the post-response callback
	const onFinished = async () => {
		// Create a Stripe Customer
		const stripeCustomer = await createStripeCustomer({
			email,
			metadata: { user_id: userDocId },
			username,
		});

		// Update the USER Firestore document with the Stripe Customer ID
		await db
			.collection(usersApi.collectionId)
			.doc(userDocId)
			.update({ stripe_customer_id: stripeCustomer.id });

		// Send welcome email to USER
		await sendWelcomeEmail({ email, username });

		// Schedule activation reminder emails for USER
		await scheduleActivationReminderEmails({
			email,
			username,
		});
	};

	return {
		json: { custom_token: customToken, redirect_uri: redirectURI },
		onFinished,
	};
};
