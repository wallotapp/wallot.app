import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { InvestmentProductNetGainPage } from '@wallot/js';
import { retrieveInvestmentProductNetGainPage } from '@wallot/react/src/features/assetOrders/api/retrieveInvestmentProductNetGainPage';
import { GeneralizedError } from 'ergonomic';

export const initialRetrieveInvestmentProductNetGainPageSearchParams: Record<
	string,
	never
> = {};
export function getRetrieveInvestmentProductNetGainPageQueryKey(
	searchParams: Record<string, never>,
) {
	return ['retrieveInvestmentProductNetGainPage' as const, searchParams];
}
export const initialRetrieveInvestmentProductNetGainPageQueryKey =
	getRetrieveInvestmentProductNetGainPageQueryKey(
		initialRetrieveInvestmentProductNetGainPageSearchParams,
	);

export function useRetrieveInvestmentProductNetGainPage(
	searchParams: Record<string, never>,
	options?: UseQueryOptions<
		InvestmentProductNetGainPage,
		GeneralizedError,
		InvestmentProductNetGainPage,
		['retrieveInvestmentProductNetGainPage', Record<string, never>]
	>,
) {
	return useQuery<
		InvestmentProductNetGainPage,
		GeneralizedError,
		InvestmentProductNetGainPage,
		['retrieveInvestmentProductNetGainPage', Record<string, never>]
	>({
		queryKey: ['retrieveInvestmentProductNetGainPage' as const, searchParams],
		queryFn: () => retrieveInvestmentProductNetGainPage(searchParams),
		onError: (error: GeneralizedError) => {
			console.error(
				'retrieveInvestmentProductNetGainPage operation failed:',
				error,
			);
		},
		onSuccess: (data: InvestmentProductNetGainPage) => {
			console.log(
				'retrieveInvestmentProductNetGainPage operation successful',
				data,
			);
		},
		...options,
		enabled: options?.enabled ?? true,
	});
}
