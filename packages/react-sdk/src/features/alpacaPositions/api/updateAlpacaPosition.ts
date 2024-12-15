import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAlpacaPositionParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateAlpacaPosition =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaPositionParams>(
		getFirestoreCollectionPath('alpaca_position'),
	);
