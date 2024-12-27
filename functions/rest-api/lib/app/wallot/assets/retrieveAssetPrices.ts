import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	RetrieveAssetPricesQueryParams,
	RetrieveAssetPricesResponse,
} from '@wallot/js';
import { alphaVantage } from '../../../services.js';

export const retrieveAssetPrices = async (
	_body: Record<string, never>,
	_params: Record<string, never>,
	{ symbol }: RetrieveAssetPricesQueryParams,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<RetrieveAssetPricesResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	const response = await alphaVantage.get<RetrieveAssetPricesResponse>('', {
		searchParams: {
			function: 'REALTIME_BULK_QUOTES',
			symbol,
		},
	});
	const json = await response.json();

	return { json };
};
