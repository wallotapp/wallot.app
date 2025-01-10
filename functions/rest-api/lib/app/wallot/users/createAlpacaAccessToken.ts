import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	CreateAlpacaAccessTokenParams,
	CreateAlpacaAccessTokenResponse,
} from '@wallot/js';
import { alpaca, log } from '../../../services.js';

export const createAlpacaAccessToken = async (
	{ code }: CreateAlpacaAccessTokenParams,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<CreateAlpacaAccessTokenResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	const params = { code, redirect_uri: 'https://wallot.app/oauth/callback' };
	log({
		message: 'Starting createAlpacaAccessToken',
		params,
		userId: firebaseUser.uid,
	});
	const json = await alpaca.oauth.createAlpacaAccessToken(params);
	const { access_token: accessToken } = json;
	log({
		message: 'createAlpacaAccessToken Successful',
		json: {
			...json,
			access_token: accessToken.slice(0, 4) + '...',
		},
		userId: firebaseUser.uid,
	});

	return { json: {} };
};
