import { getFunctions } from 'firebase-admin/functions';
import { getCloudTasksScheduleDelaySeconds } from '../../getCloudTasksScheduleDelaySeconds.js';

export type BatchSendResearchApplicationEmailsParams = {
	ceiling: number;
};

export function enqueueBatchSendResearchApplicationEmailsParams(
	getCloudFunctionUrl: (functionName: string) => Promise<string>,
	log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
) {
	return async (
		targetUtcIso: string,
		params: BatchSendResearchApplicationEmailsParams,
	) => {
		const queue =
			getFunctions().taskQueue<BatchSendResearchApplicationEmailsParams>(
				'batchSendResearchApplicationEmails',
			);
		const targetUri = await getCloudFunctionUrl(
			'batchSendResearchApplicationEmails',
		);
		log({
			message:
				'Enqueuing batchSendResearchApplicationEmails task',
			targetUri,
			targetUtcIso,
			params,
		});
		await queue.enqueue(params, {
			scheduleDelaySeconds: getCloudTasksScheduleDelaySeconds(targetUtcIso),
			uri: targetUri,
		});
	};
}
