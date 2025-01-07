import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import { AlpacaDocument, isKycUser, User } from '@wallot/js';
import { alpaca } from '../../../services.js';
import { db } from '../../../services.js';

export const retrieveDocuments = async (
	_body: Record<string, never>,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<AlpacaDocument[]>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	const userId = firebaseUser.uid;
	const userSnapshot = await db.collection('users').doc(userId).get();
	if (!userSnapshot.exists) throw new Error('User not found');
	const user = userSnapshot.data() as User;
	if (!isKycUser(user)) throw new Error('User is not KYC verified');

	const json = await alpaca.broker.retrieveAlpacaDocuments(user);

	return { json };
};
