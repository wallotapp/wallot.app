import { firebaseFunctions } from 'ergonomic-node';
import {
	CreateAlpacaAccountTaskParams,
	RefreshAlpacaAccountStatusTaskParams,
	CreateAlpacaAchRelationshipTaskParams,
	RefreshAlpacaAchRelationshipStatusTaskParams,
	RequestAlpacaAchTransferTaskParams,
	RefreshAlpacaAchTransferStatusTaskParams,
	PlaceAlpacaOrdersTaskParams,
	RefreshAlpacaOrdersTaskParams,
} from '@wallot/node';

// ---- Application Routes: Alpaca Accounts  ---- //

// create_alpaca_account
// refresh_alpaca_account_status

// ---- Application Routes: Alpaca ACH Relationships  ---- //

// create_alpaca_ach_relationship
// refresh_alpaca_ach_relationship_status

// ---- Application Routes: Alpaca ACH Transfers  ---- //

// request_alpaca_ach_transfer
// refresh_alpaca_ach_transfer_status

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

// refresh_alpaca_orders
