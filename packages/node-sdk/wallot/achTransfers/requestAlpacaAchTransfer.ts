import { getFunctions } from 'firebase-admin/functions';
import { PlaceAlpacaOrdersTaskParams } from '../orders/placeAlpacaOrders.js';

export type RequestAlpacaAchTransferTaskParams = PlaceAlpacaOrdersTaskParams & {
	amountInCents: number;
	bankAccountId: string;
	userId: string;
};
export type RefreshAlpacaAchTransferStatusTaskParams =
	PlaceAlpacaOrdersTaskParams & {
		achTransferId: string;
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
