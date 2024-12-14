import * as express from 'express';
import {
	getGeneralizedError,
	FirebaseUserCustomTokenParams,
	FirebaseUserCustomTokenResponse,
} from 'ergonomic';
import { getFirebaseAuth } from 'ergonomic-node';
import { secrets } from '../../../secrets.js';

/**
 * Creates a Firebase Auth custom token for a user.
 *
 * This is an Express router function that generates a custom token for a user
 * based on the provided ID token in the request body. The custom token can then be
 * used to authenticate the user with Firebase.
 *
 * @param {express.Request} req - The Express request object, expected to contain the ID token in the body.
 * @param {express.Response} res - The Express response object, used to send back the custom token or errors.
 * @param {express.NextFunction} next - The next middleware function in the Express stack.
 */
export const createFirebaseAuthCustomTokenFunction =
	(
		req: express.Request<unknown, unknown, FirebaseUserCustomTokenParams>,
		res: express.Response<unknown, FirebaseUserCustomTokenResponse>,
		next: express.NextFunction,
	) =>
	() => {
		return void (async () => {
			try {
				// Extract the ID token from the request body
				const { id_token: idToken } = req.body;
				if (!idToken) throw new Error('No id_token in request body');

				// Initialize Firebase Auth with the provided secrets
				const auth = getFirebaseAuth(secrets);

				// Verify the ID token and extract the user ID (uid)
				const { uid } = await auth.verifyIdToken(idToken);

				// Create a custom token for the user
				const customToken = await auth.createCustomToken(uid);

				// Store the custom token in the response locals
				res.locals.data = [{ custom_token: customToken }];

				// Proceed to the next middleware
				return next();
			} catch (err) {
				// Handle errors and store them in the response locals
				const message = (err as Error)?.message || 'Unknown error';
				res.locals.errors = res.locals.errors?.length
					? res.locals.errors
					: [getGeneralizedError({ message })];
				return next();
			}
		})();
	};
