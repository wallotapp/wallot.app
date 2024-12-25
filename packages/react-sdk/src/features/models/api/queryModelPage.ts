import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Model, modelsApi } from '@wallot/js';

export const queryModelPage = generalizedFirestoreCollectionPageQuery<Model>(modelsApi as unknown as GeneralizedApiResourceSpec);
