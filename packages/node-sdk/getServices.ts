import { default as OpenAI } from 'openai';
import {
	getCloudFunctionUrl,
	getCloudStorageBucket,
	getFirebaseAuth,
	getFirestoreDB,
	getStripeInstance,
} from 'ergonomic-node';
import { SecretData } from './SecretDataTypes.js';
import { getAlpacaBrokerApiClient } from './alpaca/index.js';
import { getAlphaVantageClient } from './alphaVantage/index.js';
import { encryptString } from './crypto/encryptString.js';
import { decryptString } from './crypto/decryptString.js';
import { log } from './log.js';

export const getServices = (
	secrets: SecretData,
	serviceAccountPath: string,
) => ({
	alpaca: { broker: getAlpacaBrokerApiClient(secrets) },
	alphaVantage: getAlphaVantageClient(secrets),
	auth: getFirebaseAuth(secrets),
	bucket: getCloudStorageBucket(
		secrets.SECRET_CRED_FIREBASE_PROJECT_STORAGE_BUCKET_NAME,
	),
	crypto: {
		encrypt: encryptString(
			secrets.SECRET_CRED_FIRESTORE_DATABASE_ENCRYPTION_KEY,
		),
		decrypt: decryptString(
			secrets.SECRET_CRED_FIRESTORE_DATABASE_ENCRYPTION_KEY,
		),
	},
	db: getFirestoreDB(secrets),
	gcp: {
		getCloudFunctionUrl: (functionName: string) =>
			getCloudFunctionUrl({
				...secrets,
				functionName,
				serviceAccountPath,
			}),
	},
	log: log(secrets.SECRET_CRED_SERVER_PROTOCOL),
	openAI: new OpenAI({
		apiKey: secrets.SECRET_CRED_OPENAI_API_KEY,
	}),
	stripe: getStripeInstance(secrets),
});
