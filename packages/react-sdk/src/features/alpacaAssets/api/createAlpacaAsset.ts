import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateAlpacaAssetParams,
	AlpacaAsset,
	alpacaAssetsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaAsset = generalizedFirestoreDocumentCreateOperation<
	CreateAlpacaAssetParams,
	AlpacaAsset
>(alpacaAssetsApi as unknown as GeneralizedApiResourceSpec);
