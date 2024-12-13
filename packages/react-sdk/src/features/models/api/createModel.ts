import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateModelParams,
	Model,
	getFirestoreCollectionPath,
	modelsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createModel =
	generalizedFirestoreDocumentCreateOperation<
		CreateModelParams,
		Model
	>(
		getFirestoreCollectionPath('model'),
		modelsApi as unknown as GeneralizedApiResourceSpec,
	);
