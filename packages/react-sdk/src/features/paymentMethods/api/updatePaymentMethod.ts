import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdatePaymentMethodParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updatePaymentMethod =
	generalizedFirestoreDocumentUpdateOperation<UpdatePaymentMethodParams>(
		getFirestoreCollectionPath('payment_method'),
	);
