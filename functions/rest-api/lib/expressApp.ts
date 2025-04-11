import * as cors from 'cors';
import * as express from 'express';
import { statSync } from 'fs';
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
	UpdateAlpacaAccountResponse,
	UpdateAlpacaAccountParams,
	CreateAlpacaAccessTokenParams,
	CreateAlpacaAccessTokenResponse,
	InvestmentProductNetGainPage,
	ScholarshipApplicationFormDataResponse,
	ScholarshipApplicationFormDataParams,
	ScholarshipApplicationFormDataRouteParams,
	ScholarshipOpenHouseRsvpFormDataResponse,
	ScholarshipOpenHouseRsvpFormDataParams,
	ResearchApplicationFormDataParams,
	ResearchApplicationFormDataResponse,
	ResearchApplicationFormDataRouteParams,
	AcceptResearchSeatFormDataParams,
	AcceptResearchSeatFormDataResponse,
	ResearchAcceptanceLetter,
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
			createRouterFunction(auth, secrets)(confirmOrder)(req, res, next),
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

// Products
import { retrieveInvestmentProductNetGainPage } from './app/wallot/investmentProducts/retrieveInvestmentProductNetGainPage.js';
app.options('*/v0/products/roi', corsPolicy);
app.get(
	'*/v0/products/roi',
	(
		req: express.Request<
			Record<string, never>,
			InvestmentProductNetGainPage,
			Record<string, never>,
			Record<string, never>
		>,
		res: express.Response<
			InvestmentProductNetGainPage,
			GeneralizedResLocals<InvestmentProductNetGainPage>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(
				retrieveInvestmentProductNetGainPage,
				{ requiresAuth: false },
			)(req, res, next),
		);
	},
);

// Scholarship Applications
import { saveScholarshipApplication } from './app/wallot/scholarshipApplications/saveScholarshipApplication.js';
app.options(
	'*/v0/scholarship-applications/:scholarshipApplicationId',
	corsPolicy,
);
app.patch(
	'*/v0/scholarship-applications/:scholarshipApplicationId',
	(
		req: express.Request<
			ScholarshipApplicationFormDataRouteParams,
			ScholarshipApplicationFormDataResponse,
			ScholarshipApplicationFormDataParams,
			Record<string, never>
		>,
		res: express.Response<
			ScholarshipApplicationFormDataResponse,
			GeneralizedResLocals<ScholarshipApplicationFormDataResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(saveScholarshipApplication)(
				req,
				res,
				next,
			),
		);
	},
);

import { submitScholarshipApplication } from './app/wallot/scholarshipApplications/submitScholarshipApplication.js';
app.options(
	'*/v0/scholarship-applications/:scholarshipApplicationId/submit',
	corsPolicy,
);
app.post(
	'*/v0/scholarship-applications/:scholarshipApplicationId/submit',
	(
		req: express.Request<
			ScholarshipApplicationFormDataRouteParams,
			ScholarshipApplicationFormDataResponse,
			ScholarshipApplicationFormDataParams,
			Record<string, never>
		>,
		res: express.Response<
			ScholarshipApplicationFormDataResponse,
			GeneralizedResLocals<ScholarshipApplicationFormDataResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(submitScholarshipApplication)(
				req,
				res,
				next,
			),
		);
	},
);

import { submitScholarshipOpenHouseRsvp } from './app/wallot/scholarshipApplications/submitScholarshipOpenHouseRsvp.js';
app.options('*/v0/scholarship-applications/open-houses/rsvp', corsPolicy);
app.post(
	'*/v0/scholarship-applications/open-houses/rsvp',
	(
		req: express.Request<
			Record<string, never>,
			ScholarshipOpenHouseRsvpFormDataResponse,
			ScholarshipOpenHouseRsvpFormDataParams,
			Record<string, never>
		>,
		res: express.Response<
			ScholarshipOpenHouseRsvpFormDataResponse,
			GeneralizedResLocals<ScholarshipOpenHouseRsvpFormDataResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(submitScholarshipOpenHouseRsvp, {
				requiresAuth: false,
			})(req, res, next),
		);
	},
);

