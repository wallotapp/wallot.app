import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Invoice, getFirestoreCollectionPath, invoicesApi } from '@wallot/js';

export const queryInvoicePage =
	generalizedFirestoreCollectionPageQuery<Invoice>(
		getFirestoreCollectionPath('invoice'),
		invoicesApi as unknown as GeneralizedApiResourceSpec,
	);
