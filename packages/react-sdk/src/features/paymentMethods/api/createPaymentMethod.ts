import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreatePaymentMethodParams,
	PaymentMethod,
	paymentMethodsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createPaymentMethod = generalizedFirestoreDocumentCreateOperation<
	CreatePaymentMethodParams,
	PaymentMethod
>(paymentMethodsApi as unknown as GeneralizedApiResourceSpec);
