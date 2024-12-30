import { Position } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export const useQueryPositionsForLoggedInUser =
	useQueryResourcesForLoggedInUser<Position>('position');
