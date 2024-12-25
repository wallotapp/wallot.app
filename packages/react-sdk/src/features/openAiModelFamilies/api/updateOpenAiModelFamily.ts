import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateOpenAiModelFamilyParams, openAiModelFamiliesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateOpenAiModelFamily = generalizedFirestoreDocumentUpdateOperation<UpdateOpenAiModelFamilyParams>(openAiModelFamiliesApi as unknown as GeneralizedApiResourceSpec);
