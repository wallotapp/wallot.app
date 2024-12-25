import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateModelParams, modelsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateModel = generalizedFirestoreDocumentUpdateOperation<UpdateModelParams>(modelsApi as unknown as GeneralizedApiResourceSpec);
