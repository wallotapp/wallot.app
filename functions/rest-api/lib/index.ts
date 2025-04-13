import { firebaseFunctions } from 'ergonomic-node';
import { expressApp } from './expressApp.js';

export const rest_api = firebaseFunctions.https.onRequest(
	{ memory: '512MiB' },
	expressApp,
);
