import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateAlpacaOrderParams,
	AlpacaOrder,
	alpacaOrdersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaOrder = generalizedFirestoreDocumentCreateOperation<
	CreateAlpacaOrderParams,
	AlpacaOrder
>(alpacaOrdersApi as unknown as GeneralizedApiResourceSpec);
