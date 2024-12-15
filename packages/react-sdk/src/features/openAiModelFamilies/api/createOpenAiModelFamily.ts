import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateOpenAiModelFamilyParams,
	OpenAiModelFamily,
	getFirestoreCollectionPath,
	openAiModelFamiliesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createOpenAiModelFamily =
	generalizedFirestoreDocumentCreateOperation<
		CreateOpenAiModelFamilyParams,
		OpenAiModelFamily
	>(
		getFirestoreCollectionPath('open_ai_model_family'),
		openAiModelFamiliesApi as unknown as GeneralizedApiResourceSpec,
	);
