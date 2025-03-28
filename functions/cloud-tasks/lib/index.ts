import { firebaseFunctions } from 'ergonomic-node';
import {
	CreateAlpacaAccountTaskParams,
	RefreshAlpacaAccountStatusTaskParams,
	CreateAlpacaAchRelationshipTaskParams,
	RefreshAlpacaAchRelationshipStatusTaskParams,
	RequestAlpacaAchTransferTaskParams,
	RefreshAlpacaAchTransferStatusTaskParams,
	PlaceAlpacaOrdersTaskParams,
	RefreshAlpacaOrderStatusTaskParams,
	SendEmailWithGmailAPIParams,
	BatchSendScholarshipApplicationCompletionReminderEmailsParams,
	BatchSendResearchApplicationEmailsParams,
} from '@wallot/node';

// ---- Application Routes: Alpaca Accounts  ---- //

// createAlpacaAccount
import {
	handleCreateAlpacaAccountTask,
	handleCreateAlpacaAccountTaskOptions,
} from './app/alpacaAccounts/createAlpacaAccount.js';
export const createAlpacaAccount =
	firebaseFunctions.tasks.onTaskDispatched<CreateAlpacaAccountTaskParams>(
		handleCreateAlpacaAccountTaskOptions,
		handleCreateAlpacaAccountTask,
	);

// refreshAlpacaAccountStatus
import {
	handleRefreshAlpacaAccountStatusTask,
	handleRefreshAlpacaAccountStatusTaskOptions,
} from './app/alpacaAccounts/refreshAlpacaAccountStatus.js';
export const refreshAlpacaAccountStatus =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAccountStatusTaskParams>(
		handleRefreshAlpacaAccountStatusTaskOptions,
		handleRefreshAlpacaAccountStatusTask,
	);

// ---- Application Routes: Alpaca ACH Relationships  ---- //

// createAlpacaAchRelationship
import {
	handleCreateAlpacaAchRelationshipTask,
	handleCreateAlpacaAchRelationshipTaskOptions,
} from './app/alpacaAchRelationships/createAlpacaAchRelationship.js';
export const createAlpacaAchRelationship =
	firebaseFunctions.tasks.onTaskDispatched<CreateAlpacaAchRelationshipTaskParams>(
		handleCreateAlpacaAchRelationshipTaskOptions,
		handleCreateAlpacaAchRelationshipTask,
	);

// refreshAlpacaAchRelationshipStatus
import {
	handleRefreshAlpacaAchRelationshipStatusTask,
	handleRefreshAlpacaAchRelationshipStatusTaskOptions,
} from './app/alpacaAchRelationships/refreshAlpacaAchRelationshipStatus.js';
export const refreshAlpacaAchRelationshipStatus =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAchRelationshipStatusTaskParams>(
		handleRefreshAlpacaAchRelationshipStatusTaskOptions,
		handleRefreshAlpacaAchRelationshipStatusTask,
	);

// ---- Application Routes: Alpaca ACH Transfers  ---- //

// requestAlpacaAchTransfer
import {
	handleRequestAlpacaAchTransferTask,
	handleRequestAlpacaAchTransferTaskOptions,
} from './app/alpacaAchTransfers/requestAlpacaAchTransfer.js';
export const requestAlpacaAchTransfer =
	firebaseFunctions.tasks.onTaskDispatched<RequestAlpacaAchTransferTaskParams>(
		handleRequestAlpacaAchTransferTaskOptions,
		handleRequestAlpacaAchTransferTask,
	);

// refreshAlpacaAchTransferStatus
import {
	handleRefreshAlpacaAchTransferStatusTask,
	handleRefreshAlpacaAchTransferStatusTaskOptions,
} from './app/alpacaAchTransfers/refreshAlpacaAchTransferStatus.js';
export const refreshAlpacaAchTransferStatus =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAchTransferStatusTaskParams>(
		handleRefreshAlpacaAchTransferStatusTaskOptions,
		handleRefreshAlpacaAchTransferStatusTask,
	);

// ---- Application Routes: Alpaca Orders  ---- //

// placeAlpacaOrders
import {
	handlePlaceAlpacaOrdersTask,
	handlePlaceAlpacaOrdersTaskOptions,
} from './app/alpacaOrders/placeAlpacaOrders.js';
export const placeAlpacaOrders =
	firebaseFunctions.tasks.onTaskDispatched<PlaceAlpacaOrdersTaskParams>(
		handlePlaceAlpacaOrdersTaskOptions,
		handlePlaceAlpacaOrdersTask,
	);

// refreshAlpacaOrderStatus
import {
	handleRefreshAlpacaOrderStatusTask,
	handleRefreshAlpacaOrderStatusTaskOptions,
} from './app/alpacaOrders/refreshAlpacaOrderStatus.js';
export const refreshAlpacaOrderStatus =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaOrderStatusTaskParams>(
		handleRefreshAlpacaOrderStatusTaskOptions,
		handleRefreshAlpacaOrderStatusTask,
	);

// ---- Application Routes: Scholarship Applications ---- //

// batchSendScholarshipApplicationCompletionReminderEmails
import {
	handleBatchSendScholarshipApplicationCompletionReminderEmailsTask,
	handleBatchSendScholarshipApplicationCompletionReminderEmailsTaskOptions,
} from './app/scholarshipApplications/batchSendScholarshipApplicationCompletionReminderEmails.js';
export const batchSendScholarshipApplicationCompletionReminderEmails =
	firebaseFunctions.tasks.onTaskDispatched<BatchSendScholarshipApplicationCompletionReminderEmailsParams>(
		handleBatchSendScholarshipApplicationCompletionReminderEmailsTaskOptions,
		handleBatchSendScholarshipApplicationCompletionReminderEmailsTask,
	);

// batchSendResearchApplicationEmails
import {
	handleBatchSendResearchApplicationEmailsTask,
	handleBatchSendResearchApplicationEmailsTaskOptions,
} from './app/scholarshipApplications/batchSendResearchApplicationEmails.js';
export const batchSendResearchApplicationEmails =
	firebaseFunctions.tasks.onTaskDispatched<BatchSendResearchApplicationEmailsParams>(
		handleBatchSendResearchApplicationEmailsTaskOptions,
		handleBatchSendResearchApplicationEmailsTask,
	);

// ---- Notifications: Email ---- //

// sendEmailWithGmailAPI
import {
	handleSendEmailWithGmailAPITask,
	handleSendEmailWithGmailAPITaskOptions,
} from './notifications/email/sendEmailWithGmailAPI.js';
export const sendEmailWithGmailAPI =
	firebaseFunctions.tasks.onTaskDispatched<SendEmailWithGmailAPIParams>(
		handleSendEmailWithGmailAPITaskOptions,
		handleSendEmailWithGmailAPITask,
	);
