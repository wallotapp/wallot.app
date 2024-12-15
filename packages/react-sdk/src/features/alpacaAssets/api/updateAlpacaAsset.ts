import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAlpacaAssetParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateAlpacaAsset =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaAssetParams>(
		getFirestoreCollectionPath('alpaca_asset'),
	);
