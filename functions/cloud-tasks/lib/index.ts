import { firebaseFunctions } from 'ergonomic-node';
import { PlaceAlpacaOrdersListenerTaskParams } from '@wallot/node';

import { handlePlaceAlpacaOrders } from './app/alpacaOrders/handlePlaceAlpacaOrders.js';
export const place_alpaca_orders =
	firebaseFunctions.tasks.onTaskDispatched<PlaceAlpacaOrdersListenerTaskParams>(
		{
			rateLimits: { maxConcurrentDispatches: 6 },
			retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
		},
		handlePlaceAlpacaOrders,
	);
