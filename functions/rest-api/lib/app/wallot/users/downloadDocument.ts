import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import { isKycUser, User } from '@wallot/js';
import { alpaca } from '../../../services.js';
import { db } from '../../../services.js';

export const downloadDocument = async (
	_body: Record<string, never>,
	{ documentId }: { documentId: string },
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<{ download_url: string }>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	const userId = firebaseUser.uid;
	const userSnapshot = await db.collection('users').doc(userId).get();
	if (!userSnapshot.exists) throw new Error('User not found');
	const user = userSnapshot.data() as User;
	if (!isKycUser(user)) throw new Error('User is not KYC verified');

	const json = await alpaca.broker.downloadAlpacaDocument(user, documentId);

	return { json };
};
