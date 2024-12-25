import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AssetPrice, assetPricesApi } from '@wallot/js';

export const queryAssetPricePage = generalizedFirestoreCollectionPageQuery<AssetPrice>(assetPricesApi as unknown as GeneralizedApiResourceSpec);
