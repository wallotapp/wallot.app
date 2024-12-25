import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateUserParams, usersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateUser =
	generalizedFirestoreDocumentUpdateOperation<UpdateUserParams>(
		usersApi as unknown as GeneralizedApiResourceSpec,
	);
