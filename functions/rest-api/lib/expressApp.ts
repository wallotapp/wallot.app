import * as cors from 'cors';
import * as express from 'express';
import { statSync } from 'fs';
import { Stripe } from 'stripe';
import { FirebaseUserCustomTokenResponse } from 'ergonomic';
import {
	GeneralizedResLocals,
	addHealthRoutesToExpressApp,
	logExpressInvocation,
	sendExpressResponse,
} from 'ergonomic-node';
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
	RetrieveAssetPriceQueryParams,
	RetrieveAssetPriceResponse,
	AlpacaPosition,
	RequestNewAchTransferResponse,
	RequestNewAchTransferParams,
	RequestNewOrderParams,
	RequestNewOrderResponse,
	AlpacaDocument,
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

// ACH Transfers
import { requestNewAchTransfer } from './app/wallot/achTransfers/requestNewAchTransfer.js';
app.options('*/v0/transfers', corsPolicy);
app.post(
	'*/v0/transfers',
	(
		req: express.Request<
			Record<string, never>,
			RequestNewAchTransferResponse,
			RequestNewAchTransferParams,
			Record<string, never>
		>,
		res: express.Response<
			RequestNewAchTransferResponse,
			GeneralizedResLocals<RequestNewAchTransferResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(requestNewAchTransfer)(
				req,
				res,
				next,
			),
		);
	},
);

// Assets
import { retrieveAssetPrice } from './app/wallot/assets/retrieveAssetPrice.js';
app.options('*/v0/assets/price', corsPolicy);
app.get(
	'*/v0/assets/price',
	(
		req: express.Request<
			Record<string, never>,
			RetrieveAssetPriceResponse,
			Record<string, never>,
			RetrieveAssetPriceQueryParams
		>,
		res: express.Response<
			RetrieveAssetPriceResponse,
			GeneralizedResLocals<RetrieveAssetPriceResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(retrieveAssetPrice)(req, res, next),
		);
	},
);

// Bank Accounts
import { connectBankAccounts } from './app/wallot/bankAccounts/connectBankAccounts.js';
app.options('*/v0/bank-accounts/connect', corsPolicy);
app.post(
	'*/v0/bank-accounts/connect',
	(
		req: express.Request<
			Record<string, never>,
			ConnectBankAccountsResponse,
			ConnectBankAccountsParams<Stripe.FinancialConnections.Account>,
			Record<string, never>
		>,
		res: express.Response<
			ConnectBankAccountsResponse,
			GeneralizedResLocals<ConnectBankAccountsResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(connectBankAccounts)(req, res, next),
		);
	},
);

import { tokenizeBankAccount } from './app/wallot/bankAccounts/tokenizeBankAccount.js';
app.options('*/v0/bank-accounts/:bankAccountId/tokenize', corsPolicy);
app.post(
	'*/v0/bank-accounts/:bankAccountId/tokenize',
	(
		req: express.Request<
			{ bankAccountId: string },
			TokenizeBankAccountResponse,
			TokenizeBankAccountParams,
			Record<string, never>
		>,
		res: express.Response<
			TokenizeBankAccountResponse,
			GeneralizedResLocals<TokenizeBankAccountResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(tokenizeBankAccount)(req, res, next),
		);
	},
);

// Documents
import { retrieveDocuments } from './app/wallot/users/retrieveDocuments.js';
app.options('*/v0/documents', corsPolicy);
app.get(
	'*/v0/documents',
	(
		req: express.Request<
			Record<string, never>,
			AlpacaDocument[],
			Record<string, never>,
			Record<string, never>
		>,
		res: express.Response<
			AlpacaDocument[],
			GeneralizedResLocals<AlpacaDocument[]>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(retrieveDocuments)(req, res, next),
		);
	},
);

