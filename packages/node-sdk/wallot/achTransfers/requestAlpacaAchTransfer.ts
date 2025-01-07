import { getFunctions } from 'firebase-admin/functions';
import { PlaceAlpacaOrdersTaskParams } from '../orders/placeAlpacaOrders.js';
import { AlpacaAchTransfer } from '@wallot/js';

export type RequestAlpacaAchTransferTaskParams = {
	/** Used to ensure there are no duplicate transfers */
	achTransferId: PlaceAlpacaOrdersTaskParams['achTransferId'];
	amountInCents: number;
	bankAccountId: string;
	direction?: AlpacaAchTransfer['direction'];
	orderId?: PlaceAlpacaOrdersTaskParams['orderId'];
	userId: string;
};
export type RefreshAlpacaAchTransferStatusTaskParams = {
	achTransferId: string;
	orderId?: PlaceAlpacaOrdersTaskParams['orderId'];
	userId: string;
};

export const enqueueRequestAlpacaAchTransfer =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (
		requestAlpacaAchTransferParams: RequestAlpacaAchTransferTaskParams,
	) => {
		const queue = getFunctions().taskQueue<RequestAlpacaAchTransferTaskParams>(
			'requestAlpacaAchTransfer',
		);
		const targetUri = await getCloudFunctionUrl('requestAlpacaAchTransfer');
		log({
			message: 'Enqueuing requestAlpacaAchTransfer task',
			targetUri,
			requestAlpacaAchTransferParams,
		});
		await queue.enqueue(requestAlpacaAchTransferParams, {
			scheduleDelaySeconds: 0,
			uri: targetUri,
		});
	};

export const enqueueRefreshAlpacaAchTransferStatus =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (
		refreshAlpacaAchTransferStatusParams: RefreshAlpacaAchTransferStatusTaskParams,
	) => {
		const queue =
			getFunctions().taskQueue<RefreshAlpacaAchTransferStatusTaskParams>(
				'refreshAlpacaAchTransferStatus',
			);
		const targetUri = await getCloudFunctionUrl(
			'refreshAlpacaAchTransferStatus',
		);
		log({
			message: 'Enqueuing refreshAlpacaAchTransferStatus task',
			targetUri,
			refreshAlpacaAchTransferStatusParams,
		});
		await queue.enqueue(refreshAlpacaAchTransferStatusParams, {
			scheduleDelaySeconds: 20,
			uri: targetUri,
		});
	};
