import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AlpacaAsset, alpacaAssetsApi } from '@wallot/js';

export const queryAlpacaAssetPage =
	generalizedFirestoreCollectionPageQuery<AlpacaAsset>(
		alpacaAssetsApi as unknown as GeneralizedApiResourceSpec,
	);
