import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Order, ordersApi } from '@wallot/js';

export const queryOrderPage = generalizedFirestoreCollectionPageQuery<Order>(
	ordersApi as unknown as GeneralizedApiResourceSpec,
);
