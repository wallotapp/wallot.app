import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Asset, assetsApi } from '@wallot/js';

export const queryAssetPage = generalizedFirestoreCollectionPageQuery<Asset>(assetsApi as unknown as GeneralizedApiResourceSpec);