import { downloadDocument } from './app/wallot/users/downloadDocument.js';
app.options('*/v0/documents/:documentId/download', corsPolicy);
app.get(
	'*/v0/documents/:documentId/download',
	(
		req: express.Request<
			{ documentId: string },
			{ download_url: string },
			Record<string, never>,
			Record<string, never>
		>,
		res: express.Response<
			{ download_url: string },
			GeneralizedResLocals<{ download_url: string }>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(downloadDocument)(req, res, next),
		);
	},
);

// Orders
import { confirmOrder } from './app/wallot/orders/confirmOrder.js';
app.options('*/v0/orders/:orderId/confirm', corsPolicy);
app.post(
	'*/v0/orders/:orderId/confirm',
	(
		req: express.Request<
			{ orderId: string },
			ConfirmOrderResponse,
			ConfirmOrderParams,
			Record<string, never>
		>,
		res: express.Response<
			ConfirmOrderResponse,
			GeneralizedResLocals<ConfirmOrderResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(confirmOrder, {
				headers: req.headers,
			})(req, res, next),
		);
	},
);

import { requestNewOrder } from './app/wallot/orders/requestNewOrder.js';
app.options('*/v0/orders', corsPolicy);
app.post(
	'*/v0/orders',
	(
		req: express.Request<
			Record<string, never>,
			RequestNewOrderResponse,
			RequestNewOrderParams,
			Record<string, never>
		>,
		res: express.Response<
			RequestNewOrderResponse,
			GeneralizedResLocals<RequestNewOrderResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(requestNewOrder)(req, res, next),
		);
	},
);

// Positions
import { retrievePositions } from './app/wallot/positions/retrievePositions.js';
app.options('*/v0/positions', corsPolicy);
app.get(
	'*/v0/positions',
	(
		req: express.Request<
			Record<string, never>,
			AlpacaPosition[],
			Record<string, never>,
			Record<string, never>
		>,
		res: express.Response<
			AlpacaPosition[],
			GeneralizedResLocals<AlpacaPosition[]>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(retrievePositions)(req, res, next),
		);
	},
);

// Users
import { registerUser } from './app/wallot/users/registerUser.js';
app.options('*/v0/users', corsPolicy);
app.post(
	'*/v0/users',
	(
		req: express.Request<
			Record<string, never>,
			RegisterUserResponse,
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
			createRouterFunction(auth, secrets)(registerUser, {
				requiresAuth: false,
			})(req, res, next),
		);
	},
);

import { activateUser } from './app/wallot/users/activateUser.js';
app.options('*/v0/users/activate', corsPolicy);
app.post(
	'*/v0/users/activate',
	(
		req: express.Request<
			Record<string, never>,
			ActivateUserResponse,
			ActivateUserParams,
			Record<string, never>
		>,
		res: express.Response<
			ActivateUserResponse,
			GeneralizedResLocals<ActivateUserResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(activateUser)(req, res, next),
		);
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
			Record<string, never>,
			FirebaseUserCustomTokenResponse,
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
			createRouterFunction(auth, secrets)(createFirebaseAuthCustomToken)(
				req,
				res,
				next,
			),
		);
	},
);

// ---- Application Routes: Stripe ---- //

// Financial Connections Sessions
import { createStripeFinancialConnectionsSession } from './app/stripe/financialConnections/createStripeFinancialConnectionsSession.js';
app.options('*/v0/stripe/financial-connections/sessions', corsPolicy);
app.post(
	'*/v0/stripe/financial-connections/sessions',
	(
		req: express.Request<
			CreateStripeFinancialConnectionsSessionParams,
			CreateStripeFinancialConnectionsSessionResponse,
			Record<string, never>,
			Record<string, never>
		>,
		res: express.Response<
			CreateStripeFinancialConnectionsSessionResponse,
			GeneralizedResLocals<CreateStripeFinancialConnectionsSessionResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(
				auth,
				secrets,
			)(createStripeFinancialConnectionsSession)(req, res, next),
		);
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
