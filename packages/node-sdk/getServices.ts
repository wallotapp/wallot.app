import {
	getCloudStorageBucket,
	getFirebaseAuth,
	getFirestoreDB,
	getStripeInstance,
} from 'ergonomic-node';
import { SecretData } from './SecretDataTypes.js';
import { getAlpacaBrokerApiClient } from './alpaca/index.js';
import { getAlphaVantageClient } from './alphaVantage/index.js';

export const getServices = (secrets: SecretData) => ({
	alpaca: { broker: getAlpacaBrokerApiClient(secrets) },
	alphaVantage: getAlphaVantageClient(secrets),
	auth: getFirebaseAuth(secrets),
	bucket: getCloudStorageBucket(
		secrets.SECRET_CRED_FIREBASE_PROJECT_STORAGE_BUCKET_NAME,
	),
	db: getFirestoreDB(secrets),
	stripe: getStripeInstance(secrets),
});
