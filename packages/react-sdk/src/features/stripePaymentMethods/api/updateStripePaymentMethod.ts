import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateStripePaymentMethodParams,
	stripePaymentMethodsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateStripePaymentMethod =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripePaymentMethodParams>(
		stripePaymentMethodsApi as unknown as GeneralizedApiResourceSpec,
	);
