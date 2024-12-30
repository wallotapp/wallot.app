import { Recommendation } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export const useQueryRecommendationsForLoggedInUser =
	useQueryResourcesForLoggedInUser<Recommendation>('recommendation');
