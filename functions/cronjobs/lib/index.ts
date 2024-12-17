import { firebaseFunctions } from 'ergonomic-node';

export const cronjobs = firebaseFunctions.https.onRequest(async (_req, res) => {
	await new Promise((resolve) => setTimeout(resolve, 2500));
	res.send('Hello from cronjobs!');
});
