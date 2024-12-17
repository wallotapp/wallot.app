import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AlpacaPosition, alpacaPositionsApi } from '@wallot/js';

export const queryAlpacaPositionPage =
	generalizedFirestoreCollectionPageQuery<AlpacaPosition>(
		alpacaPositionsApi as unknown as GeneralizedApiResourceSpec,
	);
