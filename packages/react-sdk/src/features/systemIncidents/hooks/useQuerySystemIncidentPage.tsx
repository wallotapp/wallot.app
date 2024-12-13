import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { querySystemIncidentPage } from '@wallot/react/src/features/systemIncidents/api/querySystemIncidentPage';
import {
	UseQuerySystemIncidentPageQueryKeyFn,
	UseQuerySystemIncidentPageOptionsFn,
	UseQuerySystemIncidentPageProps,
} from '@wallot/react/src/features/systemIncidents/types/SystemIncidentReactTypes';

export const getQuerySystemIncidentPageReactQueryKey: UseQuerySystemIncidentPageQueryKeyFn =
	(params) =>
		[
			'system_incident',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQuerySystemIncidentPageReactQueryOptions: UseQuerySystemIncidentPageOptionsFn =
	(props) => ({
		queryFn: () => querySystemIncidentPage(props.firestoreQueryOptions),
		queryKey: getQuerySystemIncidentPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQuerySystemIncidentPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQuerySystemIncidentPageProps) => {
	return ReactQuery.useQuery(
		getQuerySystemIncidentPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
