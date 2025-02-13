import { ScholarshipApplication } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export function useQueryScholarshipApplicationsForLoggedInUser() {
	return useQueryResourcesForLoggedInUser<ScholarshipApplication>(
		'scholarship_application',
	)();
}
