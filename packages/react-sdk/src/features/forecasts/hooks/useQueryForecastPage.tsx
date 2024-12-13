import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryForecastPage } from '@wallot/react/src/features/forecasts/api/queryForecastPage';
import {
	UseQueryForecastPageQueryKeyFn,
	UseQueryForecastPageOptionsFn,
	UseQueryForecastPageProps,
} from '@wallot/react/src/features/forecasts/types/ForecastReactTypes';

export const getQueryForecastPageReactQueryKey: UseQueryForecastPageQueryKeyFn =
	(params) =>
		[
			'forecast',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryForecastPageReactQueryOptions: UseQueryForecastPageOptionsFn =
	(props) => ({
		queryFn: () => queryForecastPage(props.firestoreQueryOptions),
		queryKey: getQueryForecastPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryForecastPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryForecastPageProps) => {
	return ReactQuery.useQuery(
		getQueryForecastPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
