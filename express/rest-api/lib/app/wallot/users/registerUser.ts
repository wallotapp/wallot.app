// import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { RegisterUserParams, RegisterUserResponse } from '@wallot/js';
import { auth } from '../../../firebaseApp.js';

export const registerUser = async ({
	email,
	password,
	username,
}: RegisterUserParams): Promise<RegisterUserResponse> => {
	// Register a Firebase User
	// Create a Stripe Customer
	// Create a STRIPE_CUSTOMER Firestore document
	// Create a USER Firestore document
	// Create an AUTH_CREDENTIAL Firestore document
	// Create an EQUITY_ACCOUNT Firestore document
	// Create a LICENSE Firestore document
	// Create an ORDER Firestore document
	// Create a PAYMENT_METHOD Firestore document
	// Create a Firebase custom token (JWT)
	// Construct the redirect URL using custom token

	email;
	password;
	username;
	const firebaseUser = { uid: 'TODO' };
	const customToken = await auth.createCustomToken(firebaseUser.uid);

	return { custom_token: customToken, redirect_url: 'TODO' };
};
