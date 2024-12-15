import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	ModelFamily,
	getFirestoreCollectionPath,
	modelFamiliesApi,
} from '@wallot/js';

export const queryModelFamilyPage =
	generalizedFirestoreCollectionPageQuery<ModelFamily>(
		getFirestoreCollectionPath('model_family'),
		modelFamiliesApi as unknown as GeneralizedApiResourceSpec,
	);
