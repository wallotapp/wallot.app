import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AlpacaAchRelationship, alpacaAchRelationshipsApi } from '@wallot/js';

export const queryAlpacaAchRelationshipPage =
	generalizedFirestoreCollectionPageQuery<AlpacaAchRelationship>(
		alpacaAchRelationshipsApi as unknown as GeneralizedApiResourceSpec,
	);
