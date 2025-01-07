import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	RetrieveAssetPriceResponse,
	RetrieveAssetPriceQueryParams,
} from '@wallot/js';

export const retrieveAssetPrice = async (
	firebaseUser: FirebaseUser | null,
	searchParams: RetrieveAssetPriceQueryParams,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.get('v0/assets/price', {
				searchParams,
			})
			.json<RetrieveAssetPriceResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
