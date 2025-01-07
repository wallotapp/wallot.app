import { useContext } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { AlpacaPosition } from '@wallot/js';
import { retrievePositions } from '@wallot/react/src/features/positions/api/retrievePositions';
import { GeneralizedError } from 'ergonomic';

export function useRetrievePositions(
	options?: UseQueryOptions<
		AlpacaPosition[],
		GeneralizedError,
		AlpacaPosition[],
		['retrievePositions']
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);

	return useQuery<
		AlpacaPosition[],
		GeneralizedError,
		AlpacaPosition[],
		['retrievePositions']
	>({
		queryKey: ['retrievePositions' as const],
		queryFn: () => retrievePositions(firebaseUser),
		onError: (error: GeneralizedError) => {
			console.error('retrievePositions operation failed:', error);
		},
		onSuccess: (data: AlpacaPosition[]) => {
			console.log('retrievePositions operation successful', data);
		},
		...options,
		enabled: firebaseUser != null && (options?.enabled ?? true),
	});
}
