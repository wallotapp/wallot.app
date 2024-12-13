import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	License,
	getFirestoreCollectionPath,
	licensesApi,
} from '@wallot/js';

export const queryLicensePage = generalizedFirestoreCollectionPageQuery<License>(
	getFirestoreCollectionPath('license'),
	licensesApi as unknown as GeneralizedApiResourceSpec,
);
