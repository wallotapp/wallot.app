import { Recommendation } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export function useQueryRecommendationsForLoggedInUser() {
	return useQueryResourcesForLoggedInUser<Recommendation>('recommendation')();
}
