import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	AlpacaOrder,
	getFirestoreCollectionPath,
	alpacaOrdersApi,
} from '@wallot/js';

export const queryAlpacaOrderPage =
	generalizedFirestoreCollectionPageQuery<AlpacaOrder>(
		getFirestoreCollectionPath('alpaca_order'),
		alpacaOrdersApi as unknown as GeneralizedApiResourceSpec,
	);
