import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateStripePaymentMethodParams,
	StripePaymentMethod,
	stripePaymentMethodsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripePaymentMethod =
	generalizedFirestoreDocumentCreateOperation<
		CreateStripePaymentMethodParams,
		StripePaymentMethod
	>(stripePaymentMethodsApi as unknown as GeneralizedApiResourceSpec);
