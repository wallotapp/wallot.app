import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateAssetParams, Asset, assetsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAsset = generalizedFirestoreDocumentCreateOperation<
	CreateAssetParams,
	Asset
>(assetsApi as unknown as GeneralizedApiResourceSpec);
