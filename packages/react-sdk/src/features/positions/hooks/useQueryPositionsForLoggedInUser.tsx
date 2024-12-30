import { Position } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export function useQueryPositionsForLoggedInUser() {
	return useQueryResourcesForLoggedInUser<Position>('position')();
}
