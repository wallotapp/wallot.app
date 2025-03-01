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
		// Pre-scale
		// Query all the scholarship applications
		// Query all the users
		// Locate the relevant scholarship applications and users in-memory via filter() and find()
		// Construct the Gmail API parameters from the user's email address and first name
		// Send the emails 8 seconds apart
		const result = await gmail.sendEmail();
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

// At-scale
// Query all the scholarship applications whose status is `in_progress` and whose `reminder_emails_sent_for_application_completion` property is an integer less than `ceiling`
// Query each scholarship application's underlying user by reading the `scholarshipApplication.user` foreign key property and executing chunks of Firestore array-contains-any queries over the user document's `_id` property
// Construct the Gmail API parameters from the user's email address and first name
// Send the emails 8 seconds apart
