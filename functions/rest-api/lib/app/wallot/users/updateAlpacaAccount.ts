import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	UpdateAlpacaAccountParams,
	UpdateAlpacaAccountResponse,
} from '@wallot/js';
import { alpaca, log } from '../../../services.js';

export const updateAlpacaAccount = async (
	params: UpdateAlpacaAccountParams,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<UpdateAlpacaAccountResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	log({
		message: 'Starting updateAlpacaAccount',
		params,
		userId: firebaseUser.uid,
	});
	const json = await alpaca.broker.updateAlpacaAccount(params);
	log({
		message: 'updateAlpacaAccount Successful',
		json,
		userId: firebaseUser.uid,
	});

	return { json };
};
