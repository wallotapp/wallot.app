import { secrets } from './secrets.js';
import { getServices } from '@wallot/node';

export const { alpacaBrokerApiClient, auth, bucket, db, stripe } =
	getServices(secrets);
