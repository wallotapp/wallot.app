import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryOpenAiRecommendationPage } from '@wallot/react/src/features/openAiRecommendations/api/queryOpenAiRecommendationPage';
import {
	UseQueryOpenAiRecommendationPageQueryKeyFn,
	UseQueryOpenAiRecommendationPageOptionsFn,
	UseQueryOpenAiRecommendationPageProps,
} from '@wallot/react/src/features/openAiRecommendations/types/OpenAiRecommendationReactTypes';

export const getQueryOpenAiRecommendationPageReactQueryKey: UseQueryOpenAiRecommendationPageQueryKeyFn =
	(params) =>
		[
			'open_ai_recommendation',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryOpenAiRecommendationPageReactQueryOptions: UseQueryOpenAiRecommendationPageOptionsFn =
	(props) => ({
		queryFn: () => queryOpenAiRecommendationPage(props.firestoreQueryOptions),
		queryKey: getQueryOpenAiRecommendationPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryOpenAiRecommendationPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryOpenAiRecommendationPageProps) => {
	return ReactQuery.useQuery(
		getQueryOpenAiRecommendationPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
