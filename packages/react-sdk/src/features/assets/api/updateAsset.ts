import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateAssetParams, assetsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAsset =
	generalizedFirestoreDocumentUpdateOperation<UpdateAssetParams>(
		assetsApi as unknown as GeneralizedApiResourceSpec,
	);
