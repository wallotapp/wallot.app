import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	SystemService,
	getFirestoreCollectionPath,
	systemServicesApi,
} from '@wallot/js';

export const querySystemServicePage =
	generalizedFirestoreCollectionPageQuery<SystemService>(
		getFirestoreCollectionPath('system_service'),
		systemServicesApi as unknown as GeneralizedApiResourceSpec,
	);
