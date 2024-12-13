import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	User,
	getFirestoreCollectionPath,
	usersApi,
} from '@wallot/js';

export const queryUserPage = generalizedFirestoreCollectionPageQuery<User>(
	getFirestoreCollectionPath('user'),
	usersApi as unknown as GeneralizedApiResourceSpec,
);
