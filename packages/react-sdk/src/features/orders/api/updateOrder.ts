import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateOrderParams,
	Order,
	getFirestoreCollectionPath,
	ordersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateOrder =
	generalizedFirestoreDocumentUpdateOperation<
		UpdateOrderParams,
		Order
	>(
		getFirestoreCollectionPath('order'),
		ordersApi as unknown as GeneralizedApiResourceSpec,
	);
