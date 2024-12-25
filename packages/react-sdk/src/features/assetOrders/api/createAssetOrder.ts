import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateAssetOrderParams, AssetOrder, assetOrdersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAssetOrder = generalizedFirestoreDocumentCreateOperation<
	CreateAssetOrderParams,
	AssetOrder
>(assetOrdersApi as unknown as GeneralizedApiResourceSpec);
