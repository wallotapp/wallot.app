import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateInvoiceParams, invoicesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateInvoice = generalizedFirestoreDocumentUpdateOperation<UpdateInvoiceParams>(invoicesApi as unknown as GeneralizedApiResourceSpec);
