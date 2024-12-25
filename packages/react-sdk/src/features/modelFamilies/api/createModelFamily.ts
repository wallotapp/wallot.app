import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateModelFamilyParams,
	ModelFamily,
	modelFamiliesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createModelFamily = generalizedFirestoreDocumentCreateOperation<
	CreateModelFamilyParams,
	ModelFamily
>(modelFamiliesApi as unknown as GeneralizedApiResourceSpec);
