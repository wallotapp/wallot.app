import { WallotResourceName } from '@wallot/js';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { getPageQueryHookForResource } from '@wallot/react/src/hooks/getPageQueryHookForResource';
import { GeneralizedApiResource } from 'ergonomic';

export function useQueryResourcesForLoggedInUser<
	TResource extends GeneralizedApiResource,
>(resourceName: Exclude<WallotResourceName, 'user'>) {
	return () => {
		const { loggedInUser, isLoggedInUserLoading } = useQueryLoggedInUser();
		const isUserSignedIn = loggedInUser != null;
		const isResourcePageQueryEnabled = isUserSignedIn;
		const useQueryResourcePage = getPageQueryHookForResource(resourceName);
		const resourcePageQueryObserver = useQueryResourcePage({
			firestoreQueryOptions: {
				whereClauses: [['user', '==', loggedInUser?._id]],
			},
			reactQueryOptions: {
				enabled: isResourcePageQueryEnabled,
			},
		});
		const resourcesForLoggedInUser = (resourcePageQueryObserver.data
			?.documents ?? []) as TResource[];

		return {
			resourcesForLoggedInUser,
			isResourcePageError: resourcePageQueryObserver.isError,
			isResourcePageLoading:
				isLoggedInUserLoading ||
				!isResourcePageQueryEnabled ||
				resourcePageQueryObserver.isLoading,
			isResourcePageQueryEnabled,
			...resourcePageQueryObserver,
		};
	};
}
