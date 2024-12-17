import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateAlpacaAssetParams, alpacaAssetsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAlpacaAsset =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaAssetParams>(
		alpacaAssetsApi as unknown as GeneralizedApiResourceSpec,
	);
