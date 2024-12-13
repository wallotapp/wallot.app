import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryRecommendationPage } from '@wallot/react/src/features/recommendations/api/queryRecommendationPage';
import {
	UseQueryRecommendationPageQueryKeyFn,
	UseQueryRecommendationPageOptionsFn,
	UseQueryRecommendationPageProps,
} from '@wallot/react/src/features/recommendations/types/RecommendationReactTypes';

export const getQueryRecommendationPageReactQueryKey: UseQueryRecommendationPageQueryKeyFn =
	(params) =>
		[
			'recommendation',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryRecommendationPageReactQueryOptions: UseQueryRecommendationPageOptionsFn =
	(props) => ({
		queryFn: () => queryRecommendationPage(props.firestoreQueryOptions),
		queryKey: getQueryRecommendationPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryRecommendationPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryRecommendationPageProps) => {
	return ReactQuery.useQuery(
		getQueryRecommendationPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
