import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdatePaymentMethodParams,
	PaymentMethod,
	getFirestoreCollectionPath,
	paymentMethodsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updatePaymentMethod = generalizedFirestoreDocumentUpdateOperation<
	UpdatePaymentMethodParams,
	PaymentMethod
>(
	getFirestoreCollectionPath('payment_method'),
	paymentMethodsApi as unknown as GeneralizedApiResourceSpec,
);
