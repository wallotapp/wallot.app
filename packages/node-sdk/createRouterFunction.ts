import * as express from 'express';
import {
	type Auth,
	type DecodedIdToken as FirebaseUser,
} from 'firebase-admin/auth';
// eslint-disable-next-line import/no-unresolved
import { type Firestore } from 'firebase-admin/firestore';
import {
	GeneralizedResLocals,
	getAuthHeaderBearerToken,
	isResLocalsJsonError,
} from 'ergonomic-node';
import { getGeneralizedError } from 'ergonomic';
import { handleRouterFunctionError } from './handleRouterFunctionError.js';
import { AuthCredential, authCredentialsApi } from '@wallot/js';

/**
 * Creates an Express router function that handles asynchronous operations.
 */
export const createRouterFunction =
	(auth: Auth, db: Firestore) =>
	<TParams, TResponseBody, TRequestBody, TQuery>(
		fn: (
			body: TRequestBody,
			params: TParams,
			query: TQuery,
			firebaseUser: FirebaseUser | null,
			userId: string | null,
		) => Promise<TResponseBody>,
		options: { requiresAuth: boolean } = { requiresAuth: true },
	) => {
		return (
				req: express.Request<TParams, TResponseBody, TRequestBody, TQuery>,
				res: express.Response<
					TResponseBody,
					GeneralizedResLocals<TResponseBody>
				>,
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

						// Query the AUTH_CREDENTIAL document from Firestore using the db/{authCredentialsApi.collectionId}/{uid}
						// Get the `user` property from the AUTH_CREDENTIAL document which is a foreign key to the `users` collection
						let userId: string | undefined;
						if (firebaseUser) {
							const authCredentialDoc = await db
								.collection(authCredentialsApi.collectionId)
								.doc(firebaseUser.uid)
								.get();
							if (authCredentialDoc.exists) {
								const authCredentialData =
									authCredentialDoc.data() as AuthCredential;
								if (authCredentialData) {
									userId = authCredentialData.user;
								}
							}
						}

						// Extract the payload from the request body
						const body = req.body;

						// Extract the parameters from the request
						const params = req.params;

						// Extract the query parameters from the request
						const query = req.query;

						// Call the router function
						res.locals.json = await fn(
							body,
							params,
							query,
							firebaseUser ?? null,
							userId ?? null,
						);

						// Proceed to the next middleware
						return next();
					} catch (err) {
						return handleRouterFunctionError(res, next, err);
					}
				});
			};
	};
