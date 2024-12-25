import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateParameterParams, Parameter, parametersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createParameter = generalizedFirestoreDocumentCreateOperation<CreateParameterParams, Parameter>(parametersApi as unknown as GeneralizedApiResourceSpec);
