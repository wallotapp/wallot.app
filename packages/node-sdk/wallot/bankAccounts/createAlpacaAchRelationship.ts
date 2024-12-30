import { getFunctions } from 'firebase-admin/functions';
import { RequestAlpacaAchTransferTaskParams } from '../achTransfers/requestAlpacaAchTransfer.js';

export type CreateAlpacaAchRelationshipTaskParams = {
	amountInCents: RequestAlpacaAchTransferTaskParams['amountInCents'];
	bankAccountId: RequestAlpacaAchTransferTaskParams['bankAccountId'];
	orderId: RequestAlpacaAchTransferTaskParams['orderId'];
	userId: RequestAlpacaAchTransferTaskParams['userId'];
};
export type RefreshAlpacaAchRelationshipStatusTaskParams = {
	amountInCents: RequestAlpacaAchTransferTaskParams['amountInCents'];
	bankAccountId: RequestAlpacaAchTransferTaskParams['bankAccountId'];
	orderId: RequestAlpacaAchTransferTaskParams['orderId'];
	userId: RequestAlpacaAchTransferTaskParams['userId'];
};

export const enqueueCreateAlpacaAchRelationship =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (
		createAlpacaAchRelationshipParams: CreateAlpacaAchRelationshipTaskParams,
	) => {
		const queue =
			getFunctions().taskQueue<CreateAlpacaAchRelationshipTaskParams>(
				'createAlpacaAchRelationship',
			);
		const targetUri = await getCloudFunctionUrl('createAlpacaAchRelationship');
		log({
			message: 'Enqueuing createAlpacaAchRelationship task',
			targetUri,
			createAlpacaAchRelationshipParams,
		});
		await queue.enqueue(createAlpacaAchRelationshipParams, {
			scheduleDelaySeconds: 0,
			uri: targetUri,
		});
	};

export const enqueueRefreshAlpacaAchRelationshipStatus =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (
		refreshAlpacaAchRelationshipStatusParams: RefreshAlpacaAchRelationshipStatusTaskParams,
	) => {
		const queue =
			getFunctions().taskQueue<RefreshAlpacaAchRelationshipStatusTaskParams>(
				'refreshAlpacaAchRelationshipStatus',
			);
		const targetUri = await getCloudFunctionUrl(
			'refreshAlpacaAchRelationshipStatus',
		);
		log({
			message: 'Enqueuing refreshAlpacaAchRelationshipStatus task',
			targetUri,
			refreshAlpacaAchRelationshipStatusParams,
		});
		await queue.enqueue(refreshAlpacaAchRelationshipStatusParams, {
			scheduleDelaySeconds: 20,
			uri: targetUri,
		});
	};
