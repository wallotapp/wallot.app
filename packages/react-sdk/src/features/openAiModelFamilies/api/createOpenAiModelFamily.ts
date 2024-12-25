import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateOpenAiModelFamilyParams, OpenAiModelFamily, openAiModelFamiliesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createOpenAiModelFamily = generalizedFirestoreDocumentCreateOperation<CreateOpenAiModelFamilyParams, OpenAiModelFamily>(openAiModelFamiliesApi as unknown as GeneralizedApiResourceSpec);
