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
	ActivateUserResponse,
	ActivateUserParams,
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
			createRouterFunction(registerUser, { requiresAuth: false })(
				req,
				res,
				next,
			),
		);
	},
);

import { activateUser } from './app/wallot/users/activateUser.js';
app.options('*/v0/users/:userId/activate', corsPolicy);
app.post(
	'*/v0/users/:userId/activate',
	(
		req: express.Request<
			{ userId: string },
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
		corsPolicy(req, res, createRouterFunction(activateUser)(req, res, next));
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
			createRouterFunction(createFirebaseAuthCustomToken)(req, res, next),
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
	alpaca_account: '...',
	investing_goals: [],
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