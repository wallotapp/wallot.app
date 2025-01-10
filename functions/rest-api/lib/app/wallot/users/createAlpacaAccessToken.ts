import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	CreateAlpacaAccessTokenParams,
	CreateAlpacaAccessTokenResponse,
} from '@wallot/js';
import { alpaca, log } from '../../../services.js';

export const createAlpacaAccessToken = async (
	params: CreateAlpacaAccessTokenParams,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<CreateAlpacaAccessTokenResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	log({
		message: 'Starting createAlpacaAccessToken',
		params,
		userId: firebaseUser.uid,
	});
	const json = await alpaca.oauth.createAlpacaAccessToken(params);
	log({
		message: 'createAlpacaAccessToken Successful',
		json,
		userId: firebaseUser.uid,
	});

	return { json };
};
