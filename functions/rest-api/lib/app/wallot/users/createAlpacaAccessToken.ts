import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	CreateAlpacaAccessTokenParams,
	CreateAlpacaAccessTokenResponse,
	getHomeSiteRoute,
	UpdateUserParams,
	usersApi,
} from '@wallot/js';
import { alpaca, crypto, db, log } from '../../../services.js';
import { siteOriginByTarget } from '../../../variables.js';

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
	const alpacaAccessTokenResponse = await alpaca.oauth.createAlpacaAccessToken(
		params,
	);
	const { access_token: accessToken } = alpacaAccessTokenResponse;
	log({
		message: 'createAlpacaAccessToken Successful',
		alpacaAccessTokenResponse: {
			...alpacaAccessTokenResponse,
			access_token: accessToken.slice(0, 4) + '...',
		},
		userId: firebaseUser.uid,
	});

	const redirectUrl = getHomeSiteRoute({
		includeOrigin: true,
		origin: siteOriginByTarget.HOME_SITE,
		queryParams: {},
		routeStaticId: 'HOME_SITE__/ACCOUNT/OVERVIEW',
	});
	const json = { redirect_url: redirectUrl };

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

	return { json, onFinished };
};
