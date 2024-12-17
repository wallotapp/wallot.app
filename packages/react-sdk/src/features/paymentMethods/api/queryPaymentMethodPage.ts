import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { PaymentMethod, paymentMethodsApi } from '@wallot/js';

export const queryPaymentMethodPage =
	generalizedFirestoreCollectionPageQuery<PaymentMethod>(
		paymentMethodsApi as unknown as GeneralizedApiResourceSpec,
	);
