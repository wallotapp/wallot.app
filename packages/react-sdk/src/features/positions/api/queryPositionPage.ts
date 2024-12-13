import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	Position,
	getFirestoreCollectionPath,
	positionsApi,
} from '@wallot/js';

export const queryPositionPage = generalizedFirestoreCollectionPageQuery<Position>(
	getFirestoreCollectionPath('position'),
	positionsApi as unknown as GeneralizedApiResourceSpec,
);
