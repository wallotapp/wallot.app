import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { OpenAiModelFamily, openAiModelFamiliesApi } from '@wallot/js';

export const queryOpenAiModelFamilyPage =
	generalizedFirestoreCollectionPageQuery<OpenAiModelFamily>(
		openAiModelFamiliesApi as unknown as GeneralizedApiResourceSpec,
	);
