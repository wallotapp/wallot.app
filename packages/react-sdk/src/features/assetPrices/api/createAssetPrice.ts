import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateAssetPriceParams, AssetPrice, assetPricesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAssetPrice = generalizedFirestoreDocumentCreateOperation<
	CreateAssetPriceParams,
	AssetPrice
>(assetPricesApi as unknown as GeneralizedApiResourceSpec);
