import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreatePaymentMethodParams,
	PaymentMethod,
	getFirestoreCollectionPath,
	paymentMethodsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createPaymentMethod = generalizedFirestoreDocumentCreateOperation<
	CreatePaymentMethodParams,
	PaymentMethod
>(
	getFirestoreCollectionPath('payment_method'),
	paymentMethodsApi as unknown as GeneralizedApiResourceSpec,
);
