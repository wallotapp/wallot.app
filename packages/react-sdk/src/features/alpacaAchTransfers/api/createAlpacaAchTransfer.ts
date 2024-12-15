import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateAlpacaAchTransferParams,
	AlpacaAchTransfer,
	getFirestoreCollectionPath,
	alpacaAchTransfersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaAchTransfer =
	generalizedFirestoreDocumentCreateOperation<
		CreateAlpacaAchTransferParams,
		AlpacaAchTransfer
	>(
		getFirestoreCollectionPath('alpaca_ach_transfer'),
		alpacaAchTransfersApi as unknown as GeneralizedApiResourceSpec,
	);
