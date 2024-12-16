import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	Parameter,
	getFirestoreCollectionPath,
	parametersApi,
} from '@wallot/js';

export const queryParameterPage =
	generalizedFirestoreCollectionPageQuery<Parameter>(
		getFirestoreCollectionPath('parameter'),
		parametersApi as unknown as GeneralizedApiResourceSpec,
	);
