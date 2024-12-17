import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateAlpacaAchRelationshipParams,
	alpacaAchRelationshipsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAlpacaAchRelationship =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaAchRelationshipParams>(
		alpacaAchRelationshipsApi as unknown as GeneralizedApiResourceSpec,
	);
