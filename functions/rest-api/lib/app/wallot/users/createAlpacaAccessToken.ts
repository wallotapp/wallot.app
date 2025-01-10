import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	CreateAlpacaAccessTokenParams,
	CreateAlpacaAccessTokenResponse,
	UpdateUserParams,
	usersApi,
} from '@wallot/js';
import { alpaca, crypto, db, log } from '../../../services.js';

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

	const onFinished = async () => {
		const { encrypt } = crypto;
		const { data, ivHex } = encrypt(accessToken);
		const updateParams: UpdateUserParams = {
			alpaca_oauth_access_token_data: data,
			alpaca_oauth_access_token_iv_hex: ivHex,
		};
		const userId = firebaseUser.uid;
		await db.collection(usersApi.collectionId).doc(userId).update(updateParams);
		log({
			message: 'Updated user with alpaca_oauth_access_token',
			json: { userId },
		});
	};

	return { json: {}, onFinished };
};
