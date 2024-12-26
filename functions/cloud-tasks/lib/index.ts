import { firebaseFunctions } from 'ergonomic-node';
import { PlaceAlpacaOrdersListenerTaskParams } from '@wallot/node';

import { handlePlaceAlpacaOrders } from './app/alpacaOrders/handlePlaceAlpacaOrders.js';
export const place_alpaca_orders =
	firebaseFunctions.tasks.onTaskDispatched<PlaceAlpacaOrdersListenerTaskParams>(
		{
			retryConfig: {
				maxAttempts: 5,
				minBackoffSeconds: 60, // Retry after 1 minute
			},
			rateLimits: {
				maxConcurrentDispatches: 6,
			},
		},
		handlePlaceAlpacaOrders,
	);
