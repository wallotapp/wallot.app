import {
	type QueryDocumentSnapshot,
	type FirestoreEvent,
	// eslint-disable-next-line import/no-unresolved
} from 'firebase-functions/v2/firestore';
import { firebaseFunctions } from 'ergonomic-node';

export const onUserCreated = firebaseFunctions.firestore.onDocumentCreated('users/{userId}', handleUserCreated);

async function handleUserCreated(event: FirestoreEvent<QueryDocumentSnapshot | undefined, { userId: string }>) {
	const snapshot = event.data;
	if (!snapshot) {
		throw new Error('Document does not exist.');
	}
	const user = snapshot.data() as { name: string; email: string };
	await new Promise((resolve) => setTimeout(resolve, 2500));
	console.log('New user created:', user);
}
