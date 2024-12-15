import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateModelFamilyParams,
	ModelFamily,
	getFirestoreCollectionPath,
	modelFamiliesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createModelFamily = generalizedFirestoreDocumentCreateOperation<
	CreateModelFamilyParams,
	ModelFamily
>(
	getFirestoreCollectionPath('model_family'),
	modelFamiliesApi as unknown as GeneralizedApiResourceSpec,
);
