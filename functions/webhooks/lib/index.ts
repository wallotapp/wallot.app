import { firebaseFunctions } from 'ergonomic-node';
import { expressApp } from './expressApp.js';

export const webhooks = firebaseFunctions.https.onRequest(expressApp);
