import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Position, positionsApi } from '@wallot/js';

export const queryPositionPage = generalizedFirestoreCollectionPageQuery<Position>(positionsApi as unknown as GeneralizedApiResourceSpec);
