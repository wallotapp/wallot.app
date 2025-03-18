import { DateTime } from 'luxon';
import { readFileSync } from 'fs';
import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import {
	ScholarshipApplication,
	UserActivatedByAlpaca,
	getHomeSiteRoute,
	scholarshipApplicationsApi,
	usersApi,
} from '@wallot/js';
import { BatchSendResearchApplicationEmailsParams } from '@wallot/node';
import { db, gcp, gmail, log } from '../../services.js';
import { variables, siteOriginByTarget } from '../../variables.js';
import { getEmailBody, SendEmailWithGmailAPIParams } from '@wallot/node';
import { FieldValue } from 'firebase-admin/firestore';
import { directoryPath } from '../../directoryPath.js';

const emailTemplateRelativePath =
	'visionaryScholarships/visionaryScholarshipApplicationResearchEmail.html';
const emailTemplateFullPath = `${directoryPath}/../assets/emails/${emailTemplateRelativePath}`;
const emailTemplate = readFileSync(emailTemplateFullPath, 'utf8');

export const handleBatchSendResearchApplicationEmailsTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

export const handleBatchSendResearchApplicationEmailsTask: CloudTaskHandler<
	BatchSendResearchApplicationEmailsParams
> = async ({ data: { ceiling } }) => {
	try {
		// Query the submitted scholarship applications
		// Query all the users
		const [scholarshipApplicationDocs, userDocs] = await Promise.all([
			db
				.collection(scholarshipApplicationsApi.collectionId)
				.where('status', '==', 'submitted')
				.get(),
			db.collection(usersApi.collectionId).get(),
		]);
		const scholarshipApplications = scholarshipApplicationDocs.docs.map(
			(doc) => doc.data() as ScholarshipApplication,
		);
		const users = userDocs.docs.map(
			(doc) => doc.data() as UserActivatedByAlpaca,
		);

		// Locate the relevant scholarship applications and users in-memory via filter() and find()
		// Construct the Gmail API parameters from the user's email address and first name
		const scholarshipApplicationsToEmail = scholarshipApplications.filter(
			(application) => {
				return (
					(application.reminder_emails_sent_for_research_application == null ||
						application.reminder_emails_sent_for_research_application <
							ceiling) &&
					application.is_looking_for_summer_program !== true
				);
			},
		);

		const gmailParamSet: {
			gmailParams: SendEmailWithGmailAPIParams;
			scholarshipApplicationId: string;
		}[] = [];

		for (const application of scholarshipApplicationsToEmail) {
			let user = users.find((user) => user._id === application.user);
			if (user == null) {
				const userDoc = await db
					.collection(usersApi.collectionId)
					.doc(application.user)
					.get();
				user = userDoc.data() as UserActivatedByAlpaca;
			}
			if (user == null) {
				log(
					{
						message: `User not found for scholarship application ${application._id}. Trying to send research email.`,
						code: 'USER_NOT_FOUND',
						ceiling,
					},
					{ type: 'error' },
				);
				await gmail.sendDeveloperAlert({
					message: `User not found for scholarship application ${application._id}`,
					subject:
						'[Wallot Developer Alerts] USER_NOT_FOUND error in research application GCP Task',
				});
				continue;
			}
			const { alpaca_account_identity, firebase_auth_email } = user;
			const firstName = alpaca_account_identity?.given_name;
			const body = getEmailBody(emailTemplate, {
				recipient_greeting: firstName
					? `Hi ${firstName.trim()},`
					: 'Dear Applicant,',
				application_link: getHomeSiteRoute({
					includeOrigin: true,
					origin: siteOriginByTarget.HOME_SITE,
					queryParams: {},
					routeStaticId: 'HOME_SITE__/SCHOLARSHIPS/APPLICATION',
				}),
			});
			gmailParamSet.push({
				gmailParams: {
					html_body: body,
					recipient_email: firebase_auth_email,
					subject: 'Invitation to Apply to our Summer Research Program',
					sender_email:
						variables.SERVER_VAR_GMAIL_NOTIFICATIONS_SEND_FROM_EMAIL_VISIONARY_SCHOLARSHIP,
					sender_name:
						variables.SERVER_VAR_GMAIL_NOTIFICATIONS_SEND_FROM_NAME_VISIONARY_SCHOLARSHIP,
					sender_user_id: variables.SERVER_VAR_GMAIL_NOTIFICATIONS_USER_ID,
				},
				scholarshipApplicationId: application._id,
			});
		}

		// Send the emails 8 seconds apart
		const now = DateTime.now().toUTC().plus({ seconds: 20 });
		const delaySeconds = 8;
		let idx = 0;
		const batches = [db.batch()];
		for (const { gmailParams, scholarshipApplicationId } of gmailParamSet) {
			// Queue the email
			const timestamp = (
				idx === 0 ? now : now.plus({ seconds: delaySeconds * idx })
			).toISO();
			await gcp.tasks.enqueueSendEmailWithGmailAPI(timestamp, gmailParams);
			// Increment each `reminder_emails_sent_for_research_application` property by 1 via a batch update
			const scholarshipApplicationRef = db
				.collection(scholarshipApplicationsApi.collectionId)
				.doc(scholarshipApplicationId);
			const batchIdx = Math.floor(idx / 490);
			let batch = batches[batchIdx];
			if (batch == null) {
				batches.push(db.batch());
				batch = batches[batchIdx];
			}
			batch!.update(scholarshipApplicationRef, {
				reminder_emails_sent_for_research_application: FieldValue.increment(1),
			});
			idx++;
		}
		await Promise.all(batches.map((batch) => batch.commit()));
		log({
			message: 'Batch delivery of research application emails successful',
			ceiling,
			numEmails: gmailParamSet.length,
		});
		return Promise.resolve();
	} catch (err) {
		log(
			{
				message: 'Batch delivery of research application emails failed',
				code: 'EMAIL_DELIVERY_FAILED',
				ceiling,
				err,
			},
			{ type: 'error' },
		);
		// If email failed, throw an error
		throw new firebaseFunctions.https.HttpsError(
			'internal',
			'Batch delivery of research application emails failed',
		);
	}
};
