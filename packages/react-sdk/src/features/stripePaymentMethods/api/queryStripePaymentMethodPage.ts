import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { StripePaymentMethod, stripePaymentMethodsApi } from '@wallot/js';

export const queryStripePaymentMethodPage =
	generalizedFirestoreCollectionPageQuery<StripePaymentMethod>(
		stripePaymentMethodsApi as unknown as GeneralizedApiResourceSpec,
	);
