import {
	ScholarshipApplicationFormDataParams,
	UpdateUserParams,
	User,
	usersApi,
} from '@wallot/js';
import { db } from '../../../services.js';

export async function getUpdateUserParamsFromScholarshipApplicationFormDataParams(
	userId: string,
	params: ScholarshipApplicationFormDataParams,
): Promise<UpdateUserParams> {
	const prevUserDoc = await db
		.collection(usersApi.collectionId)
		.doc(userId)
		.get();
	const prevUser = prevUserDoc.data() as User;
	return {
		alpaca_account_contact: {
			...prevUser.alpaca_account_contact,
			phone_number: params.phone_number,
		} as User['alpaca_account_contact'],
		alpaca_account_identity: {
			...prevUser.alpaca_account_identity,
			date_of_birth: params.date_of_birth,
			family_name: params.family_name,
			given_name: params.given_name,
		} as User['alpaca_account_identity'],
	};
}
