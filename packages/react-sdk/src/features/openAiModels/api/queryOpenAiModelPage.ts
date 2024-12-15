import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	OpenAiModel,
	getFirestoreCollectionPath,
	openAiModelsApi,
} from '@wallot/js';

export const queryOpenAiModelPage =
	generalizedFirestoreCollectionPageQuery<OpenAiModel>(
		getFirestoreCollectionPath('open_ai_model'),
		openAiModelsApi as unknown as GeneralizedApiResourceSpec,
	);
