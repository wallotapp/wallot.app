import { getFunctions } from 'firebase-admin/functions';

export type RequestAlpacaAchTransferTaskParams = {
	orderId: string;
};
export type RefreshAlpacaAchTransferStatusTaskParams = {
	orderId: string;
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
