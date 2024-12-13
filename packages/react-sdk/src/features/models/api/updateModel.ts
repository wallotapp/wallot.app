import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateModelParams,
	Model,
	getFirestoreCollectionPath,
	modelsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateModel =
	generalizedFirestoreDocumentUpdateOperation<
		UpdateModelParams,
		Model
	>(
		getFirestoreCollectionPath('model'),
		modelsApi as unknown as GeneralizedApiResourceSpec,
	);
