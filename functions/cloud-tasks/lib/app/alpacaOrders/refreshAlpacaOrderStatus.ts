import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaOrderStatusTaskParams } from '@wallot/node';
import {
	AlpacaOrder,
	AssetOrderPendingAlpacaFill,
	UserActivatedByAlpaca,
} from '@wallot/js';
import { alpaca } from '../../services.js';

export const handleRefreshAlpacaOrderStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 5, minBackoffSeconds: 120 },
};

export const handleRefreshAlpacaOrderStatusTask: CloudTaskHandler<
	RefreshAlpacaOrderStatusTaskParams
> = async ({ data: { assetOrderId } }) => {
	assetOrderId;
	return Promise.resolve();
};
