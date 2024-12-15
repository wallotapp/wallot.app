import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	AlpacaAsset,
	getFirestoreCollectionPath,
	alpacaAssetsApi,
} from '@wallot/js';

export const queryAlpacaAssetPage =
	generalizedFirestoreCollectionPageQuery<AlpacaAsset>(
		getFirestoreCollectionPath('alpaca_asset'),
		alpacaAssetsApi as unknown as GeneralizedApiResourceSpec,
	);
