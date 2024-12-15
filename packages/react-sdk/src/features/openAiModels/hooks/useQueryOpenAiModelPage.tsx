import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryOpenAiModelPage } from '@wallot/react/src/features/openAiModels/api/queryOpenAiModelPage';
import {
	UseQueryOpenAiModelPageQueryKeyFn,
	UseQueryOpenAiModelPageOptionsFn,
	UseQueryOpenAiModelPageProps,
} from '@wallot/react/src/features/openAiModels/types/OpenAiModelReactTypes';

export const getQueryOpenAiModelPageReactQueryKey: UseQueryOpenAiModelPageQueryKeyFn =
	(params) =>
		[
			'open_ai_model',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryOpenAiModelPageReactQueryOptions: UseQueryOpenAiModelPageOptionsFn =
	(props) => ({
		queryFn: () => queryOpenAiModelPage(props.firestoreQueryOptions),
		queryKey: getQueryOpenAiModelPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryOpenAiModelPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryOpenAiModelPageProps) => {
	return ReactQuery.useQuery(
		getQueryOpenAiModelPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
