import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	AlpacaAchRelationship,
	getFirestoreCollectionPath,
	alpacaAchRelationshipsApi,
} from '@wallot/js';

export const queryAlpacaAchRelationshipPage =
	generalizedFirestoreCollectionPageQuery<AlpacaAchRelationship>(
		getFirestoreCollectionPath('alpaca_ach_relationship'),
		alpacaAchRelationshipsApi as unknown as GeneralizedApiResourceSpec,
	);
