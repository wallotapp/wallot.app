import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	ScholarshipApplicationFormDataRouteParams,
	ScholarshipApplicationFormDataResponse,
	ScholarshipApplicationFormDataParams,
	usersApi,
	scholarshipApplicationsApi,
} from '@wallot/js';
import { db } from '../../../services.js';
import { getUpdateUserParamsFromScholarshipApplicationFormDataParams } from './getUpdateUserParamsFromScholarshipApplicationFormDataParams.js';
import { getUpdateScholarshipApplicationParamsFromScholarshipApplicationFormDataParams } from './getUpdateScholarshipApplicationParamsFromScholarshipApplicationFormDataParams.js';

export const saveScholarshipApplication = async (
	params: ScholarshipApplicationFormDataParams,
	{ scholarshipApplicationId }: ScholarshipApplicationFormDataRouteParams,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
	headers: Record<string, unknown>,
): Promise<FunctionResponse<ScholarshipApplicationFormDataResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	const email = firebaseUser.email;
	if (email == null) throw new Error('User email not found');

	// Initialize a Firestore batch transaction
	const batch = db.batch();

	// Save user changes
	const updateUserParams =
		await getUpdateUserParamsFromScholarshipApplicationFormDataParams(
			firebaseUser.uid,
			params,
		);
	batch.update(
		db.collection(usersApi.collectionId).doc(firebaseUser.uid),
		updateUserParams,
	);

	// Save application changes
	const updateScholarshipApplicationParams =
		getUpdateScholarshipApplicationParamsFromScholarshipApplicationFormDataParams(
			params,
			'save',
		);
	batch.update(
		db
			.collection(scholarshipApplicationsApi.collectionId)
			.doc(scholarshipApplicationId),
		updateScholarshipApplicationParams,
	);

	// Commit changes
	await batch.commit();

	// Check headers for 'X-Platform-Version'
	if (headers['x-platform-version']) {
		return { json: {} };
	}

	throw new Error('Please refresh the page and save your changes again.');
};
