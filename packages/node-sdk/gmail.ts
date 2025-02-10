import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import {
	GeneralizedServerVariables,
	SendEmailNotificationParams,
	SendEmailNotificationResponse,
} from 'ergonomic-node';

export type SendEmailWithGmailAPIParams = SendEmailNotificationParams & {
	sender_email: string;
	sender_name: string;
};
export function sendEmailWithGmailAPI(
	serviceAccountPath: string,
	{
		SERVER_VAR_GMAIL_NOTIFICATIONS_SEND_FROM_EMAIL: defaultSendFromEmail,
		SERVER_VAR_GMAIL_NOTIFICATIONS_SEND_FROM_NAME: defaultSendFromName,
		SERVER_VAR_GMAIL_NOTIFICATIONS_USER_ID: userId,
	}: GeneralizedServerVariables,
) {
	return async function ({
		html_body: htmlBody,
		recipient_email: recipientEmail,
		sender_email: senderEmail = defaultSendFromEmail,
		sender_name: senderName = defaultSendFromName,
		subject,
	}: SendEmailWithGmailAPIParams): Promise<SendEmailNotificationResponse> {
		const auth = new GoogleAuth({
			keyFile: serviceAccountPath,
			scopes: 'https://www.googleapis.com/auth/cloud-platform',
		});
		const gmail = google.gmail({
			version: 'v1',
			auth,
		});

		const emailContent = [
			`Content-Type: text/html; charset="UTF-8"`,
			`MIME-Version: 1.0`,
			`Content-Transfer-Encoding: 7bit`,
			`to: ${recipientEmail}`,
			`from: ${senderName} <${senderEmail}>`,
			`subject: ${subject}`,
			'',
			htmlBody,
		].join('\n');

		const message = Buffer.from(emailContent)
			.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');

		const result = await gmail.users.messages.send({
			userId,
			requestBody: {
				raw: message,
			},
		});

		return {
			emailNotificationId: result.data.id,
			success: true,
			threadId: result.data.threadId,
		};
	};
}
