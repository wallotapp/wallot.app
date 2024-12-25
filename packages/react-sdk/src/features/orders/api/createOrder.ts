import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateOrderParams, Order, ordersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createOrder = generalizedFirestoreDocumentCreateOperation<
	CreateOrderParams,
	Order
>(ordersApi as unknown as GeneralizedApiResourceSpec);
