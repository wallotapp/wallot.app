import { secrets } from './secrets.js';
import { variables } from './variables.js';
import { getServices } from '@wallot/node';
import { directoryPath } from './directoryPath.js';
const serviceAccountPath = `${directoryPath}/../gmailApiServiceAccount.json`;

export const {
	alpaca,
	alphaVantage,
	auth,
	bucket,
	crypto,
	db,
	gcal,
	gcp,
	gmail,
	log,
	openAI,
	stripe,
} = getServices(secrets, serviceAccountPath, variables);
