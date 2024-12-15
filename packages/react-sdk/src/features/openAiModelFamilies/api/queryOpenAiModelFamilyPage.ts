import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	OpenAiModelFamily,
	getFirestoreCollectionPath,
	openAiModelFamiliesApi,
} from '@wallot/js';

export const queryOpenAiModelFamilyPage =
	generalizedFirestoreCollectionPageQuery<OpenAiModelFamily>(
		getFirestoreCollectionPath('open_ai_model_family'),
		openAiModelFamiliesApi as unknown as GeneralizedApiResourceSpec,
	);
