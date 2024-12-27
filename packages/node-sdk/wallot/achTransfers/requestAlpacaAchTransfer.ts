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
			'request_alpaca_ach_transfer',
		);
		const targetUri = await getCloudFunctionUrl('request_alpaca_ach_transfer');
		log({
			message: 'Enqueuing request_alpaca_ach_transfer task',
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
				'refresh_alpaca_ach_transfer_status',
			);
		const targetUri = await getCloudFunctionUrl(
			'refresh_alpaca_ach_transfer_status',
		);
		log({
			message: 'Enqueuing refresh_alpaca_ach_transfer_status task',
			targetUri,
			refreshAlpacaAchTransferStatusParams,
		});
		await queue.enqueue(refreshAlpacaAchTransferStatusParams, {
			scheduleDelaySeconds: 20,
			uri: targetUri,
		});
	};
