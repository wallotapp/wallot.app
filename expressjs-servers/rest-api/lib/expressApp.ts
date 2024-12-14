import * as cors from 'cors';
import * as express from 'express';
import { statSync } from 'fs';
import {
	GeneralizedResponse,
	FirebaseUserCustomTokenResponse,
} from 'ergonomic';
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
	CreateAlpacaAchRelationshipParams,
	StripeFinancialConnectionSession,
	CreateStripeFinancialConnectionSessionParams,
} from '@wallot/js';
import serverVariablesLive from './serverVariables.live.json' assert { type: 'json' };
import serverVariablesTest from './serverVariables.test.json' assert { type: 'json' };
import { secrets } from './secrets.js';
import { directoryPath } from './directoryPath.js';
import { createRouterFunction } from './utils/createRouterFunction.js';

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

// ---- Application Routes: Wallot ---- //

// Users
import { createUser } from './app/wallot/users/createUser.js';
app.options('*/v0/users', corsPolicy);
app.post(
	'*/v0/users',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next,
	) => {
		corsPolicy(req, res, createUser(req, res, next));
	},
);

// ---- Application Routes: Alpaca ---- //

// Accounts
import { createAlpacaAccount } from './app/alpaca/accounts/createAlpacaAccount.js';
app.options('*/v0/alpaca/accounts', corsPolicy);
app.post(
	'*/v0/alpaca/accounts',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next,
	) => {
		corsPolicy(req, res, createAlpacaAccount(req, res, next));
	},
);

// ACH Relationships
import { createAlpacaAchRelationship } from './app/alpaca/achRelationships/createAlpacaAchRelationship.js';
app.options('*/v0/alpaca/ach-relationships', corsPolicy);
app.post(
	'*/v0/alpaca/ach-relationships',
	(
		req: express.Request<unknown, unknown, CreateAlpacaAchRelationshipParams[]>,
		res: express.Response<unknown, GeneralizedResponse<AlpacaAchRelationship>>,
		next,
	) => {
		corsPolicy(req, res, createAlpacaAchRelationship(req, res, next));
	},
);

// ACH Transfers
import { createAlpacaAchTransfer } from './app/alpaca/achTransfers/createAlpacaAchTransfer.js';
app.options('*/v0/alpaca/ach-transfers', corsPolicy);
app.post(
	'*/v0/alpaca/ach-transfers',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next,
	) => {
		corsPolicy(req, res, createAlpacaAchTransfer(req, res, next));
	},
);

// Orders
import { createAlpacaOrder } from './app/alpaca/orders/createAlpacaOrder.js';
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

// ---- Application Routes: Firebase ---- //

// Custom Tokens
import { createFirebaseAuthCustomToken } from './app/firebase/auth/createFirebaseAuthCustomToken.js';
app.options('*/v0/firebase/auth/custom-tokens', corsPolicy);
app.post(
	'*/v0/firebase/auth/custom-tokens',
	(
		req: express.Request<
			unknown,
			unknown,
			Record<string, never>,
			Record<string, never>
		>,
		res: express.Response<unknown, FirebaseUserCustomTokenResponse>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(createFirebaseAuthCustomToken)(req, res, next),
		);
	},
);

// ---- Application Routes: Stripe ---- //

// Attach Payment Method
import { attachStripePaymentMethod } from './app/stripe/paymentMethods/attachStripePaymentMethod.js';
app.options('*/v0/stripe/attach-payment-method', corsPolicy);
app.post(
	'*/v0/stripe/attach-payment-method',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next,
	) => {
		corsPolicy(req, res, attachStripePaymentMethod(req, res, next));
	},
);

// Financial Connection Sessions
import { createStripeFinancialConnectionSession } from './app/stripe/financialConnections/createStripeFinancialConnectionSession.js';
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
			createStripeFinancialConnectionSession(req, res, next),
		);
	},
);

// Subscriptions
import { createStripeSubscription } from './app/stripe/subscriptions/createStripeSubscription.js';
app.options('*/v0/stripe/subscriptions', corsPolicy);
app.post(
	'*/v0/stripe/subscriptions',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next,
	) => {
		corsPolicy(req, res, createStripeSubscription(req, res, next));
	},
);

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

// ---- End of Invocation Middleware ---- //
app.use(sendExpressResponse());
app.use(logExpressInvocation(secrets));

export const expressApp = app;
