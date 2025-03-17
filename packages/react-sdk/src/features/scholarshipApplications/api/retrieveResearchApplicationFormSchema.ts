import { doc, getDoc } from 'firebase/firestore';
import {
	firebaseFirestoreInstance,
	handleFirestoreOperationError,
} from 'ergonomic-react/src/lib/firebase';
import { ResearchApplicationFormSchema } from '@wallot/js';

export async function retrieveResearchApplicationFormSchema() {
	try {
		const docRef = doc(
			firebaseFirestoreInstance,
			'_test',
			'research_data_properties',
		);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data() as ResearchApplicationFormSchema;
		} else {
			throw new Error('No ResearchApplicationFormSchema!');
		}
	} catch (err) {
		return handleFirestoreOperationError(err);
	}
}
