import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateAlpacaOrderParams,
	AlpacaOrder,
	getFirestoreCollectionPath,
	alpacaOrdersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaOrder = generalizedFirestoreDocumentCreateOperation<
	CreateAlpacaOrderParams,
	AlpacaOrder
>(
	getFirestoreCollectionPath('alpaca_order'),
	alpacaOrdersApi as unknown as GeneralizedApiResourceSpec,
);
