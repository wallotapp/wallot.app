import * as changeCase from 'change-case';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeSiteRouteQueryParams } from '@wallot/js';
import { AccountDashboardPage } from '@wallot/home-site/src/components/AccountDashboardPage';
import { useRetrievePositions } from '@wallot/react/src/features/positions';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { getCurrencyUsdStringFromCents } from 'ergonomic';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Positions
	const { data: positionsData } = useRetrievePositions();
	const positions = positionsData ?? [];

	// ==== Constants ==== //

	// Router Query
	const _: RouteQueryParams = router?.query ?? {};
	_;

	// ==== Constants ==== //

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = props.routeStaticId;

	// Runtime Page Props
	const pageProps: PageProps = {
		...props,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<AccountDashboardPage className={cn('lg:max-w-3xl')}>
				<div>
					<div>
						<p className='font-semibold text-2xl'>Positions</p>
					</div>
					<div className='mt-1'>
						<p className='font-light text-base text-gray-600'>
							Below are the current positions in your account.
						</p>
					</div>
					<div className='mt-3 border-b border-gray-200 py-1'>
						<div className='grid grid-cols-4 gap-4'>
							{['Symbol', 'Shares', 'Avg Entry Price', 'Side'].map((header) => {
								return (
									<div key={header}>
										<p className='font-semibold text-base text-gray-600'>
											{header}
										</p>
									</div>
								);
							})}
						</div>
					</div>
					<div className='mt-2 flex flex-col gap-2'>
						{positions.map(({ avg_entry_price, qty, side, symbol }) => {
							const avgEntryPriceCents =
								avg_entry_price == null ? 0 : parseFloat(avg_entry_price) * 100;
							const avgEntryPriceUsdString =
								getCurrencyUsdStringFromCents(avgEntryPriceCents);
							return (
								<div key={symbol} className={cn('grid grid-cols-4 gap-4')}>
									{[
										symbol,
										qty,
										avgEntryPriceUsdString,
										changeCase.capitalCase(side ?? ''),
									].map((value, valueIdx) => {
										return (
											<div key={valueIdx}>
												<p className='font-light text-sm'>{value}</p>
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</AccountDashboardPage>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/ACCOUNT/POSITIONS' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Positions',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
