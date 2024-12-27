import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	RetrieveAssetPriceRouteParams,
	RetrieveAssetPriceResponse,
} from '@wallot/js';

export const retrieveAssetPrice = async (
	_body: Record<string, never>,
	{ symbol }: RetrieveAssetPriceRouteParams,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<RetrieveAssetPriceResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	symbol;

	return { json: { price: 1 } };
};
