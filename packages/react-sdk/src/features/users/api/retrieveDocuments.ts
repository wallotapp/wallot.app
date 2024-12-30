import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import { AlpacaDocument } from '@wallot/js';

export const retrieveDocuments = async (firebaseUser: FirebaseUser | null) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.get('v0/documents')
			.json<AlpacaDocument[]>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
