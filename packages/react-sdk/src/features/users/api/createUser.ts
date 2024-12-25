import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateUserParams, User, usersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createUser = generalizedFirestoreDocumentCreateOperation<CreateUserParams, User>(usersApi as unknown as GeneralizedApiResourceSpec);
