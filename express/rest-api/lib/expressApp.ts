import * as cors from 'cors';
import * as express from 'express';
import { statSync } from 'fs';
import { FirebaseUserCustomTokenResponse } from 'ergonomic';
import {
	GeneralizedResLocals,
	addHealthRoutesToExpressApp,
	initializeResLocalsWithGeneralizedResponseFields,
	logExpressInvocation,
	sendExpressResponse,
} from 'ergonomic-node';
import {
	RegisterUserParams,
	RegisterUserResponse,
	User,
	usersApi as apiResourceSpec,
} from '@wallot/js';
import { secrets } from './secrets.js';
import { variables } from './variables.js';
import { directoryPath } from './directoryPath.js';
import { createRouterFunction } from './utils/createRouterFunction.js';

// ---- Create Express App ---- //
const corsPolicy = cors.default({ origin: true, optionsSuccessStatus: 200 });
const app = express.default();

// ---- Invocation Initialization Middleware ---- //
app.use(express.json());
app.use(initializeResLocalsWithGeneralizedResponseFields());

// ---- Application Routes: Wallot ---- //

// Users
import { registerUser } from './app/wallot/users/registerUser.js';
app.options('*/v0/users', corsPolicy);
app.post(
	'*/v0/users',
	(
		req: express.Request<
			unknown,
			unknown,
			RegisterUserParams,
			Record<string, never>
		>,
		res: express.Response<
			RegisterUserResponse,
			GeneralizedResLocals<RegisterUserResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(registerUser, { requiresAuth: false })(
				req,
				res,
				next,
			),
		);
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
		res: express.Response<unknown, GeneralizedResLocals>,
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
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResLocals>,
		next,
	) => {
		corsPolicy(req, res, createAlpacaAchRelationship(req, res, next));
	},
);

// ACH Transfers
import { requestAlpacaAchTransfer } from './app/alpaca/achTransfers/requestAlpacaAchTransfer.js';
app.options('*/v0/alpaca/ach-transfers', corsPolicy);
app.post(
	'*/v0/alpaca/ach-transfers',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResLocals>,
		next,
	) => {
		corsPolicy(req, res, requestAlpacaAchTransfer(req, res, next));
	},
);

// Orders
import { createAlpacaOrder } from './app/alpaca/orders/createAlpacaOrder.js';
app.options('*/v0/alpaca/orders', corsPolicy);
app.post(
	'*/v0/alpaca/orders',
	(
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResLocals>,
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
		res: express.Response<
			FirebaseUserCustomTokenResponse,
			GeneralizedResLocals<FirebaseUserCustomTokenResponse>
		>,
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
		res: express.Response<unknown, GeneralizedResLocals>,
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
		req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResLocals>,
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
		res: express.Response<unknown, GeneralizedResLocals>,
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
	alpaca_account: '...',
	parameters: [],
	stripe_customer: '...',
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
