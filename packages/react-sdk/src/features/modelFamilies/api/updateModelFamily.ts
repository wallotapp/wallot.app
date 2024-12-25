import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateModelFamilyParams, modelFamiliesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateModelFamily = generalizedFirestoreDocumentUpdateOperation<UpdateModelFamilyParams>(modelFamiliesApi as unknown as GeneralizedApiResourceSpec);
