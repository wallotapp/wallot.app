import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateOpenAiModelParams,
	OpenAiModel,
	getFirestoreCollectionPath,
	openAiModelsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createOpenAiModel = generalizedFirestoreDocumentCreateOperation<
	CreateOpenAiModelParams,
	OpenAiModel
>(
	getFirestoreCollectionPath('open_ai_model'),
	openAiModelsApi as unknown as GeneralizedApiResourceSpec,
);
