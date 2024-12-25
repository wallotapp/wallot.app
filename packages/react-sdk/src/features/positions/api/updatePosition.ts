import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdatePositionParams, positionsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updatePosition = generalizedFirestoreDocumentUpdateOperation<UpdatePositionParams>(positionsApi as unknown as GeneralizedApiResourceSpec);
