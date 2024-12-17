import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Stock, stocksApi } from '@wallot/js';

export const queryStockPage = generalizedFirestoreCollectionPageQuery<Stock>(
	stocksApi as unknown as GeneralizedApiResourceSpec,
);
