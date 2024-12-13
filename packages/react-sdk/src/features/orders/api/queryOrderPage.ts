import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	Order,
	getFirestoreCollectionPath,
	ordersApi,
} from '@wallot/js';

export const queryOrderPage = generalizedFirestoreCollectionPageQuery<Order>(
	getFirestoreCollectionPath('order'),
	ordersApi as unknown as GeneralizedApiResourceSpec,
);
