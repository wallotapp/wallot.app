import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateAlpacaPositionParams,
	AlpacaPosition,
	alpacaPositionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaPosition = generalizedFirestoreDocumentCreateOperation<
	CreateAlpacaPositionParams,
	AlpacaPosition
>(alpacaPositionsApi as unknown as GeneralizedApiResourceSpec);