import { saveResearchApplication } from './app/wallot/scholarshipApplications/saveResearchApplication.js';
app.options(
	'*/v0/scholarship-applications/:scholarshipApplicationId/research',
	corsPolicy,
);
app.patch(
	'*/v0/scholarship-applications/:scholarshipApplicationId/research',
	(
		req: express.Request<
			ResearchApplicationFormDataRouteParams,
			ResearchApplicationFormDataResponse,
			ResearchApplicationFormDataParams,
			Record<string, never>
		>,
		res: express.Response<
			ResearchApplicationFormDataResponse,
			GeneralizedResLocals<ResearchApplicationFormDataResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(saveResearchApplication)(
				req,
				res,
				next,
			),
		);
	},
);

import { submitResearchApplication } from './app/wallot/scholarshipApplications/submitResearchApplication.js';
app.options(
	'*/v0/scholarship-applications/:scholarshipApplicationId/research/submit',
	corsPolicy,
);
app.post(
	'*/v0/scholarship-applications/:scholarshipApplicationId/research/submit',
	(
		req: express.Request<
			ResearchApplicationFormDataRouteParams,
			ResearchApplicationFormDataResponse,
			ResearchApplicationFormDataParams,
			Record<string, never>
		>,
		res: express.Response<
			ResearchApplicationFormDataResponse,
			GeneralizedResLocals<ResearchApplicationFormDataResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(submitResearchApplication)(
				req,
				res,
				next,
			),
		);
	},
);

import { acceptResearchSeat } from './app/wallot/scholarshipApplications/acceptResearchSeat.js';
app.options(
	'*/v0/scholarship-applications/:scholarshipApplicationId/research/accept-seat',
	corsPolicy,
);
app.post(
	'*/v0/scholarship-applications/:scholarshipApplicationId/research/accept-seat',
	(
		req: express.Request<
			ResearchApplicationFormDataRouteParams,
			AcceptResearchSeatFormDataResponse,
			AcceptResearchSeatFormDataParams,
			Record<string, never>
		>,
		res: express.Response<
			AcceptResearchSeatFormDataResponse,
			GeneralizedResLocals<AcceptResearchSeatFormDataResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(acceptResearchSeat, {
				requiresAuth: false,
			})(req, res, next),
		);
	},
);

import { retrieveAcceptanceLetterForVerifiedUser } from './app/wallot/scholarshipApplications/retrieveAcceptanceLetterForVerifiedUser.js';
app.options('*/v0/scholarship-applications/acceptance-letters', corsPolicy);
app.get(
	'*/v0/scholarship-applications/acceptance-letters',
	(
		req: express.Request<
			Record<string, never>,
			ResearchAcceptanceLetter,
			Record<string, never>,
			Pick<AcceptResearchSeatFormDataParams, 'client_verification'>
		>,
		res: express.Response<
			ResearchAcceptanceLetter,
			GeneralizedResLocals<ResearchAcceptanceLetter>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(
				retrieveAcceptanceLetterForVerifiedUser,
				{
					requiresAuth: false,
				},
			)(req, res, next),
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

import { createAlpacaAccessToken } from './app/wallot/users/createAlpacaAccessToken.js';
app.options('*/v0/users/alpaca-access-tokens', corsPolicy);
app.post(
	'*/v0/users/alpaca-access-tokens',
	(
		req: express.Request<
			Record<string, never>,
			CreateAlpacaAccessTokenResponse,
			CreateAlpacaAccessTokenParams,
			Record<string, never>
		>,
		res: express.Response<
			CreateAlpacaAccessTokenResponse,
			GeneralizedResLocals<CreateAlpacaAccessTokenResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(createAlpacaAccessToken)(
				req,
				res,
				next,
			),
		);
	},
);

import { updateAlpacaAccount } from './app/wallot/users/updateAlpacaAccount.js';
app.options('*/v0/users/alpaca-account', corsPolicy);
app.patch(
	'*/v0/users/alpaca-account',
	(
		req: express.Request<
			Record<string, never>,
			UpdateAlpacaAccountResponse,
			UpdateAlpacaAccountParams,
			Record<string, never>
		>,
		res: express.Response<
			UpdateAlpacaAccountResponse,
			GeneralizedResLocals<UpdateAlpacaAccountResponse>
		>,
		next,
	) => {
		corsPolicy(
			req,
			res,
			createRouterFunction(auth, secrets)(updateAlpacaAccount)(req, res, next),
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

// Hot reload check
if (secrets.SECRET_CRED_SERVER_PROTOCOL === 'http') {
	app.get('/v0/hot', (_req, res) => {
		res.status(200).send({ noop: variables.NOOP });
	});
}

// ---- End of Invocation Middleware ---- //
app.use(sendExpressResponse());
app.use(logExpressInvocation(secrets));

export const expressApp = app;
