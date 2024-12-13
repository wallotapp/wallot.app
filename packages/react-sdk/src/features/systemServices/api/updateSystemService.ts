import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateSystemServiceParams,
	SystemService,
	getFirestoreCollectionPath,
	systemServicesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateSystemService =
	generalizedFirestoreDocumentUpdateOperation<
		UpdateSystemServiceParams,
		SystemService
	>(
		getFirestoreCollectionPath('system_service'),
		systemServicesApi as unknown as GeneralizedApiResourceSpec,
	);
