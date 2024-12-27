import { getFunctions } from 'firebase-admin/functions';

export type PlaceAlpacaOrdersTaskParams = {
	orderId: string;
};
export type RefreshAlpacaOrderStatusTaskParams = {
	assetOrderId: string;
	userId: string;
};

export const enqueuePlaceAlpacaOrders =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (refreshAlpacaOrderStatusParams: PlaceAlpacaOrdersTaskParams) => {
		const queue = getFunctions().taskQueue<PlaceAlpacaOrdersTaskParams>(
			'place_alpaca_orders',
		);
		const targetUri = await getCloudFunctionUrl('place_alpaca_orders');
		log({
			message: 'Enqueuing place_alpaca_orders task',
			targetUri,
			refreshAlpacaOrderStatusParams,
		});
		await queue.enqueue(refreshAlpacaOrderStatusParams, {
			scheduleDelaySeconds: 0,
			uri: targetUri,
		});
	};

export const enqueueRefreshAlpacaOrderStatus =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (
		refreshAlpacaOrderStatusParams: RefreshAlpacaOrderStatusTaskParams,
	) => {
		const queue = getFunctions().taskQueue<RefreshAlpacaOrderStatusTaskParams>(
			'refresh_alpaca_order_status',
		);
		const targetUri = await getCloudFunctionUrl('refresh_alpaca_order_status');
		log({
			message: 'Enqueuing refresh_alpaca_order_status task',
			targetUri,
			refreshAlpacaOrderStatusParams,
		});
		await queue.enqueue(refreshAlpacaOrderStatusParams, {
			scheduleDelaySeconds: 20,
			uri: targetUri,
		});
	};
