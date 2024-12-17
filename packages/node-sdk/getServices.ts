import {
	getCloudStorageBucket,
	getFirebaseAuth,
	getFirestoreDB,
	getStripeInstance,
} from 'ergonomic-node';
import { SecretData } from './SecretDataTypes.js';
import { getAlpacaBrokerApiClient } from './alpaca/index.js';

export const getServices = (secrets: SecretData) => ({
	alpacaBrokerApiClient: getAlpacaBrokerApiClient(secrets),
	auth: getFirebaseAuth(secrets),
	bucket: getCloudStorageBucket(
		secrets.SECRET_CRED_FIREBASE_ADMIN_STORAGE_BUCKET_NAME,
	),
	db: getFirestoreDB(secrets),
	stripe: getStripeInstance(secrets),
});
