import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	RetrieveAssetPriceQueryParams,
	RetrieveAssetPriceResponse,
} from '@wallot/js';
import { alpaca } from '../../../services.js';

export const retrieveAssetPrice = async (
	_body: Record<string, never>,
	_params: Record<string, never>,
	{ notional, symbol }: RetrieveAssetPriceQueryParams,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<RetrieveAssetPriceResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	const json = await alpaca.broker.estimateAlpacaOrder({
		notional: Number(notional),
		symbol,
	});

	return { json };
};
