import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateOpenAiModelParams, openAiModelsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateOpenAiModel =
	generalizedFirestoreDocumentUpdateOperation<UpdateOpenAiModelParams>(
		openAiModelsApi as unknown as GeneralizedApiResourceSpec,
	);
