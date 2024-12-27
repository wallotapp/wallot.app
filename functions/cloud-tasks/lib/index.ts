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
} from '@wallot/node';

// ---- Application Routes: Alpaca Accounts  ---- //

// create_alpaca_account
import {
	handleCreateAlpacaAccountTask,
	handleCreateAlpacaAccountTaskOptions,
} from './app/alpacaAccounts/createAlpacaAccount.js';
export const create_alpaca_account =
	firebaseFunctions.tasks.onTaskDispatched<CreateAlpacaAccountTaskParams>(
		handleCreateAlpacaAccountTaskOptions,
		handleCreateAlpacaAccountTask,
	);

// refresh_alpaca_account_status
import {
	handleRefreshAlpacaAccountStatusTask,
	handleRefreshAlpacaAccountStatusTaskOptions,
} from './app/alpacaAccounts/refreshAlpacaAccountStatus.js';
export const refresh_alpaca_account_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAccountStatusTaskParams>(
		handleRefreshAlpacaAccountStatusTaskOptions,
		handleRefreshAlpacaAccountStatusTask,
	);

// ---- Application Routes: Alpaca ACH Relationships  ---- //

// create_alpaca_ach_relationship
import {
	handleCreateAlpacaAchRelationshipTask,
	handleCreateAlpacaAchRelationshipTaskOptions,
} from './app/alpacaAchRelationships/createAlpacaAchRelationship.js';
export const create_alpaca_ach_relationship =
	firebaseFunctions.tasks.onTaskDispatched<CreateAlpacaAchRelationshipTaskParams>(
		handleCreateAlpacaAchRelationshipTaskOptions,
		handleCreateAlpacaAchRelationshipTask,
	);

// refresh_alpaca_ach_relationship_status
import {
	handleRefreshAlpacaAchRelationshipStatusTask,
	handleRefreshAlpacaAchRelationshipStatusTaskOptions,
} from './app/alpacaAchRelationships/refreshAlpacaAchRelationshipStatus.js';
export const refresh_alpaca_ach_relationship_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAchRelationshipStatusTaskParams>(
		handleRefreshAlpacaAchRelationshipStatusTaskOptions,
		handleRefreshAlpacaAchRelationshipStatusTask,
	);

// ---- Application Routes: Alpaca ACH Transfers  ---- //

// request_alpaca_ach_transfer
import {
	handleRequestAlpacaAchTransferTask,
	handleRequestAlpacaAchTransferTaskOptions,
} from './app/alpacaAchTransfers/requestAlpacaAchTransfer.js';
export const request_alpaca_ach_transfer =
	firebaseFunctions.tasks.onTaskDispatched<RequestAlpacaAchTransferTaskParams>(
		handleRequestAlpacaAchTransferTaskOptions,
		handleRequestAlpacaAchTransferTask,
	);

// refresh_alpaca_ach_transfer_status
import {
	handleRefreshAlpacaAchTransferStatusTask,
	handleRefreshAlpacaAchTransferStatusTaskOptions,
} from './app/alpacaAchTransfers/refreshAlpacaAchTransferStatus.js';
export const refresh_alpaca_ach_transfer_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAchTransferStatusTaskParams>(
		handleRefreshAlpacaAchTransferStatusTaskOptions,
		handleRefreshAlpacaAchTransferStatusTask,
	);

// ---- Application Routes: Alpaca Orders  ---- //

// place_alpaca_orders
import {
	handlePlaceAlpacaOrdersTask,
	handlePlaceAlpacaOrdersTaskOptions,
} from './app/alpacaOrders/placeAlpacaOrders.js';
export const place_alpaca_orders =
	firebaseFunctions.tasks.onTaskDispatched<PlaceAlpacaOrdersTaskParams>(
		handlePlaceAlpacaOrdersTaskOptions,
		handlePlaceAlpacaOrdersTask,
	);

// refresh_alpaca_order_status
import {
	handleRefreshAlpacaOrderStatusTask,
	handleRefreshAlpacaOrderStatusTaskOptions,
} from './app/alpacaOrders/refreshAlpacaOrderStatus.js';
export const refresh_alpaca_order_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaOrderStatusTaskParams>(
		handleRefreshAlpacaOrderStatusTaskOptions,
		handleRefreshAlpacaOrderStatusTask,
	);
