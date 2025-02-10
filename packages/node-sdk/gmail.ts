import { JWT } from 'googleapis-common';
import { google } from 'googleapis';
import {
	SendEmailNotificationParams,
	SendEmailNotificationResponse,
} from 'ergonomic-node';

export type SendEmailWithGmailAPIParams = SendEmailNotificationParams & {
	auth: JWT;
	sender_email: string;
	sender_name: string;
	userId: string;
};
export async function sendEmailWithGmailAPI({
	auth,
	html_body: htmlBody,
	recipient_email: recipientEmail,
	sender_email: senderEmail,
	sender_name: senderName,
	subject,
	userId,
}: SendEmailWithGmailAPIParams): Promise<SendEmailNotificationResponse> {
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
}
