import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AlpacaAchTransfer, alpacaAchTransfersApi } from '@wallot/js';

export const queryAlpacaAchTransferPage =
	generalizedFirestoreCollectionPageQuery<AlpacaAchTransfer>(
		alpacaAchTransfersApi as unknown as GeneralizedApiResourceSpec,
	);
