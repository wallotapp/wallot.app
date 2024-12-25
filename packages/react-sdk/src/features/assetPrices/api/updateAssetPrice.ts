import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateAssetPriceParams, assetPricesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAssetPrice =
	generalizedFirestoreDocumentUpdateOperation<UpdateAssetPriceParams>(
		assetPricesApi as unknown as GeneralizedApiResourceSpec,
	);
