import {
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
 * Learn more about custom tokens:
 * {@link https://firebase.google.com/docs/auth/admin/create-custom-tokens}
 *
 * @param {FirebaseUserCustomTokenParams} params The request parameters.
 * @param {string} params.id_token The ID token of the user.
 * @returns {Promise<FirebaseUserCustomTokenResponse['data']>} The custom token for the user.
 */
export const createFirebaseAuthCustomToken = async (
	params: FirebaseUserCustomTokenParams,
): Promise<FirebaseUserCustomTokenResponse['data']> => {
	// Initialize Firebase Auth with the provided secrets
	const auth = getFirebaseAuth(secrets);

	// Verify the ID token and extract the user ID (uid)
	const { uid } = await auth.verifyIdToken(params.id_token);

	// Create a custom token for the user
	const customToken = await auth.createCustomToken(uid);

	// Store the custom token in the response locals
	return [{ custom_token: customToken }];
};
