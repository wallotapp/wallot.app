import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	PaymentMethod,
	getFirestoreCollectionPath,
	paymentMethodsApi,
} from '@wallot/js';

export const queryPaymentMethodPage = generalizedFirestoreCollectionPageQuery<PaymentMethod>(
	getFirestoreCollectionPath('payment_method'),
	paymentMethodsApi as unknown as GeneralizedApiResourceSpec,
);
