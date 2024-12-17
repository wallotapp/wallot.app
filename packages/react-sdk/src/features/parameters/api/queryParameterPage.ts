import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Parameter, parametersApi } from '@wallot/js';

export const queryParameterPage =
	generalizedFirestoreCollectionPageQuery<Parameter>(
		parametersApi as unknown as GeneralizedApiResourceSpec,
	);
