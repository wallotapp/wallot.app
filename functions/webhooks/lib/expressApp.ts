import * as cors from 'cors';
import * as express from 'express';
import { statSync } from 'fs';
import {
	addHealthRoutesToExpressApp,
	logExpressInvocation,
	sendExpressResponse,
} from 'ergonomic-node';
import { User, usersApi as apiResourceSpec } from '@wallot/js';
import { secrets } from './secrets.js';
import { variables } from './variables.js';
import { directoryPath } from './directoryPath.js';

// ---- Create Express App ---- //
const corsPolicy = cors.default({ origin: true, optionsSuccessStatus: 200 });
const app = express.default();

// ---- Invocation Initialization Middleware ---- //
app.use(express.json());

// ---- Health Checks ---- //

// Gmail API
const gmailApiServiceAccountPath = `${directoryPath}/../gmailApiServiceAccount.json`;
if (!statSync(gmailApiServiceAccountPath).isFile()) {
	throw new Error(`${gmailApiServiceAccountPath} is not a file`);
}

// JavaScript SDK
const mockApiResource: User = {
	...apiResourceSpec.apiResourceDefaultJson,
	category: 'default',
	name: 'My User',
	alpaca_account_id: '...',
	firebase_auth_emails: [],
	investing_goals: [],
	parameters: [],
	stripe_customer_id: '...',
	username: '...',
};

// Add routes
addHealthRoutesToExpressApp(app, {
	...secrets,
	...variables,
	apiResourceSpec,
	corsPolicy,
	gmailApiServiceAccountPath,
	mockApiResource,
});

// ---- End of Invocation Middleware ---- //
app.use(sendExpressResponse());
app.use(logExpressInvocation(secrets));

export const expressApp = app;
