import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateParameterParams,
	Parameter,
	getFirestoreCollectionPath,
	parametersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createParameter = generalizedFirestoreDocumentCreateOperation<
	CreateParameterParams,
	Parameter
>(
	getFirestoreCollectionPath('parameter'),
	parametersApi as unknown as GeneralizedApiResourceSpec,
);
