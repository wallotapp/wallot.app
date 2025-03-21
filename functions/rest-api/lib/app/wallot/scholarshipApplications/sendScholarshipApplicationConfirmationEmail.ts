import { readFileSync } from 'fs';
import { getHomeSiteRoute } from '@wallot/js';
import { getEmailBody } from '@wallot/node';
import { gmail, log } from '../../../services.js';
import { variables, siteOriginByTarget } from '../../../variables.js';
import { directoryPath } from '../../../directoryPath.js';

const emailTemplateRelativePath =
	'visionaryScholarships/visionaryScholarshipConfirmationEmail.html';
const emailTemplateFullPath = `${directoryPath}/../assets/emails/${emailTemplateRelativePath}`;
const emailTemplate = readFileSync(emailTemplateFullPath, 'utf8');

export async function sendScholarshipApplicationConfirmationEmail(params: {
	recipientEmail: string;
	recipientGreeting: string;
}) {
	const body = getEmailBody(emailTemplate, {
		application_status_link: getHomeSiteRoute({
			includeOrigin: true,
			origin: siteOriginByTarget.HOME_SITE,
			queryParams: {},
			routeStaticId: 'HOME_SITE__/SCHOLARSHIPS/APPLICATION',
		}),
		recipient_greeting: params.recipientGreeting,
	});
	const result = await gmail.sendEmail({
		html_body: body,
		recipient_email: params.recipientEmail,
		sender_email:
			variables.SERVER_VAR_GMAIL_NOTIFICATIONS_SEND_FROM_EMAIL_VISIONARY_SCHOLARSHIP,
		sender_name:
			variables.SERVER_VAR_GMAIL_NOTIFICATIONS_SEND_FROM_NAME_VISIONARY_SCHOLARSHIP,
		sender_user_id: variables.SERVER_VAR_GMAIL_NOTIFICATIONS_USER_ID,
		subject: 'Florida Visionary Scholarship Application Confirmation',
	});
	log({
		message:
			'Sent Florida Visionary Scholarship Application Confirmation email',
		recipientEmail: params.recipientEmail,
		result,
	});
	return Promise.resolve();
}
