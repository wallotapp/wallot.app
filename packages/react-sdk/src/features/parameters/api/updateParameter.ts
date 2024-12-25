import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateParameterParams, parametersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateParameter = generalizedFirestoreDocumentUpdateOperation<UpdateParameterParams>(parametersApi as unknown as GeneralizedApiResourceSpec);
