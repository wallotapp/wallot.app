import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateAlpacaAssetParams,
	AlpacaAsset,
	getFirestoreCollectionPath,
	alpacaAssetsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaAsset = generalizedFirestoreDocumentCreateOperation<
	CreateAlpacaAssetParams,
	AlpacaAsset
>(
	getFirestoreCollectionPath('alpaca_asset'),
	alpacaAssetsApi as unknown as GeneralizedApiResourceSpec,
);
