import { getFunctions } from 'firebase-admin/functions';

export type CreateAlpacaAchRelationshipTaskParams = {
	orderId: string;
};
export type RefreshAlpacaAchRelationshipStatusTaskParams = {
	orderId: string;
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
				'create_alpaca_ach_relationship',
			);
		const targetUri = await getCloudFunctionUrl(
			'create_alpaca_ach_relationship',
		);
		log({
			message: 'Enqueuing create_alpaca_ach_relationship task',
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
				'refresh_alpaca_ach_relationship_status',
			);
		const targetUri = await getCloudFunctionUrl(
			'refresh_alpaca_ach_relationship_status',
		);
		log({
			message: 'Enqueuing refresh_alpaca_ach_relationship_status task',
			targetUri,
			refreshAlpacaAchRelationshipStatusParams,
		});
		await queue.enqueue(refreshAlpacaAchRelationshipStatusParams, {
			scheduleDelaySeconds: 20,
			uri: targetUri,
		});
	};
