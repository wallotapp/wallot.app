import * as express from 'express';
import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import {
	GeneralizedResLocals,
	getAuthHeaderBearerToken,
	getFirebaseAuth,
} from 'ergonomic-node';
import { secrets } from '../secrets.js';
import { handleRouterFunctionError } from './handleRouterFunctionError.js';
import { log } from './log.js';

/**
 * Creates an Express router function that handles asynchronous operations.
 *
 * @template TResponseData - The type of the response data.
 * @template TParams - The type of the parameters.
 * @template TQuery - The type of the query parameters.
 * @param {function(TParams, TQuery, FirebaseUser | null): Promise<TResponseData[]>} fn - The asynchronous function to be executed.
 * @returns An Express middleware function.
 */
export const createRouterFunction = <TResponseData, TParams, TQuery>(
	fn: (
		params: TParams,
		query: TQuery,
		firebaseUser: FirebaseUser | null,
	) => Promise<TResponseData>,
) => {
	return (
			req: express.Request<unknown, unknown, TParams, TQuery>,
			res: express.Response<unknown, GeneralizedResLocals<TResponseData>>,
			next: express.NextFunction,
		) =>
		() => {
			return void (async () => {
				try {
					// Get the function caller's Firebase user
					const auth = getFirebaseAuth(secrets);

					// Get the Firebase user from the request
					let firebaseUser: FirebaseUser | undefined;
					try {
						const firebaseUserJwt = getAuthHeaderBearerToken(req);
						if (!firebaseUserJwt) throw new Error('No firebaseUserJwt');
						firebaseUser = await auth.verifyIdToken(firebaseUserJwt);
					} catch (_) {
						log('No Firebase user found in request', { type: 'error' });
					}

					// Extract the parameters from the request body
					const params = req.body;

					// Extract the query parameters from the request
					const query = req.query;

					// Call the router function
					res.locals.json = await fn(params, query, firebaseUser ?? null);

					// Proceed to the next middleware
					return next();
				} catch (err) {
					return handleRouterFunctionError(res, next, err);
				}
			});
		};
};
