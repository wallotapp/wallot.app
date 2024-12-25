import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateModelParams, Model, modelsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createModel = generalizedFirestoreDocumentCreateOperation<CreateModelParams, Model>(modelsApi as unknown as GeneralizedApiResourceSpec);
