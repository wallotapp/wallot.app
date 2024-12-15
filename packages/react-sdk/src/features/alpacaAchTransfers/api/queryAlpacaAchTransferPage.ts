import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	AlpacaAchTransfer,
	getFirestoreCollectionPath,
	alpacaAchTransfersApi,
} from '@wallot/js';

export const queryAlpacaAchTransferPage =
	generalizedFirestoreCollectionPageQuery<AlpacaAchTransfer>(
		getFirestoreCollectionPath('alpaca_ach_transfer'),
		alpacaAchTransfersApi as unknown as GeneralizedApiResourceSpec,
	);
