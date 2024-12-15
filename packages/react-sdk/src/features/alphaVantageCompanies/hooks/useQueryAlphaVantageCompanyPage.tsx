import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAlphaVantageCompanyPage } from '@wallot/react/src/features/alphaVantageCompanies/api/queryAlphaVantageCompanyPage';
import {
	UseQueryAlphaVantageCompanyPageQueryKeyFn,
	UseQueryAlphaVantageCompanyPageOptionsFn,
	UseQueryAlphaVantageCompanyPageProps,
} from '@wallot/react/src/features/alphaVantageCompanies/types/AlphaVantageCompanyReactTypes';

export const getQueryAlphaVantageCompanyPageReactQueryKey: UseQueryAlphaVantageCompanyPageQueryKeyFn =
	(params) =>
		[
			'alpha_vantage_company',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryAlphaVantageCompanyPageReactQueryOptions: UseQueryAlphaVantageCompanyPageOptionsFn =
	(props) => ({
		queryFn: () => queryAlphaVantageCompanyPage(props.firestoreQueryOptions),
		queryKey: getQueryAlphaVantageCompanyPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryAlphaVantageCompanyPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAlphaVantageCompanyPageProps) => {
	return ReactQuery.useQuery(
		getQueryAlphaVantageCompanyPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
