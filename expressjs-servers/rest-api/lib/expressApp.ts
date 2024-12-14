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
	createAlpacaAccountFunction,
	createAlpacaAchRelationshipFunction,
	createAlpacaAchTransferFunction,
	createAlpacaOrder,
} from './app/alpaca/index.js';
import {
	attachStripePaymentMethodFunction,
	createStripeFinancialConnectionSessionFunction,
	createStripeSubscriptionFunction,
} from './app/stripe/index.js';

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

// ---- Application Routes: Alpaca ---- //

// Accounts
app.options('*/v0/alpaca/accounts', corsPolicy);
app.post(
	'*/v0/alpaca/accounts',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next,
	) => {
		corsPolicy(req, res, createAlpacaAccountFunction(req, res, next));
	},
);

// ACH Relationships
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

// ACH Transfers
app.options('*/v0/alpaca/ach-transfers', corsPolicy);
app.post(
	'*/v0/alpaca/ach-transfers',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next,
	) => {
		corsPolicy(req, res, createAlpacaAchTransferFunction(req, res, next));
	},
);

// Orders
app.options('*/v0/alpaca/orders', corsPolicy);
app.post(
	'*/v0/alpaca/orders',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next,
	) => {
		corsPolicy(req, res, createAlpacaOrder(req, res, next));
	},
);

// ---- Application Routes: Stripe ---- //

// Attach Payment Method
app.options('*/v0/stripe/attach-payment-method', corsPolicy);
app.post(
	'*/v0/stripe/attach-payment-method',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next,
	) => {
		corsPolicy(req, res, attachStripePaymentMethodFunction(req, res, next));
	},
);

// Financial Connection Sessions
app.options('*/v0/stripe/financial-connection-sessions', corsPolicy);
app.post(
	'*/v0/stripe/financial-connection-sessions',
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

// Subscriptions
app.options('*/v0/stripe/subscriptions', corsPolicy);
app.post(
	'*/v0/stripe/subscriptions',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next,
	) => {
		corsPolicy(req, res, createStripeSubscriptionFunction(req, res, next));
	},
);

// ---- End of Invocation Middleware ---- //
app.use(sendExpressResponse());
app.use(logExpressInvocation(secrets));

export const expressApp = app;
