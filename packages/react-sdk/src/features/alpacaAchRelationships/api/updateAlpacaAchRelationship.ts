import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAlpacaAchRelationshipParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateAlpacaAchRelationship =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaAchRelationshipParams>(
		getFirestoreCollectionPath('alpaca_ach_relationship'),
	);
