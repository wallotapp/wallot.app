import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateOrderParams, ordersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateOrder = generalizedFirestoreDocumentUpdateOperation<UpdateOrderParams>(ordersApi as unknown as GeneralizedApiResourceSpec);
