import { License } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export const useQueryLicensesForLoggedInUser =
	useQueryResourcesForLoggedInUser<License>('license');
