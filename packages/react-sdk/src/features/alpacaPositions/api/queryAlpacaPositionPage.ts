import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	AlpacaPosition,
	getFirestoreCollectionPath,
	alpacaPositionsApi,
} from '@wallot/js';

export const queryAlpacaPositionPage =
	generalizedFirestoreCollectionPageQuery<AlpacaPosition>(
		getFirestoreCollectionPath('alpaca_position'),
		alpacaPositionsApi as unknown as GeneralizedApiResourceSpec,
	);
