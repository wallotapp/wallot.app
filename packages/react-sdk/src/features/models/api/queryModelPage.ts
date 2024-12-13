import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Model, getFirestoreCollectionPath, modelsApi } from '@wallot/js';

export const queryModelPage = generalizedFirestoreCollectionPageQuery<Model>(
	getFirestoreCollectionPath('model'),
	modelsApi as unknown as GeneralizedApiResourceSpec,
);
