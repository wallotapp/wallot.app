import { readFileSync } from 'fs';
import { gmail, log } from '../../services.js';
import { variables } from '../../variables.js';
import { directoryPath } from '../../directoryPath.js';

const emailTemplateRelativePath =
	'visionaryScholarships/visionaryScholarshipConfirmationEmail.html';
const emailTemplateFullPath = `${directoryPath}/assets/emails/${emailTemplateRelativePath}`;
const emailTemplate = readFileSync(emailTemplateFullPath, 'utf8');

export async function sendVisionaryScholarshipConfirmationEmail(
	recipientEmail: string,
) {
	const result = await gmail.send({
		html_body: emailTemplate,
		recipient_email: recipientEmail,
		sender_email:
			variables.SERVER_VAR_GMAIL_NOTIFICATIONS_SEND_FROM_EMAIL_VISIONARY_SCHOLARSHIP,
		sender_name:
			variables.SERVER_VAR_GMAIL_NOTIFICATIONS_SEND_FROM_NAME_VISIONARY_SCHOLARSHIP,
		subject: 'Florida Visionary Scholarship Application Confirmation',
	});
	log({
		message:
			'Sent Florida Visionary Scholarship Application Confirmation email',
		recipientEmail,
		result,
	});
	return Promise.resolve();
}
