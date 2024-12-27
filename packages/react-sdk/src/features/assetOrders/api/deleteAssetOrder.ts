import { collection, doc, deleteDoc } from 'firebase/firestore';
import {
	firebaseFirestoreInstance,
	handleFirestoreOperationError,
} from 'ergonomic-react/src/lib/firebase';
import { assetOrdersApi } from '@wallot/js';

export const deleteAssetOrder = async (
	assetOrderId: string,
): Promise<Record<string, never>> => {
	try {
		// Get the Firestore collection reference
		const collectionRef = collection(
			firebaseFirestoreInstance,
			assetOrdersApi.collectionId,
		);
		const documentRef = doc(collectionRef, assetOrderId);

		// Delete the document
		await deleteDoc(documentRef);

		return {};
	} catch (error) {
		return handleFirestoreOperationError(error);
	}
};
