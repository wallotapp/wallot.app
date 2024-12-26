import { getFunctions } from 'firebase-admin/functions';

export type CreateAlpacaAccountTaskParams = {
	orderId: string;
};
export type RefreshAlpacaAccountStatusTaskParams = {
	orderId: string;
};

export const enqueueCreateAlpacaAccount =
	(
		getCloudFunctionUrl: (functionName: string) => Promise<string>,
		log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
	) =>
	async (createAlpacaAccountParams: CreateAlpacaAccountTaskParams) => {
		const queue = getFunctions().taskQueue<CreateAlpacaAccountTaskParams>(
			'create_alpaca_account',
		);
		const targetUri = await getCloudFunctionUrl('create_alpaca_account');
		log({
			message: 'Enqueuing create_alpaca_account task',
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
				'refresh_alpaca_account_status',
			);
		const targetUri = await getCloudFunctionUrl(
			'refresh_alpaca_account_status',
		);
		log({
			message: 'Enqueuing refresh_alpaca_account_status task',
			targetUri,
			refreshAlpacaAccountStatusParams,
		});
		await queue.enqueue(refreshAlpacaAccountStatusParams, {
			scheduleDelaySeconds: 20,
			uri: targetUri,
		});
	};
