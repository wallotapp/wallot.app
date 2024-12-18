import {
	RegisterUserParams,
	RegisterUserResponse,
	stripeCustomersApi,
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
import { sendUserWelcomeEmail } from './sendUserWelcomeEmail.js';
import { scheduleActivationReminderEmailsForUser } from './scheduleActivationReminderEmailsForUser.js';

export const registerUser = async ({
	email,
	password,
	username,
}: RegisterUserParams): Promise<FunctionResponse<RegisterUserResponse>> => {
	// Initialize Firestore document IDs
	const stripeCustomerDocId = stripeCustomersApi.generateId();
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
		metadata: { _id: stripeCustomerDocId, user_id: userDocId },
		username,
	});

	// Create a STRIPE_CUSTOMER Firestore document
	const stripeCustomerDoc = stripeCustomersApi.mergeCreateParams({
		createParams: {
			_id: stripeCustomerDocId,
			category: 'default',
			name: '',
			stripe_id: stripeCustomer.id,
		},
	});
	batch.set(
		db.collection(stripeCustomersApi.collectionId).doc(stripeCustomerDocId),
		stripeCustomerDoc,
	);

	// Create a USER Firestore document
	const userDoc = usersApi.mergeCreateParams({
		createParams: {
			_id: userDocId,
			category: 'default',
			name: '',
			stripe_customer: stripeCustomerDocId,
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
		await sendUserWelcomeEmail({ email, username });

		// Schedule onboarding reminder emails for USER
		await scheduleActivationReminderEmailsForUser({ email, username });
	};

	return {
		json: { custom_token: customToken, redirect_url: redirectUrl },
		onFinished,
	};
};
