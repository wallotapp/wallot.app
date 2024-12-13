import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateSystemServiceParams,
	SystemService,
	getFirestoreCollectionPath,
	systemServicesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createSystemService =
	generalizedFirestoreDocumentCreateOperation<
		CreateSystemServiceParams,
		SystemService
	>(
		getFirestoreCollectionPath('system_service'),
		systemServicesApi as unknown as GeneralizedApiResourceSpec,
	);
