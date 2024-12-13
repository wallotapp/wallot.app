import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreatePositionParams,
	Position,
	getFirestoreCollectionPath,
	positionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createPosition =
	generalizedFirestoreDocumentCreateOperation<
		CreatePositionParams,
		Position
	>(
		getFirestoreCollectionPath('position'),
		positionsApi as unknown as GeneralizedApiResourceSpec,
	);
