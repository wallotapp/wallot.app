import { firebaseFunctions } from 'ergonomic-node';
import { PlaceAlpacaOrdersListenerTaskParams } from '@wallot/node';

import {
	handlePlaceAlpacaOrders,
	handlePlaceAlpacaOrdersTaskOptions,
} from './app/alpacaOrders/handlePlaceAlpacaOrders.js';
export const place_alpaca_orders =
	firebaseFunctions.tasks.onTaskDispatched<PlaceAlpacaOrdersListenerTaskParams>(
		handlePlaceAlpacaOrdersTaskOptions,
		handlePlaceAlpacaOrders,
	);
