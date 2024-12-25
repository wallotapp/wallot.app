import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { User, usersApi } from '@wallot/js';

export const queryUserPage = generalizedFirestoreCollectionPageQuery<User>(usersApi as unknown as GeneralizedApiResourceSpec);
