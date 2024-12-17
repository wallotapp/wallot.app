import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdatePaymentMethodParams, paymentMethodsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updatePaymentMethod =
	generalizedFirestoreDocumentUpdateOperation<UpdatePaymentMethodParams>(
		paymentMethodsApi as unknown as GeneralizedApiResourceSpec,
	);
