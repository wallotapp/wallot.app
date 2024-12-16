import {
	getCloudStorageBucket,
	getFirebaseAuth,
	getFirestoreDB,
} from 'ergonomic-node';
import { secrets } from './secrets.js';

export const auth = getFirebaseAuth(secrets);
export const bucket = getCloudStorageBucket(
	secrets.SECRET_CRED_FIREBASE_ADMIN_STORAGE_BUCKET_NAME,
);
export const db = getFirestoreDB(secrets);
