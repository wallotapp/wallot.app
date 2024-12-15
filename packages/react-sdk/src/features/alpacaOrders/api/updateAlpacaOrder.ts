import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAlpacaOrderParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateAlpacaOrder =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaOrderParams>(
		getFirestoreCollectionPath('alpaca_order'),
	);
