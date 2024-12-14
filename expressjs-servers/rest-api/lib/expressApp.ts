import * as cors from 'cors';
import * as express from 'express';
import { statSync } from 'fs';
import { GeneralizedResponse } from 'ergonomic';
import {
	addHealthRoutesToExpressApp,
	initializeResLocalsWithGeneralizedResponseFields,
	logExpressInvocation,
	sendExpressResponse,
} from 'ergonomic-node';
import {
	User,
	usersApi as apiResourceSpec,
	AlpacaAchRelationship,
	CreateAlpacaAchRelationshipsParams,
	StripeFinancialConnectionSession,
	CreateStripeFinancialConnectionSessionParams,
} from '@wallot/js';
import serverVariablesLive from './serverVariables.live.json' assert { type: 'json' };
import serverVariablesTest from './serverVariables.test.json' assert { type: 'json' };
import { secrets } from './secrets.js';
import { directoryPath } from './directoryPath.js';
import {
	createAlpacaAchRelationshipFunction,
	createStripeFinancialConnectionSessionFunction,
} from './app/index.js';

const { SECRET_CRED_DEPLOYMENT_ENVIRONMENT } = secrets;
const serverVariables =
	SECRET_CRED_DEPLOYMENT_ENVIRONMENT === 'live'
		? serverVariablesLive
		: serverVariablesTest;

// ---- Create Express App ---- //
const corsPolicy = cors.default({ origin: true, optionsSuccessStatus: 200 });
const app = express.default();

// ---- Invocation Initialization Middleware ---- //
app.use(express.json());
app.use(initializeResLocalsWithGeneralizedResponseFields());

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
};

// Add routes
addHealthRoutesToExpressApp(app, {
	...secrets,
	...serverVariables,
	apiResourceSpec,
	corsPolicy,
	gmailApiServiceAccountPath,
	mockApiResource,
});

// ---- Application Routes: Billing ---- //
app.options('*/v0/alpaca/ach-relationships', corsPolicy);
app.post(
	'*/v0/alpaca/ach-relationships',
	(
		req: express.Request<unknown, unknown, CreateAlpacaAchRelationshipsParams>,
		res: express.Response<unknown, GeneralizedResponse<AlpacaAchRelationship>>,
		next,
	) => {
		corsPolicy(req, res, createAlpacaAchRelationshipFunction(req, res, next));
	},
);
app.options('*/v0/stripe/financial-connections/create-session', corsPolicy);
app.post(
	'*/v0/stripe/financial-connections/create-session',
	(
		req: express.Request<
			unknown,
			unknown,
			CreateStripeFinancialConnectionSessionParams
		>,
		res: express.Response<
			unknown,
			GeneralizedResponse<StripeFinancialConnectionSession>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createStripeFinancialConnectionSessionFunction(req, res, next),
		);
	},
);

// ---- End of Invocation Middleware ---- //
app.use(sendExpressResponse());
app.use(logExpressInvocation(secrets));

export const expressApp = app;
