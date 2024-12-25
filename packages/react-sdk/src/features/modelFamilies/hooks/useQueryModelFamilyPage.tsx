import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryModelFamilyPage } from '@wallot/react/src/features/modelFamilies/api/queryModelFamilyPage';
import {
	UseQueryModelFamilyPageQueryKeyFn,
	UseQueryModelFamilyPageOptionsFn,
	UseQueryModelFamilyPageProps,
} from '@wallot/react/src/features/modelFamilies/types/ModelFamilyReactTypes';

export const getQueryModelFamilyPageReactQueryKey: UseQueryModelFamilyPageQueryKeyFn =
	(params) =>
		[
			'model_family',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryModelFamilyPageReactQueryOptions: UseQueryModelFamilyPageOptionsFn =
	(props) => ({
		queryFn: () => queryModelFamilyPage(props.firestoreQueryOptions),
		queryKey: getQueryModelFamilyPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryModelFamilyPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryModelFamilyPageProps) => {
	return ReactQuery.useQuery(
		getQueryModelFamilyPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
