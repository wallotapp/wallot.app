import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FirebaseUserCustomTokenResponse } from 'ergonomic';
import { FunctionResponse } from '@wallot/node';
import { auth } from '../../../services.js';

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
 * @param {Record<string, never>} _body None
 * @param {Record<string, never>} _params None
 * @param {Record<string, never>} _query None
 * @param {FirebaseUser | null} firebaseUser The Firebase user.
 * @returns {Promise<FunctionResponse<FirebaseUserCustomTokenResponse>>} The custom token for the user.
 */
export const createFirebaseAuthCustomToken = async (
	_body: Record<string, never>,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<FirebaseUserCustomTokenResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');

	const customToken = await auth.createCustomToken(firebaseUser.uid);
	return { json: { custom_token: customToken } };
};
