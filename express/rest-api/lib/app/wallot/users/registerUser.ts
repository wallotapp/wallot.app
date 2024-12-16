import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { RegisterUserParams, RegisterUserResponse } from '@wallot/js';
import { auth } from '../../../firebaseApp.js';

export const registerUser = async (
	{ email, password, username }: RegisterUserParams,
	_query: Record<string, never>,
	_firebaseUser: FirebaseUser | null,
): Promise<RegisterUserResponse> => {
	email;
	password;
	username;
	const firebaseUser = { uid: 'TODO' };

	// Create a custom token for the user
	const customToken = await auth.createCustomToken(firebaseUser.uid);

	return { custom_token: customToken, redirect_url: 'TODO' };
};
