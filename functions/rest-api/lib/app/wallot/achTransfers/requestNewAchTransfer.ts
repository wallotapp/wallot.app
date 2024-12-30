import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	achTransfersApi,
	RequestNewAchTransferParams,
	RequestNewAchTransferResponse,
} from '@wallot/js';
import { gcp } from '../../../services.js';

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
	await gcp.tasks.enqueueRequestAlpacaAchTransfer({
		achTransferId: achTransfersApi.generateId(),
		amountInCents,
		bankAccountId,
		direction,
		userId: firebaseUser.uid,
	});
	return { json: {} };
};
