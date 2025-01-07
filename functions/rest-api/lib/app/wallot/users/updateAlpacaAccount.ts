import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	UpdateAlpacaAccountParams,
	UpdateAlpacaAccountResponse,
} from '@wallot/js';
import { alpaca } from '../../../services.js';

export const updateAlpacaAccount = async (
	params: UpdateAlpacaAccountParams,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<UpdateAlpacaAccountResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	const json = await alpaca.broker.updateAlpacaAccount(params);

	return { json };
};
