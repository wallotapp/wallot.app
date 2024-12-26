import { getFunctions } from 'firebase-admin/functions';

export type PlaceAlpacaOrdersTaskParams = {
	orderId: string;
};
export type RefreshAlpacaOrdersStatusTaskParams = {
	orderId: string;
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
