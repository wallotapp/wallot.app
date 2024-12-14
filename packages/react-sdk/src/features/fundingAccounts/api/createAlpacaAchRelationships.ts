import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	CreateAlpacaAchRelationshipsParams,
	AlpacaAchRelationships,
} from '@wallot/js';

export const createAlpacaAchRelationships = async (
	firebaseUser: FirebaseUser | null,
	params: CreateAlpacaAchRelationshipsParams,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/alpaca-ach-relationships', {
				json: params,
			})
			.json<AlpacaAchRelationships>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
