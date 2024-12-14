import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FirebaseUserCustomTokenResponse } from 'ergonomic';
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
 * @param {Record<string, never>} _params None
 * @param {Record<string, never>} _query None
 * @param {FirebaseUser | null} firebaseUser The Firebase user.
 * @returns {Promise<FirebaseUserCustomTokenResponse['data']>} The custom token for the user.
 */
export const createFirebaseAuthCustomToken = async (
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FirebaseUserCustomTokenResponse['data']> => {
	if (!firebaseUser) throw new Error('Unauthorized');

	// Initialize Firebase Auth with the provided secrets
	const auth = getFirebaseAuth(secrets);

	// Create a custom token for the user
	const customToken = await auth.createCustomToken(firebaseUser.uid);

	// Store the custom token in the response locals
	return [{ custom_token: customToken }];
};
