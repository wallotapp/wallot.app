import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import { gmail, log } from '../../services.js';
import { SendEmailWithGmailAPIParams } from '@wallot/node';

export const handleSendEmailWithGmailAPITaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

export const handleSendEmailWithGmailAPITask: CloudTaskHandler<
	SendEmailWithGmailAPIParams
> = async ({ data }) => {
	try {
		const result = await gmail.send(data);
		log({
			message: 'Email delivery successful',
			recipientEmail: data.recipient_email,
			result,
		});
		return Promise.resolve();
	} catch (err) {
		log(
			{
				message: 'Email delivery failed',
				code: 'EMAIL_DELIVERY_FAILED',
				data,
				err,
			},
			{ type: 'error' },
		);
		// If email failed, throw an error
		throw new firebaseFunctions.https.HttpsError(
			'internal',
			'Email delivery failed',
		);
	}
};
