import * as express from 'express';
import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import {
	GeneralizedResLocals,
	getAuthHeaderBearerToken,
	isResLocalsJsonError,
} from 'ergonomic-node';
import { auth } from '../firebaseApp.js';
import { handleRouterFunctionError } from './handleRouterFunctionError.js';
import { getGeneralizedError } from 'ergonomic';

/**
 * Creates an Express router function that handles asynchronous operations.
 *
 * @template TResponseData - The type of the response data.
 * @template TParams - The type of the parameters.
 * @template TQuery - The type of the query parameters.
 * @param {function(TParams, TQuery, FirebaseUser | null): Promise<TResponseData[]>} fn - The asynchronous function to be executed.
 * @param {{ requiresAuth: boolean }} [options={ requiresAuth: true }] - The options for the router function.
 * @returns An Express middleware function.
 */
export const createRouterFunction = <TResponseData, TParams, TQuery>(
	fn: (
		params: TParams,
		query: TQuery,
		firebaseUser: FirebaseUser | null,
	) => Promise<TResponseData>,
	options: { requiresAuth: boolean } = { requiresAuth: true },
) => {
	return (
			req: express.Request<unknown, unknown, TParams, TQuery>,
			res: express.Response<TResponseData, GeneralizedResLocals<TResponseData>>,
			next: express.NextFunction,
		) =>
		() => {
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
