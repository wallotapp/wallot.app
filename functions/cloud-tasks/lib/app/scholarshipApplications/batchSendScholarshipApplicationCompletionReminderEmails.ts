import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import {
	ScholarshipApplication,
	UserActivatedByAlpaca,
	scholarshipApplicationsApi,
	usersApi,
} from '@wallot/js';
import { db, gmail, log } from '../../services.js';
import { SendEmailWithGmailAPIParams } from '@wallot/node';

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
		// More simple
		// Query all the scholarship applications
		// Query all the users
		const [scholarshipApplicationDocs, userDocs] = await Promise.all([
			db.collection(scholarshipApplicationsApi.collectionId).get(),
			db.collection(usersApi.collectionId).get(),
		]);
		const scholarshipApplications = scholarshipApplicationDocs.docs.map(
			(doc) => doc.data() as ScholarshipApplication,
		);
		const users = userDocs.docs.map(
			(doc) => doc.data() as UserActivatedByAlpaca,
		);
		// Locate the relevant scholarship applications and users in-memory via filter() and find()
		const scholarshipApplicationsToEmail = scholarshipApplications.filter(
			(application) =>
				application.status === 'in_progress' &&
				(application.reminder_emails_sent_for_application_completion == null ||
					application.reminder_emails_sent_for_application_completion <
						ceiling),
		);
		// Construct the Gmail API parameters from the user's email address and first name
		const gmailParamSet = scholarshipApplicationsToEmail.map(
			(application): SendEmailWithGmailAPIParams => {
				return {};
			},
		);
		// Send the emails 8 seconds apart
		// Increment each `reminder_emails_sent_for_application_completion` property by 1 via a batch update
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

// More scalable
// Query all the scholarship applications whose status is `in_progress` and whose `reminder_emails_sent_for_application_completion` property is an integer less than `ceiling`
// Query each scholarship application's underlying user by reading the `scholarshipApplication.user` foreign key property and executing chunks of Firestore array-contains-any queries over the user document's `_id` property
// Construct the Gmail API parameters from the user's email address and first name
// Send the emails 8 seconds apart
// Increment each `reminder_emails_sent_for_application_completion` property by 1 via a batch update
