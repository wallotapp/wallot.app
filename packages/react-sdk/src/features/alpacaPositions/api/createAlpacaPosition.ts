import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateAlpacaPositionParams,
	AlpacaPosition,
	getFirestoreCollectionPath,
	alpacaPositionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaPosition = generalizedFirestoreDocumentCreateOperation<
	CreateAlpacaPositionParams,
	AlpacaPosition
>(
	getFirestoreCollectionPath('alpaca_position'),
	alpacaPositionsApi as unknown as GeneralizedApiResourceSpec,
);
