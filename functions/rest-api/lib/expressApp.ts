import * as cors from 'cors';
import * as express from 'express';
import { statSync } from 'fs';
import { Stripe } from 'stripe';
import { FirebaseUserCustomTokenResponse } from 'ergonomic';
import { GeneralizedResLocals, addHealthRoutesToExpressApp, logExpressInvocation, sendExpressResponse } from 'ergonomic-node';
import {
	ActivateUserResponse,
	ActivateUserParams,
	ConnectBankAccountsParams,
	ConnectBankAccountsResponse,
	CreateStripeFinancialConnectionsSessionParams,
	CreateStripeFinancialConnectionsSessionResponse,
	RegisterUserParams,
	RegisterUserResponse,
	TokenizeBankAccountParams,
	TokenizeBankAccountResponse,
	User,
	usersApi as apiResourceSpec,
	ConfirmOrderParams,
	ConfirmOrderResponse,
} from '@wallot/js';
import { createRouterFunction } from '@wallot/node';
import { secrets } from './secrets.js';
import { variables } from './variables.js';
import { auth } from './services.js';
import { directoryPath } from './directoryPath.js';

// ---- Create Express App ---- //
const corsPolicy = cors.default({ origin: true, optionsSuccessStatus: 200 });
const app = express.default();

// ---- Invocation Initialization Middleware ---- //
app.use(express.json());

// ---- Application Routes: Wallot ---- //

// Bank Accounts
import { connectBankAccounts } from './app/wallot/bankAccounts/connectBankAccounts.js';
app.options('*/v0/bank-accounts/connect', corsPolicy);
app.post(
	'*/v0/bank-accounts/connect',
	(
		req: express.Request<Record<string, never>, ConnectBankAccountsResponse, ConnectBankAccountsParams<Stripe.FinancialConnections.Account>, Record<string, never>>,
		res: express.Response<ConnectBankAccountsResponse, GeneralizedResLocals<ConnectBankAccountsResponse>>,
		next,
	) => {
		corsPolicy(req, res, createRouterFunction(auth, secrets)(connectBankAccounts)(req, res, next));
	},
);

import { tokenizeBankAccount } from './app/wallot/bankAccounts/tokenizeBankAccount.js';
app.options('*/v0/bank-accounts/:bankAccountId/tokenize', corsPolicy);
app.post(
	'*/v0/bank-accounts/:bankAccountId/tokenize',
	(req: express.Request<{ bankAccountId: string }, TokenizeBankAccountResponse, TokenizeBankAccountParams, Record<string, never>>, res: express.Response<TokenizeBankAccountResponse, GeneralizedResLocals<TokenizeBankAccountResponse>>, next) => {
		corsPolicy(req, res, createRouterFunction(auth, secrets)(tokenizeBankAccount)(req, res, next));
	},
);

// Orders
import { confirmOrder } from './app/wallot/orders/confirmOrder.js';
app.options('*/v0/orders/:orderId/confirm', corsPolicy);
app.post(
	'*/v0/orders/:orderId/confirm',
	(req: express.Request<{ orderId: string }, ConfirmOrderResponse, ConfirmOrderParams, Record<string, never>>, res: express.Response<ConfirmOrderResponse, GeneralizedResLocals<ConfirmOrderResponse>>, next) => {
		corsPolicy(req, res, createRouterFunction(auth, secrets)(confirmOrder)(req, res, next));
	},
);

// Users
import { registerUser } from './app/wallot/users/registerUser.js';
app.options('*/v0/users', corsPolicy);
app.post('*/v0/users', (req: express.Request<Record<string, never>, RegisterUserResponse, RegisterUserParams, Record<string, never>>, res: express.Response<RegisterUserResponse, GeneralizedResLocals<RegisterUserResponse>>, next) => {
	corsPolicy(
		req,
		res,
		createRouterFunction(auth, secrets)(registerUser, {
			requiresAuth: false,
		})(req, res, next),
	);
});

import { activateUser } from './app/wallot/users/activateUser.js';
app.options('*/v0/users/activate', corsPolicy);
app.post('*/v0/users/activate', (req: express.Request<Record<string, never>, ActivateUserResponse, ActivateUserParams, Record<string, never>>, res: express.Response<ActivateUserResponse, GeneralizedResLocals<ActivateUserResponse>>, next) => {
	corsPolicy(req, res, createRouterFunction(auth, secrets)(activateUser)(req, res, next));
});

// ---- Application Routes: Firebase ---- //

// Custom Tokens
import { createFirebaseAuthCustomToken } from './app/firebase/auth/createFirebaseAuthCustomToken.js';
app.options('*/v0/firebase/auth/custom-tokens', corsPolicy);
app.post(
	'*/v0/firebase/auth/custom-tokens',
	(req: express.Request<Record<string, never>, FirebaseUserCustomTokenResponse, Record<string, never>, Record<string, never>>, res: express.Response<FirebaseUserCustomTokenResponse, GeneralizedResLocals<FirebaseUserCustomTokenResponse>>, next) => {
		corsPolicy(req, res, createRouterFunction(auth, secrets)(createFirebaseAuthCustomToken)(req, res, next));
	},
);

// ---- Application Routes: Stripe ---- //

// Financial Connections Sessions
import { createStripeFinancialConnectionsSession } from './app/stripe/financialConnections/createStripeFinancialConnectionsSession.js';
app.options('*/v0/stripe/financial-connections/sessions', corsPolicy);
app.post(
	'*/v0/stripe/financial-connections/sessions',
	(
		req: express.Request<CreateStripeFinancialConnectionsSessionParams, CreateStripeFinancialConnectionsSessionResponse, Record<string, never>, Record<string, never>>,
		res: express.Response<CreateStripeFinancialConnectionsSessionResponse, GeneralizedResLocals<CreateStripeFinancialConnectionsSessionResponse>>,
		next,
	) => {
		corsPolicy(req, res, createRouterFunction(auth, secrets)(createStripeFinancialConnectionsSession)(req, res, next));
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
	activation_reminder_task_id: '...',
	alpaca_account_id: '...',
	firebase_auth_email: '...',
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
