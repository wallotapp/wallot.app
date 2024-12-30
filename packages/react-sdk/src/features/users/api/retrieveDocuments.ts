import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import { AlpacaDocument } from '@wallot/js';
import { downloadDocument } from '@wallot/react/src/features/users/api/downloadDocument';

export const retrieveDocuments = async (firebaseUser: FirebaseUser | null) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.get('v0/documents')
			.json<AlpacaDocument[]>();

		const downloadUrlById: Record<string, string> = {};
		for (const document of data) {
			const downloadUrl = await downloadDocument(firebaseUser, document.id);
			downloadUrlById[document.id] = downloadUrl.download_url;
		}

		return data.map(
			(document): AlpacaDocument => ({
				...document,
				download_url: downloadUrlById[document.id],
			}),
		);
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
