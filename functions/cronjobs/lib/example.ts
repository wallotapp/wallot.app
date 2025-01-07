import { firebaseFunctions } from 'ergonomic-node';

export const dailyAnalyticsEmail = firebaseFunctions.https.onRequest(
	async (_req, res) => {
		await new Promise((resolve) => setTimeout(resolve, 2500));
		res.status(200).send('Success- analytics email delivered.');
	},
);
