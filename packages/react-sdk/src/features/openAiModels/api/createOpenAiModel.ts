import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateOpenAiModelParams, OpenAiModel, openAiModelsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createOpenAiModel = generalizedFirestoreDocumentCreateOperation<CreateOpenAiModelParams, OpenAiModel>(openAiModelsApi as unknown as GeneralizedApiResourceSpec);
