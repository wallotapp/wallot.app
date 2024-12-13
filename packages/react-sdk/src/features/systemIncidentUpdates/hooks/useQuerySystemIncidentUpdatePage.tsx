import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { querySystemIncidentUpdatePage } from '@wallot/react/src/features/systemIncidentUpdates/api/querySystemIncidentUpdatePage';
import {
	UseQuerySystemIncidentUpdatePageQueryKeyFn,
	UseQuerySystemIncidentUpdatePageOptionsFn,
	UseQuerySystemIncidentUpdatePageProps,
} from '@wallot/react/src/features/systemIncidentUpdates/types/SystemIncidentUpdateReactTypes';

export const getQuerySystemIncidentUpdatePageReactQueryKey: UseQuerySystemIncidentUpdatePageQueryKeyFn =
	(params) =>
		[
			'system_incident_update',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQuerySystemIncidentUpdatePageReactQueryOptions: UseQuerySystemIncidentUpdatePageOptionsFn =
	(props) => ({
		queryFn: () => querySystemIncidentUpdatePage(props.firestoreQueryOptions),
		queryKey: getQuerySystemIncidentUpdatePageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQuerySystemIncidentUpdatePage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQuerySystemIncidentUpdatePageProps) => {
	return ReactQuery.useQuery(
		getQuerySystemIncidentUpdatePageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
