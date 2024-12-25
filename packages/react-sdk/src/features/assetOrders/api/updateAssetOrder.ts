import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateAssetOrderParams, assetOrdersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAssetOrder =
	generalizedFirestoreDocumentUpdateOperation<UpdateAssetOrderParams>(
		assetOrdersApi as unknown as GeneralizedApiResourceSpec,
	);
