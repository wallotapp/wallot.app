import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreatePositionParams, Position, positionsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createPosition = generalizedFirestoreDocumentCreateOperation<CreatePositionParams, Position>(positionsApi as unknown as GeneralizedApiResourceSpec);
