import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateUserParams,
	User,
	getFirestoreCollectionPath,
	usersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createUser =
	generalizedFirestoreDocumentCreateOperation<
		CreateUserParams,
		User
	>(
		getFirestoreCollectionPath('user'),
		usersApi as unknown as GeneralizedApiResourceSpec,
	);
