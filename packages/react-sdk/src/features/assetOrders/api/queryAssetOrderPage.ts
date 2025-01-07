import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AssetOrder, assetOrdersApi } from '@wallot/js';

export const queryAssetOrderPage =
	generalizedFirestoreCollectionPageQuery<AssetOrder>(
		assetOrdersApi as unknown as GeneralizedApiResourceSpec,
	);
