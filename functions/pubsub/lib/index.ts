import * as firebaseFunctions from 'firebase-functions';

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
export const processImage = firebaseFunctions.pubsub
  .topic('image-uploads')
  .onPublish(async (message) => {
    console.log('Processing image upload...');
    const data = message.json as { imagePath: string };
    await resizeAndValidateImage(data.imagePath); // Custom image processing logic
    console.log('Image processing completed.');
  });

async function resizeAndValidateImage(imagePath: string) {
	// Example logic for resizing and validating images
  await new Promise((resolve) => setTimeout(resolve, 2500));
  console.log(`Resizing and validating image at: ${imagePath}`);
}
