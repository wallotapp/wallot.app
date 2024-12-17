import {
	type CloudEvent,
	// eslint-disable-next-line import/no-unresolved
} from 'firebase-functions/v2';
import { MessagePublishedData } from 'firebase-functions/v2/pubsub';
import { firebaseFunctions } from 'ergonomic-node';

/**
 * Cloud Function for handling image uploads
 *
 * This function is triggered by a Pub/Sub message published to the 'image-uploads' topic.
 *
 * @example
 * ```typescript
 * import { PubSub } from '@google-cloud/pubsub';
 * const pubsub = new PubSub();
 *
 * async function processImageAsynchronously(imagePath: string) {
 * 	const topic = pubsub.topic('image-uploads');
 * 	await topic.publishMessage({
 * 		json: { imagePath },
 * 	});
 * 	console.log('Published image upload event.');
 * }
 *
 * processImageAsynchronously('path/to/image.jpg').catch(console.error);
 * ```
 */
export const processImage =
	firebaseFunctions.pubsub.onMessagePublished<ResizeParams>(
		'image-uploads',
		resizeAndValidateImage,
	);

async function resizeAndValidateImage(
	event: CloudEvent<MessagePublishedData<ResizeParams>>,
) {
	// Get the `imagePath` attribute of the PubSub message JSON body.
	let imagePath: string | null = null;
	try {
		imagePath = event.data.message.json.imagePath;
	} catch (e) {
		console.error('PubSub message was not JSON', e);
	}

	if (imagePath) {
		// Example logic for resizing and validating images
		await new Promise((resolve) => setTimeout(resolve, 2500));
		console.log(`Resizing and validating image at: ${imagePath}`);
	} else {
		console.error('PubSub message did not contain an `imagePath` attribute.');
	}
}

type ResizeParams = {
	imagePath: string;
};
