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
	createAlpacaAccount,
	createAlpacaAccountTaskOptions,
} from './app/alpacaAccounts/createAlpacaAccount.js';
export const create_alpaca_account =
	firebaseFunctions.tasks.onTaskDispatched<CreateAlpacaAccountTaskParams>(
		createAlpacaAccountTaskOptions,
		createAlpacaAccount,
	);

// refresh_alpaca_account_status
import {
	refreshAlpacaAccountStatus,
	refreshAlpacaAccountStatusTaskOptions,
} from './app/alpacaAccounts/refreshAlpacaAccountStatus.js';
export const refresh_alpaca_account_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAccountStatusTaskParams>(
		refreshAlpacaAccountStatusTaskOptions,
		refreshAlpacaAccountStatus,
	);

// ---- Application Routes: Alpaca ACH Relationships  ---- //

// create_alpaca_ach_relationship
import {
	createAlpacaAchRelationship,
	createAlpacaAchRelationshipTaskOptions,
} from './app/alpacaAchRelationships/createAlpacaAchRelationship.js';
export const create_alpaca_ach_relationship =
	firebaseFunctions.tasks.onTaskDispatched<CreateAlpacaAchRelationshipTaskParams>(
		createAlpacaAchRelationshipTaskOptions,
		createAlpacaAchRelationship,
	);

// refresh_alpaca_ach_relationship_status
import {
	refreshAlpacaAchRelationshipStatus,
	refreshAlpacaAchRelationshipStatusTaskOptions,
} from './app/alpacaAchRelationships/refreshAlpacaAchRelationshipStatus.js';
export const refresh_alpaca_ach_relationship_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAchRelationshipStatusTaskParams>(
		refreshAlpacaAchRelationshipStatusTaskOptions,
		refreshAlpacaAchRelationshipStatus,
	);

// ---- Application Routes: Alpaca ACH Transfers  ---- //

// request_alpaca_ach_transfer
import {
	requestAlpacaAchTransfer,
	requestAlpacaAchTransferTaskOptions,
} from './app/alpacaAchTransfers/requestAlpacaAchTransfer.js';
export const request_alpaca_ach_transfer =
	firebaseFunctions.tasks.onTaskDispatched<RequestAlpacaAchTransferTaskParams>(
		requestAlpacaAchTransferTaskOptions,
		requestAlpacaAchTransfer,
	);

// refresh_alpaca_ach_transfer_status
import {
	refreshAlpacaAchTransferStatus,
	refreshAlpacaAchTransferStatusTaskOptions,
} from './app/alpacaAchTransfers/refreshAlpacaAchTransferStatus.js';
export const refresh_alpaca_ach_transfer_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaAchTransferStatusTaskParams>(
		refreshAlpacaAchTransferStatusTaskOptions,
		refreshAlpacaAchTransferStatus,
	);

// ---- Application Routes: Alpaca Orders  ---- //

// place_alpaca_orders
import {
	placeAlpacaOrders,
	placeAlpacaOrdersTaskOptions,
} from './app/alpacaOrders/placeAlpacaOrders.js';
export const place_alpaca_orders =
	firebaseFunctions.tasks.onTaskDispatched<PlaceAlpacaOrdersTaskParams>(
		placeAlpacaOrdersTaskOptions,
		placeAlpacaOrders,
	);

// refresh_alpaca_orders_status
import {
	refreshAlpacaOrdersStatus,
	refreshAlpacaOrdersStatusTaskOptions,
} from './app/alpacaOrders/refreshAlpacaOrdersStatus.js';
export const refresh_alpaca_orders_status =
	firebaseFunctions.tasks.onTaskDispatched<RefreshAlpacaOrdersStatusTaskParams>(
		refreshAlpacaOrdersStatusTaskOptions,
		refreshAlpacaOrdersStatus,
	);
