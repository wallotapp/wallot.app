import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateAlpacaAchRelationshipParams,
	AlpacaAchRelationship,
	getFirestoreCollectionPath,
	alpacaAchRelationshipsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaAchRelationship =
	generalizedFirestoreDocumentCreateOperation<
		CreateAlpacaAchRelationshipParams,
		AlpacaAchRelationship
	>(
		getFirestoreCollectionPath('alpaca_ach_relationship'),
		alpacaAchRelationshipsApi as unknown as GeneralizedApiResourceSpec,
	);
