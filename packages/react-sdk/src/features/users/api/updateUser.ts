import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateUserParams,
	User,
	getFirestoreCollectionPath,
	usersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateUser = generalizedFirestoreDocumentUpdateOperation<
	UpdateUserParams,
	User
>(
	getFirestoreCollectionPath('user'),
	usersApi as unknown as GeneralizedApiResourceSpec,
);
