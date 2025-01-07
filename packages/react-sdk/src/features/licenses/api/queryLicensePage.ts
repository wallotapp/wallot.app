import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { License, licensesApi } from '@wallot/js';

export const queryLicensePage =
	generalizedFirestoreCollectionPageQuery<License>(
		licensesApi as unknown as GeneralizedApiResourceSpec,
	);
