import { default as OpenAI } from 'openai';
import {
	getCloudStorageBucket,
	getCloudFunctionUrl,
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
import {
	enqueueRequestAlpacaAchTransfer,
	enqueueRefreshAlpacaAchTransferStatus,
} from './wallot/achTransfers/requestAlpacaAchTransfer.js';
import {
	enqueueCreateAlpacaAchRelationship,
	enqueueRefreshAlpacaAchRelationshipStatus,
} from './wallot/bankAccounts/createAlpacaAchRelationship.js';
import {
	enqueuePlaceAlpacaOrders,
	enqueueRefreshAlpacaOrderStatus,
} from './wallot/orders/placeAlpacaOrders.js';
import {
	enqueueCreateAlpacaAccount,
	enqueueRefreshAlpacaAccountStatus,
} from './wallot/users/createAlpacaAccount.js';

export const getServices = (
	secrets: SecretData,
	serviceAccountPath: string,
) => {
	const logService = log(secrets.SECRET_CRED_SERVER_PROTOCOL);
	const getCloudFunctionUrlService = (functionName: string) =>
		getCloudFunctionUrl({
			...secrets,
			functionName,
			serviceAccountPath,
		});

	return {
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
			tasks: {
				// Alpaca Accounts
				enqueueCreateAlpacaAccount: enqueueCreateAlpacaAccount(
					getCloudFunctionUrlService,
					logService,
				),
				enqueueRefreshAlpacaAccountStatus: enqueueRefreshAlpacaAccountStatus(
					getCloudFunctionUrlService,
					logService,
				),
				// Alpaca ACH Transfers
				enqueueRequestAlpacaAchTransfer: enqueueRequestAlpacaAchTransfer(
					getCloudFunctionUrlService,
					logService,
				),
				enqueueRefreshAlpacaAchTransferStatus:
					enqueueRefreshAlpacaAchTransferStatus(
						getCloudFunctionUrlService,
						logService,
					),
				// Alpaca ACH Relationships
				enqueueCreateAlpacaAchRelationship: enqueueCreateAlpacaAchRelationship(
					getCloudFunctionUrlService,
					logService,
				),
				enqueueRefreshAlpacaAchRelationshipStatus:
					enqueueRefreshAlpacaAchRelationshipStatus(
						getCloudFunctionUrlService,
						logService,
					),
				// Alpaca Orders
				enqueuePlaceAlpacaOrders: enqueuePlaceAlpacaOrders(
					getCloudFunctionUrlService,
					logService,
				),
				enqueueRefreshAlpacaOrderStatus: enqueueRefreshAlpacaOrderStatus(
					getCloudFunctionUrlService,
					logService,
				),
			},
		},
		log: logService,
		openAI: new OpenAI({
			apiKey: secrets.SECRET_CRED_OPENAI_API_KEY,
		}),
		stripe: getStripeInstance(secrets),
	};
};
