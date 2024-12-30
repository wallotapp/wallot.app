import { useContext } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	RetrieveAssetPriceResponse,
	RetrieveAssetPriceQueryParams,
} from '@wallot/js';
import { retrieveAssetPrice } from '@wallot/react/src/features/assetOrders/api/retrieveAssetPrice';
import { GeneralizedError } from 'ergonomic';

export function useRetrieveAssetPrice(
	searchParams: RetrieveAssetPriceQueryParams,
	options?: UseQueryOptions<
		RetrieveAssetPriceResponse,
		GeneralizedError,
		RetrieveAssetPriceResponse,
		['retrieveAssetPrice', RetrieveAssetPriceQueryParams]
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);

	return useQuery<
		RetrieveAssetPriceResponse,
		GeneralizedError,
		RetrieveAssetPriceResponse,
		['retrieveAssetPrice', RetrieveAssetPriceQueryParams]
	>({
		queryKey: ['retrieveAssetPrice' as const, searchParams],
		queryFn: () => retrieveAssetPrice(firebaseUser, searchParams),
		onError: (error: GeneralizedError) => {
			console.error('retrieveAssetPrice operation failed:', error);
		},
		onSuccess: (data: RetrieveAssetPriceResponse) => {
			console.log('retrieveAssetPrice operation successful', data);
		},
		...options,
		enabled: firebaseUser != null && (options?.enabled ?? true),
	});
}
