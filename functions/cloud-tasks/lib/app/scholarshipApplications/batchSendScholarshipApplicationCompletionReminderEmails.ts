import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import { gmail, log } from '../../services.js';

export const handleBatchSendScholarshipApplicationCompletionReminderEmailsTaskOptions =
	{
		rateLimits: { maxConcurrentDispatches: 6 },
		retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
	};

export type BatchSendScholarshipApplicationCompletionReminderEmailsParams = {
	ceiling: number;
};
export const handleBatchSendScholarshipApplicationCompletionReminderEmailsTask: CloudTaskHandler<
	BatchSendScholarshipApplicationCompletionReminderEmailsParams
> = async ({ data: { ceiling } }) => {
	try {
		const result = await gmail.sendEmail({
			// todo
		});
		log({
			message:
				'Batch delivery of scholarship application completion reminder emails successful',
			ceiling,
			result,
		});
		return Promise.resolve();
	} catch (err) {
		log(
			{
				message:
					'Batch delivery of scholarship application completion reminder emails failed',
				code: 'EMAIL_DELIVERY_FAILED',
				ceiling,
				err,
			},
			{ type: 'error' },
		);
		// If email failed, throw an error
		throw new firebaseFunctions.https.HttpsError(
			'internal',
			'Batch delivery of scholarship application completion reminder emails failed',
		);
	}
};
