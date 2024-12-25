import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateInvoiceParams, Invoice, invoicesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createInvoice = generalizedFirestoreDocumentCreateOperation<CreateInvoiceParams, Invoice>(invoicesApi as unknown as GeneralizedApiResourceSpec);
