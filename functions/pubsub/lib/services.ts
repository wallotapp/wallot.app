import { secrets } from './secrets.js';
import { getServices } from '@wallot/node';

export const {
	alpaca,
	alphaVantage,
	auth,
	bucket,
	crypto,
	db,
	log,
	openAI,
	stripe,
} = getServices(secrets);
