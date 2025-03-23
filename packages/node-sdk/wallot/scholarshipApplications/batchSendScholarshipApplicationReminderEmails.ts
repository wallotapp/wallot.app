import { getFunctions } from 'firebase-admin/functions';
import { getCloudTasksScheduleDelaySeconds } from '../../getCloudTasksScheduleDelaySeconds.js';

export type BatchSendScholarshipApplicationCompletionReminderEmailsParams = {
	ceiling: number;
	type: 'reminder' | 'final_reminder';
};

export function enqueueBatchSendScholarshipApplicationCompletionReminderEmailsParams(
	getCloudFunctionUrl: (functionName: string) => Promise<string>,
	log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
) {
	return async (
		targetUtcIso: string,
		params: BatchSendScholarshipApplicationCompletionReminderEmailsParams,
	) => {
		const queue =
			getFunctions().taskQueue<BatchSendScholarshipApplicationCompletionReminderEmailsParams>(
				'batchSendScholarshipApplicationCompletionReminderEmails',
			);
		const targetUri = await getCloudFunctionUrl(
			'batchSendScholarshipApplicationCompletionReminderEmails',
		);
		log({
			message:
				'Enqueuing batchSendScholarshipApplicationCompletionReminderEmails task',
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
