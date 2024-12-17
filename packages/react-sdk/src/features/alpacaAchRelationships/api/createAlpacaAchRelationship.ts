import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateAlpacaAchRelationshipParams,
	AlpacaAchRelationship,
	alpacaAchRelationshipsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaAchRelationship =
	generalizedFirestoreDocumentCreateOperation<
		CreateAlpacaAchRelationshipParams,
		AlpacaAchRelationship
	>(alpacaAchRelationshipsApi as unknown as GeneralizedApiResourceSpec);
