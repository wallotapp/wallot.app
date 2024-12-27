import { getFunctions } from 'firebase-admin/functions';
import { CreateAlpacaAchRelationshipTaskParams } from '../bankAccounts/createAlpacaAchRelationship.js';

export type CreateAlpacaAccountTaskParams =
	CreateAlpacaAchRelationshipTaskParams;
export type RefreshAlpacaAccountStatusTaskParams =
	CreateAlpacaAchRelationshipTaskParams;

export const enqueueCreateAlpacaAccount =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (createAlpacaAccountParams: CreateAlpacaAccountTaskParams) => {
		const queue = getFunctions().taskQueue<CreateAlpacaAccountTaskParams>(
			'createAlpacaAccount',
		);
		const targetUri = await getCloudFunctionUrl('createAlpacaAccount');
		log({
			message: 'Enqueuing createAlpacaAccount task',
			targetUri,
			createAlpacaAccountParams,
		});
		await queue.enqueue(createAlpacaAccountParams, {
			scheduleDelaySeconds: 0,
			uri: targetUri,
		});
	};

export const enqueueRefreshAlpacaAccountStatus =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (
		refreshAlpacaAccountStatusParams: RefreshAlpacaAccountStatusTaskParams,
	) => {
		const queue =
			getFunctions().taskQueue<RefreshAlpacaAccountStatusTaskParams>(
				'refreshAlpacaAccountStatus',
			);
		const targetUri = await getCloudFunctionUrl('refreshAlpacaAccountStatus');
		log({
			message: 'Enqueuing refreshAlpacaAccountStatus task',
			targetUri,
			refreshAlpacaAccountStatusParams,
		});
		await queue.enqueue(refreshAlpacaAccountStatusParams, {
			scheduleDelaySeconds: 20,
			uri: targetUri,
		});
	};
