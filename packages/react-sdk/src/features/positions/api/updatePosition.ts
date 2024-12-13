import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdatePositionParams,
	Position,
	getFirestoreCollectionPath,
	positionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updatePosition = generalizedFirestoreDocumentUpdateOperation<
	UpdatePositionParams,
	Position
>(
	getFirestoreCollectionPath('position'),
	positionsApi as unknown as GeneralizedApiResourceSpec,
);
