import { useContext } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { AlpacaDocument } from '@wallot/js';
import { retrieveDocuments } from '@wallot/react/src/features/users/api/retrieveDocuments';
import { GeneralizedError } from 'ergonomic';

export function useRetrieveDocuments(
	options?: UseQueryOptions<
		AlpacaDocument[],
		GeneralizedError,
		AlpacaDocument[],
		['retrieveDocuments']
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);

	return useQuery<
		AlpacaDocument[],
		GeneralizedError,
		AlpacaDocument[],
		['retrieveDocuments']
	>({
		queryKey: ['retrieveDocuments' as const],
		queryFn: () => retrieveDocuments(firebaseUser),
		onError: (error: GeneralizedError) => {
			console.error('retrieveDocuments operation failed:', error);
		},
		onSuccess: (data: AlpacaDocument[]) => {
			console.log('retrieveDocuments operation successful', data);
		},
		...(options ?? {}),
		enabled: firebaseUser != null && (options?.enabled ?? true),
	});
}
