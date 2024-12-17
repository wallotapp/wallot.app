import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AlpacaOrder, alpacaOrdersApi } from '@wallot/js';

export const queryAlpacaOrderPage =
	generalizedFirestoreCollectionPageQuery<AlpacaOrder>(
		alpacaOrdersApi as unknown as GeneralizedApiResourceSpec,
	);
