import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryNewsReportPage } from '@wallot/react/src/features/newsReports/api/queryNewsReportPage';
import { UseQueryNewsReportPageQueryKeyFn, UseQueryNewsReportPageOptionsFn, UseQueryNewsReportPageProps } from '@wallot/react/src/features/newsReports/types/NewsReportReactTypes';

export const getQueryNewsReportPageReactQueryKey: UseQueryNewsReportPageQueryKeyFn = (params) => ['news_report', JSON.stringify(R.omit(['startAfterDocumentReference'], params))] as const;

export const getQueryNewsReportPageReactQueryOptions: UseQueryNewsReportPageOptionsFn = (props) => ({
	queryFn: () => queryNewsReportPage(props.firestoreQueryOptions),
	queryKey: getQueryNewsReportPageReactQueryKey(props.firestoreQueryOptions),
	...(props.reactQueryOptions ?? {}),
});

export const useQueryNewsReportPage = ({ firestoreQueryOptions, reactQueryOptions = {} }: UseQueryNewsReportPageProps) => {
	return ReactQuery.useQuery(
		getQueryNewsReportPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
