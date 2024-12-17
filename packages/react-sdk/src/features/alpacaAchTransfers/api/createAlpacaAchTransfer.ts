import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateAlpacaAchTransferParams,
	AlpacaAchTransfer,
	alpacaAchTransfersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaAchTransfer =
	generalizedFirestoreDocumentCreateOperation<
		CreateAlpacaAchTransferParams,
		AlpacaAchTransfer
	>(alpacaAchTransfersApi as unknown as GeneralizedApiResourceSpec);
