import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	RequestNewAchTransferParams,
	RequestNewAchTransferResponse,
} from '@wallot/js';
import {  gcp, } from '../../../services.js';

export const requestNewAchTransfer = async (
	{
		amount: amountInCents,
		bank_account: bankAccountId,
		direction,
	}: RequestNewAchTransferParams,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<RequestNewAchTransferResponse>> => {
	if (firebaseUser == null) throw new Error('Unauthorized');
	amountInCents;
	bankAccountId;
	direction;
	const { uid: userId } = firebaseUser;
  userId;
  await gcp.tasks.enqueueRequestAlpacaAchTransfer({
    amountInCents,
    bankAccountId,
    // direction,
    userId,
  })
	return { json: {} };
};
