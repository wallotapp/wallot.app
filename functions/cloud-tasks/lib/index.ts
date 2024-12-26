import { firebaseFunctions } from 'ergonomic-node';
import {
	CreateAlpacaAccountTaskParams,
	RefreshAlpacaAccountStatusTaskParams,
	CreateAlpacaAchRelationshipTaskParams,
	RefreshAlpacaAchRelationshipStatusTaskParams,
	RequestAlpacaAchTransferTaskParams,
	RefreshAlpacaAchTransferStatusTaskParams,
	PlaceAlpacaOrdersTaskParams,
	RefreshAlpacaOrdersStatusTaskParams,
} from '@wallot/node';

// ---- Application Routes: Alpaca Accounts  ---- //

// create_alpaca_account
import {
	handleCreateAlpacaAccount,
	handleCreateAlpacaAccountTaskOptions,
} from './app/alpacaAccounts/createAlpacaAccount.js';
export const create_alpaca_account =
	firebaseFunctions.tasks.onTaskDispatched<CreateAlpacaAccountTaskParams>(
		handleCreateAlpacaAccountTaskOptions,
		handleCreateAlpacaAccount,
	);

// refresh_alpaca_account_status
import {
	handleRefreshAlpacaAccountStatus,
	handleRefreshAlpacaAccountStatusTaskOptions,
} from './app/alpacaAccounts/refreshAlpacaAccountStatus.js';
export const refresh_alpaca_account_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAccountStatusTaskParams>(
		handleRefreshAlpacaAccountStatusTaskOptions,
		handleRefreshAlpacaAccountStatus,
	);

// ---- Application Routes: Alpaca ACH Relationships  ---- //

// create_alpaca_ach_relationship
import {
	handleCreateAlpacaAchRelationship,
	handleCreateAlpacaAchRelationshipTaskOptions,
} from './app/alpacaAchRelationships/createAlpacaAchRelationship.js';
export const create_alpaca_ach_relationship =
	firebaseFunctions.tasks.onTaskDispatched<CreateAlpacaAchRelationshipTaskParams>(
		handleCreateAlpacaAchRelationshipTaskOptions,
		handleCreateAlpacaAchRelationship,
	);

// refresh_alpaca_ach_relationship_status
import {
	handleRefreshAlpacaAchRelationshipStatus,
	handleRefreshAlpacaAchRelationshipStatusTaskOptions,
} from './app/alpacaAchRelationships/refreshAlpacaAchRelationshipStatus.js';
export const refresh_alpaca_ach_relationship_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAchRelationshipStatusTaskParams>(
		handleRefreshAlpacaAchRelationshipStatusTaskOptions,
		handleRefreshAlpacaAchRelationshipStatus,
	);

// ---- Application Routes: Alpaca ACH Transfers  ---- //

// request_alpaca_ach_transfer
import {
	handleRequestAlpacaAchTransfer,
	handleRequestAlpacaAchTransferTaskOptions,
} from './app/alpacaAchTransfers/requestAlpacaAchTransfer.js';
export const request_alpaca_ach_transfer =
	firebaseFunctions.tasks.onTaskDispatched<RequestAlpacaAchTransferTaskParams>(
		handleRequestAlpacaAchTransferTaskOptions,
		handleRequestAlpacaAchTransfer,
	);

// refresh_alpaca_ach_transfer_status
import {
	handleRefreshAlpacaAchTransferStatus,
	handleRefreshAlpacaAchTransferStatusTaskOptions,
} from './app/alpacaAchTransfers/refreshAlpacaAchTransferStatus.js';
export const refresh_alpaca_ach_transfer_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAchTransferStatusTaskParams>(
		handleRefreshAlpacaAchTransferStatusTaskOptions,
		handleRefreshAlpacaAchTransferStatus,
	);

// ---- Application Routes: Alpaca Orders  ---- //

// place_alpaca_orders
import {
	handlePlaceAlpacaOrders,
	handlePlaceAlpacaOrdersTaskOptions,
} from './app/alpacaOrders/handlePlaceAlpacaOrders.js';
export const place_alpaca_orders =
	firebaseFunctions.tasks.onTaskDispatched<PlaceAlpacaOrdersTaskParams>(
		handlePlaceAlpacaOrdersTaskOptions,
		handlePlaceAlpacaOrders,
	);

// refresh_alpaca_orders_status
import {
	handleRefreshAlpacaOrdersStatus,
	handleRefreshAlpacaOrdersStatusTaskOptions,
} from './app/alpacaOrders/refreshAlpacaOrdersStatus.js';
export const refresh_alpaca_orders_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaOrdersStatusTaskParams>(
		handleRefreshAlpacaOrdersStatusTaskOptions,
		handleRefreshAlpacaOrdersStatus,
	);
