import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStripePaymentMethodParams,
	StripePaymentMethod,
	getFirestoreCollectionPath,
	stripePaymentMethodsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripePaymentMethod =
	generalizedFirestoreDocumentCreateOperation<
		CreateStripePaymentMethodParams,
		StripePaymentMethod
	>(
		getFirestoreCollectionPath('stripe_payment_method'),
		stripePaymentMethodsApi as unknown as GeneralizedApiResourceSpec,
	);
