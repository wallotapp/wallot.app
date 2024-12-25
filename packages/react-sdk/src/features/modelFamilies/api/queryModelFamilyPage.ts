import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { ModelFamily, modelFamiliesApi } from '@wallot/js';

export const queryModelFamilyPage = generalizedFirestoreCollectionPageQuery<ModelFamily>(modelFamiliesApi as unknown as GeneralizedApiResourceSpec);
