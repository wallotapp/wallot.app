import { getFunctions } from 'firebase-admin/functions';
import ky from 'ky-universal';
import { google } from 'googleapis';
import {
	GeneralizedServerVariables,
	getGoogleAuthJwtInstanceForGmailApi,
	SendEmailNotificationParams,
	SendEmailNotificationResponse,
} from 'ergonomic-node';
import { getCloudTasksScheduleDelaySeconds } from './getCloudTasksScheduleDelaySeconds.js';

export type SendEmailWithGmailAPIParams = SendEmailNotificationParams & {
	pdf?: {
		fileName?: string; // Defaults to 'file.pdf'
		url: string; // Full URL to the PDF (including access token)
	};
	sender_email: string;
	sender_name: string;
	sender_user_id: string;
};
export function sendEmailWithGmailAPI(
	serviceAccountPath: string,
	variables: GeneralizedServerVariables,
) {
	const {
		SERVER_VAR_GMAIL_NOTIFICATIONS_SEND_FROM_EMAIL: defaultSendFromEmail,
		SERVER_VAR_GMAIL_NOTIFICATIONS_SEND_FROM_NAME: defaultSendFromName,
		SERVER_VAR_GMAIL_NOTIFICATIONS_USER_ID: defaultUserId,
	} = variables;
	return async function ({
		html_body: htmlBody,
		pdf,
		recipient_email: recipientEmail,
		sender_email: senderEmail = defaultSendFromEmail,
		sender_name: senderName = defaultSendFromName,
		sender_user_id: userId = defaultUserId,
		subject,
	}: SendEmailWithGmailAPIParams): Promise<SendEmailNotificationResponse> {
		const auth = getGoogleAuthJwtInstanceForGmailApi({
			...variables,
			SERVER_VAR_GMAIL_NOTIFICATIONS_USER_ID: userId,
			serviceAccountPath,
		});
		const gmail = google.gmail({
			version: 'v1',
			auth,
		});

		if (pdf == null) {
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

		// 1. Download the PDF file using ky-universal.
		//    Note: ky automatically throws on non-2xx status codes.
		const response = await ky.get(pdf.url);
		const pdfArrayBuffer = await response.arrayBuffer();
		const pdfBuffer = Buffer.from(pdfArrayBuffer);
		const pdfBase64 = pdfBuffer.toString('base64');

		// 2. Create a unique MIME boundary string.
		const boundary = '----=_Part_' + new Date().getTime();

		// 3. Construct the multipart MIME message.
		const mimeParts = [
			// Overall headers declaring a multipart message.
			`Content-Type: multipart/mixed; boundary="${boundary}"`,
			'MIME-Version: 1.0',
			`to: ${recipientEmail}`,
			`from: ${senderName} <${senderEmail}>`,
			`subject: ${subject}`,
			'',

			// Part 1: The HTML body.
			`--${boundary}`,
			'Content-Type: text/html; charset="UTF-8"',
			'MIME-Version: 1.0',
			'Content-Transfer-Encoding: 7bit',
			'',
			htmlBody,
			'',

			// Part 2: The PDF attachment.
			`--${boundary}`,
			`Content-Type: application/pdf; name="${pdf.fileName ?? 'file.pdf'}"`,
			'MIME-Version: 1.0',
			'Content-Transfer-Encoding: base64',
			`Content-Disposition: attachment; filename="${
				pdf.fileName ?? 'file.pdf'
			}"`,
			'',
			pdfBase64,
			'',

			// End the MIME message.
			`--${boundary}--`,
		];

		const emailContent = mimeParts.join('\n');
		// 4. Encode the message in URL-safe base64.
		const message = Buffer.from(emailContent)
			.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');

		// 5. Send the email using the Gmail API.
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

export function enqueueSendEmailWithGmailAPI(
	getCloudFunctionUrl: (functionName: string) => Promise<string>,
	log: (log: unknown, options?: { type: 'error' | 'normal' }) => void,
) {
	return async (targetUtcIso: string, params: SendEmailWithGmailAPIParams) => {
		const queue = getFunctions().taskQueue<SendEmailWithGmailAPIParams>(
			'sendEmailWithGmailAPI',
		);
		const targetUri = await getCloudFunctionUrl('sendEmailWithGmailAPI');
		log({
			message: 'Enqueuing sendEmailWithGmailAPI task',
			targetUri,
			params,
		});
		await queue.enqueue(params, {
			scheduleDelaySeconds: getCloudTasksScheduleDelaySeconds(targetUtcIso),
			uri: targetUri,
		});
	};
}

/**
 * Replaces placeholders in a template string with values from a params object.
 * Placeholders in the template should be in the format `{{key}}` where `key` is a property of the params object.
 *
 * @param template - The template string containing placeholders.
 * @param params - An object containing key-value pairs to replace in the template.
 * @returns The template string with placeholders replaced by corresponding values from params.
 *
 * @example
 * ```ts
 * const template = 'Hello, {{name}}!';
 * const params = { name: 'Alice' };
 * const emailBody = getEmailBody(template, params);
 * console.log(emailBody); // 'Hello, Alice!'
 * ```
 */
export function getEmailBody(
	template: string,
	params: { [key: string]: string },
): string {
	return Object.keys(params).reduce((currentTemplate, key) => {
		const placeholder = `{{${key}}}`;
		return currentTemplate.replace(
			new RegExp(placeholder, 'g'),
			params[key] as string,
		);
	}, template);
}
