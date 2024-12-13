import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateOrderParams,
	Order,
	getFirestoreCollectionPath,
	ordersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createOrder =
	generalizedFirestoreDocumentCreateOperation<
		CreateOrderParams,
		Order
	>(
		getFirestoreCollectionPath('order'),
		ordersApi as unknown as GeneralizedApiResourceSpec,
	);
