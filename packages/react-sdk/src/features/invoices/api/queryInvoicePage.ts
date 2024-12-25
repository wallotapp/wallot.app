import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Invoice, invoicesApi } from '@wallot/js';

export const queryInvoicePage =
	generalizedFirestoreCollectionPageQuery<Invoice>(
		invoicesApi as unknown as GeneralizedApiResourceSpec,
	);
