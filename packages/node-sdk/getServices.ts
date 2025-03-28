import { default as OpenAI } from 'openai';
import {
	getCloudStorageBucket,
	getCloudFunctionUrl,
	getFirebaseAuth,
	getFirestoreDB,
	GeneralizedServerVariables,
} from 'ergonomic-node';
import { SecretData } from './SecretDataTypes.js';
import {
	// Clients
	getAlpacaBrokerApiClient,
	getAlpacaBrokerEstimationApiClient,
	getAlpacaOAuthApiClient,
	// Broker API
	createAlpacaAccount,
	retrieveAlpacaAccount,
	updateAlpacaAccount,
	retrieveAlpacaAchTransfer,
	requestAlpacaAchTransfer,
	createAlpacaAchRelationship,
	retrieveAlpacaAchRelationship,
	retrieveAlpacaDocuments,
	downloadAlpacaDocument,
	estimateAlpacaOrder,
	placeAlpacaOrder,
	retrieveAlpacaOrder,
	retrieveAlpacaPositions,
	// OAuth API
	createAlpacaAccessToken,
	retrieveAlpacaAsset,
} from './alpaca/index.js';
import {
	getAlphaVantageClient,
	retrieveCompanyOverview,
	retrieveTimeSeriesData,
} from './alphaVantage/index.js';
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
import { enqueueBatchSendScholarshipApplicationCompletionReminderEmailsParams } from './wallot/scholarshipApplications/batchSendScholarshipApplicationReminderEmails.js';
import { enqueueBatchSendResearchApplicationEmailsParams } from './wallot/scholarshipApplications/batchSendResearchApplicationEmails.js';
import {
	enqueueCreateAlpacaAccount,
	enqueueRefreshAlpacaAccountStatus,
} from './wallot/users/createAlpacaAccount.js';
import {
	sendEmailWithGmailAPI,
	enqueueSendEmailWithGmailAPI,
} from './gmail.js';
import { createEventWithGoogleCalendarAPI } from './gcal.js';

export const getServices = (
	secrets: SecretData,
	serviceAccountPath: string,
	variables: GeneralizedServerVariables,
) => {
	const logService = log(secrets.SECRET_CRED_SERVER_PROTOCOL);
	const getCloudFunctionUrlService = (functionName: string) =>
		getCloudFunctionUrl({
			...secrets,
			functionName,
			serviceAccountPath,
		});
	const alpacaBrokerClient = getAlpacaBrokerApiClient(secrets);
	const alpacaBrokerEstimationClient =
		getAlpacaBrokerEstimationApiClient(secrets);
	const alpacaOAuthClient = getAlpacaOAuthApiClient(secrets);
	const alphaVantageClient = getAlphaVantageClient(secrets);
	const decrypt = decryptString(
		secrets.SECRET_CRED_FIRESTORE_DATABASE_ENCRYPTION_KEY,
	);
	const sendEmail = sendEmailWithGmailAPI(serviceAccountPath, variables);
	const sendDeveloperAlert = (params: { message: string; subject: string }) =>
		sendEmail({
			html_body: `<p>${params.message}</p>`,
			recipient_email: secrets.SECRET_CRED_SMOKE_TEST_RECIPIENT_EMAIL,
			subject: params.subject,
			sender_email:
				secrets.SECRET_CRED_GMAIL_API_DEVELOPER_ALERTS_SEND_FROM_EMAIL,
			sender_name:
				secrets.SECRET_CRED_GMAIL_API_DEVELOPER_ALERTS_SEND_FROM_NAME,
			sender_user_id: secrets.SECRET_CRED_GMAIL_API_DEVELOPER_ALERTS_USER_ID,
		});

	return {
		alpaca: {
			broker: {
				// Alpaca Accounts
				createAlpacaAccount: createAlpacaAccount(alpacaBrokerClient),
				retrieveAlpacaAccount: retrieveAlpacaAccount(alpacaBrokerClient),
				updateAlpacaAccount: updateAlpacaAccount(alpacaBrokerClient),
				// Alpaca ACH Transfers
				retrieveAlpacaAchTransfer:
					retrieveAlpacaAchTransfer(alpacaBrokerClient),
				requestAlpacaAchTransfer: requestAlpacaAchTransfer(alpacaBrokerClient),
				// Alpaca ACH Relationships
				createAlpacaAchRelationship: createAlpacaAchRelationship(
					alpacaBrokerClient,
					decrypt,
				),
				retrieveAlpacaAchRelationship:
					retrieveAlpacaAchRelationship(alpacaBrokerClient),
				// Alpaca Assets
				retrieveAlpacaAsset: retrieveAlpacaAsset(alpacaBrokerClient),
				// Alpaca Documents
				retrieveAlpacaDocuments: retrieveAlpacaDocuments(alpacaBrokerClient),
				downloadAlpacaDocument: downloadAlpacaDocument(secrets),
				// Alpaca Orders
				estimateAlpacaOrder: estimateAlpacaOrder(
					alpacaBrokerEstimationClient,
					secrets,
				),
				placeAlpacaOrder: placeAlpacaOrder(
					alpacaBrokerClient,
					alpacaBrokerEstimationClient,
					secrets,
				),
				retrieveAlpacaOrder: retrieveAlpacaOrder(alpacaBrokerClient),
				// Alpaca Positions
				retrieveAlpacaPositions: retrieveAlpacaPositions(alpacaBrokerClient),
			},
			oauth: {
				createAlpacaAccessToken: createAlpacaAccessToken(
					alpacaOAuthClient,
					secrets,
				),
			},
		},
		alphaVantage: {
			retrieveCompanyOverview: retrieveCompanyOverview(alphaVantageClient),
			retrieveTimeSeriesData: retrieveTimeSeriesData(alphaVantageClient),
		},
		auth: getFirebaseAuth(secrets),
		bucket: getCloudStorageBucket(
			secrets.SECRET_CRED_FIREBASE_PROJECT_STORAGE_BUCKET_NAME,
		),
		crypto: {
			encrypt: encryptString(
				secrets.SECRET_CRED_FIRESTORE_DATABASE_ENCRYPTION_KEY,
			),
			decrypt,
		},
		db: getFirestoreDB(secrets),
		gcal: {
			createEvent: createEventWithGoogleCalendarAPI(
				serviceAccountPath,
				variables,
			),
		},
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
				// Scholarship applications
				enqueueBatchSendScholarshipApplicationCompletionReminderEmailsParams:
					enqueueBatchSendScholarshipApplicationCompletionReminderEmailsParams(
						getCloudFunctionUrlService,
						logService,
					),
				enqueueBatchSendResearchApplicationEmailsParams:
					enqueueBatchSendResearchApplicationEmailsParams(
						getCloudFunctionUrlService,
						logService,
					),
				// Email notifications
				enqueueSendEmailWithGmailAPI: enqueueSendEmailWithGmailAPI(
					getCloudFunctionUrlService,
					logService,
				),
			},
		},
		gmail: { sendEmail, sendDeveloperAlert },
		log: logService,
		openAI: new OpenAI({
			apiKey: secrets.SECRET_CRED_OPENAI_API_KEY,
		}),
	};
};
