import { firebaseFunctions } from 'ergonomic-node';
import { default as ky } from 'ky-universal';
import { restApiOrigin } from './variables.js';

export const pingRestApiHealthEndpoint = firebaseFunctions.https.onRequest(
	async (_req, res) => {
		const json = await ky
			.create({
				timeout: 10000,
				headers: {
					'Content-Type': 'application/json',
				},
				prefixUrl: restApiOrigin,
			})
			.post('v0/health/ok')
			.json();
		res.status(200).send(json);
	},
);
