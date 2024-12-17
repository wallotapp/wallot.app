import { firebaseFunctions } from 'ergonomic-node';

export const triggers = firebaseFunctions.https.onRequest(async (_req, res) => {
	await new Promise((resolve) => setTimeout(resolve, 2500));
	res.send('Hello from triggers!');
});
