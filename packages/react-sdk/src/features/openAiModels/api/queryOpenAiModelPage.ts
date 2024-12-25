import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { OpenAiModel, openAiModelsApi } from '@wallot/js';

export const queryOpenAiModelPage = generalizedFirestoreCollectionPageQuery<OpenAiModel>(openAiModelsApi as unknown as GeneralizedApiResourceSpec);
