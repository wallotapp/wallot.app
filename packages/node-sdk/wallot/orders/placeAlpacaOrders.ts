import { getFunctions } from 'firebase-admin/functions';

export type PlaceAlpacaOrdersTaskParams = {
	orderId: string;
};
export type RefreshAlpacaOrdersStatusTaskParams = {
	orderId: string;
};

export const enqueuePlaceAlpacaOrders =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (refreshAlpacaOrdersStatusParams: PlaceAlpacaOrdersTaskParams) => {
		const queue = getFunctions().taskQueue<PlaceAlpacaOrdersTaskParams>(
			'place_alpaca_orders',
		);
		const targetUri = await getCloudFunctionUrl('place_alpaca_orders');
		log({
			message: 'Enqueuing place_alpaca_orders task',
			targetUri,
			refreshAlpacaOrdersStatusParams,
		});
		await queue.enqueue(refreshAlpacaOrdersStatusParams, {
			scheduleDelaySeconds: 0,
			uri: targetUri,
		});
	};

export const enqueueRefreshAlpacaOrdersStatus =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (
		refreshAlpacaOrdersStatusParams: RefreshAlpacaOrdersStatusTaskParams,
	) => {
		const queue = getFunctions().taskQueue<RefreshAlpacaOrdersStatusTaskParams>(
			'refresh_alpaca_orders_status',
		);
		const targetUri = await getCloudFunctionUrl('refresh_alpaca_orders_status');
		log({
			message: 'Enqueuing refresh_alpaca_orders_status task',
			targetUri,
			refreshAlpacaOrdersStatusParams,
		});
		await queue.enqueue(refreshAlpacaOrdersStatusParams, {
			scheduleDelaySeconds: 20,
			uri: targetUri,
		});
	};
