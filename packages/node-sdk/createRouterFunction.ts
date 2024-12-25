import * as express from 'express';
import { type Auth, type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { GeneralizedResLocals, getAuthHeaderBearerToken, isResLocalsJsonError } from 'ergonomic-node';
import { getGeneralizedError } from 'ergonomic';
import { handleRouterFunctionError } from './handleRouterFunctionError.js';
import { FunctionResponse } from './FunctionResponse.js';
import { SecretData } from './SecretDataTypes.js';
import { log } from './log.js';

/**
 * Creates an Express router function that handles asynchronous operations.
 */
export const createRouterFunction =
	(auth: Auth, secrets: SecretData) =>
	<TParams, TResponseBody, TRequestBody, TQuery>(
		fn: (body: TRequestBody, params: TParams, query: TQuery, firebaseUser: FirebaseUser | null) => Promise<FunctionResponse<TResponseBody>>,
		options: { requiresAuth: boolean } = { requiresAuth: true },
	) => {
		return (req: express.Request<TParams, TResponseBody, TRequestBody, TQuery>, res: express.Response<TResponseBody, GeneralizedResLocals<TResponseBody>>, next: express.NextFunction) => () => {
			return void (async () => {
				try {
					// Skip if an error was already detected
					if (isResLocalsJsonError(res.locals.json)) return;

					// Get the Firebase user from the request
					let firebaseUser: FirebaseUser | undefined;
					try {
						const firebaseUserJwt = getAuthHeaderBearerToken(req);
						if (!firebaseUserJwt) throw new Error('No firebaseUserJwt');
						firebaseUser = await auth.verifyIdToken(firebaseUserJwt);
					} catch (_) {
						const { requiresAuth } = options;
						if (requiresAuth) {
							res.locals.json = getGeneralizedError({
								message: 'Unauthorized',
								type: 'request.unauthorized',
							});
							return next();
						}
					}

					// Extract the payload from the request body
					const body = req.body;

					// Extract the parameters from the request
					const params = req.params;

					// Extract the query parameters from the request
					const query = req.query;

					// Call the router function
					const { json, onFinished = () => Promise.resolve() } = await fn(body, params, query, firebaseUser ?? null);

					// Set the response body in res.locals.json
					res.locals.json = json;

					// Queue the onFinished function to be called after the response is sent
					res.on('finish', async () => {
						try {
							await onFinished();
						} catch (err) {
							const errorMessage = (err as Error)?.message || 'Unknown error';
							log(secrets.SECRET_CRED_SERVER_PROTOCOL)('Error in onFinished: ' + (secrets.SECRET_CRED_SERVER_PROTOCOL === 'http' ? (err as Error) : errorMessage), { type: 'error' });
						}
					});

					// Proceed to the next middleware
					return next();
				} catch (err) {
					handleRouterFunctionError(res, err);
					return next();
				}
			})();
		};
	};
