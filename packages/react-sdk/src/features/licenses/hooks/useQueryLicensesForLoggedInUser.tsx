import { License } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export function useQueryLicensesForLoggedInUser() {
	return useQueryResourcesForLoggedInUser<License>('license')();
}
