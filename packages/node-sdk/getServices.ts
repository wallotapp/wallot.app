import { default as OpenAI } from 'openai';
import {
	getCloudStorageBucket,
	getFirebaseAuth,
	getFirestoreDB,
	getStripeInstance,
} from 'ergonomic-node';
import { SecretData } from './SecretDataTypes.js';
import { getAlpacaBrokerApiClient } from './alpaca/index.js';
import { getAlphaVantageClient } from './alphaVantage/index.js';
import { log } from './log.js';

export const getServices = (secrets: SecretData) => ({
	alpaca: { broker: getAlpacaBrokerApiClient(secrets) },
	alphaVantage: getAlphaVantageClient(secrets),
	auth: getFirebaseAuth(secrets),
	bucket: getCloudStorageBucket(
		secrets.SECRET_CRED_FIREBASE_PROJECT_STORAGE_BUCKET_NAME,
	),
	db: getFirestoreDB(secrets),
	log: log(secrets.SECRET_CRED_SERVER_PROTOCOL),
	openAI: new OpenAI({
		apiKey: secrets.SECRET_CRED_OPENAI_API_KEY,
	}),
	stripe: getStripeInstance(secrets),
});
