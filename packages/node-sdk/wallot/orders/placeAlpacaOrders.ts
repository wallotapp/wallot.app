import { getFunctions } from 'firebase-admin/functions';

export type PlaceAlpacaOrdersTaskParams = {
	achTransferId?: string;
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
		const queue =
			getFunctions().taskQueue<PlaceAlpacaOrdersTaskParams>(
				'placeAlpacaOrders',
			);
		const targetUri = await getCloudFunctionUrl('placeAlpacaOrders');
		log({
			message: 'Enqueuing placeAlpacaOrders task',
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
			'refreshAlpacaOrderStatus',
		);
		const targetUri = await getCloudFunctionUrl('refreshAlpacaOrderStatus');
		log({
			message: 'Enqueuing refreshAlpacaOrderStatus task',
			targetUri,
			refreshAlpacaOrderStatusParams,
		});
		await queue.enqueue(refreshAlpacaOrderStatusParams, {
			scheduleDelaySeconds: 20,
			uri: targetUri,
		});
	};
