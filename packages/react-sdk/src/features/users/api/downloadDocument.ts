import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';

export const downloadDocument = async (
	firebaseUser: FirebaseUser | null,
	documentId: string,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}
		const data = await getAuthenticatedKyInstance(firebaseUser)
			.get(`v0/documents/${documentId}/download`)
			.json<{ download_url: string }>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
