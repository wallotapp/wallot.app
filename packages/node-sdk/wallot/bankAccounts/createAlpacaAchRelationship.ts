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
