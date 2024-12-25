import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryOpenAiModelFamilyPage } from '@wallot/react/src/features/openAiModelFamilies/api/queryOpenAiModelFamilyPage';
import { UseQueryOpenAiModelFamilyPageQueryKeyFn, UseQueryOpenAiModelFamilyPageOptionsFn, UseQueryOpenAiModelFamilyPageProps } from '@wallot/react/src/features/openAiModelFamilies/types/OpenAiModelFamilyReactTypes';

export const getQueryOpenAiModelFamilyPageReactQueryKey: UseQueryOpenAiModelFamilyPageQueryKeyFn = (params) => ['open_ai_model_family', JSON.stringify(R.omit(['startAfterDocumentReference'], params))] as const;

export const getQueryOpenAiModelFamilyPageReactQueryOptions: UseQueryOpenAiModelFamilyPageOptionsFn = (props) => ({
	queryFn: () => queryOpenAiModelFamilyPage(props.firestoreQueryOptions),
	queryKey: getQueryOpenAiModelFamilyPageReactQueryKey(props.firestoreQueryOptions),
	...(props.reactQueryOptions ?? {}),
});

export const useQueryOpenAiModelFamilyPage = ({ firestoreQueryOptions, reactQueryOptions = {} }: UseQueryOpenAiModelFamilyPageProps) => {
	return ReactQuery.useQuery(
		getQueryOpenAiModelFamilyPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
