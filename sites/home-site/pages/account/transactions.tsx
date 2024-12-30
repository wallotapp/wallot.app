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
import { useQueryAssetOrdersForLoggedInUser } from '@wallot/react/src/features/assetOrders/hooks/useQueryAssetOrdersForLoggedInUser';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import { DateTime } from 'luxon';
import { GoPlus } from 'react-icons/go';
import { ScheduleCallDialog } from '@wallot/home-site/src/components/ScheduleCallDialog';
import { useQueryLoggedInUserStatus } from '@wallot/react/src/hooks/useQueryLoggedInUserStatus';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// Asset orders
	const { assetOrdersForLoggedInUser } = useQueryAssetOrdersForLoggedInUser();

	// Status
	const { isUserWithAlpacaEquity } = useQueryLoggedInUserStatus();

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
					<div
						className={cn(
							'lg:flex lg:items-center lg:justify-between lg:space-x-20',
						)}
					>
						<div>
							<div>
								<p className='font-semibold text-2xl'>Transactions</p>
							</div>
						</div>
						<div className='mt-4 lg:mt-0 flex items-center space-x-5'>
							{[{ ctaText: 'Buy Order' }, { ctaText: 'Sell Order' }].map(
								({ ctaText }) => {
									if (isUserWithAlpacaEquity) {
										return (
											<div key={ctaText}>
												<ScheduleCallDialog
													TriggerComponent={
														<button
															className={cn(
																'bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100',
																'flex items-center space-x-1',
																'text-center',
															)}
														>
															<div>
																<GoPlus />
															</div>
															<div>
																<p className='font-normal text-sm'>{ctaText}</p>
															</div>
														</button>
													}
												/>
											</div>
										);
									}

									return (
										<div key={ctaText}>
											<button
												className={cn(
													'bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100',
													'flex items-center space-x-1',
													'text-center',
												)}
												onClick={() => {
													toast({
														title:
															'Error - your account must be funded to trade.',
														description:
															'If you have recently made a deposit, please wait a few minutes and try again.',
													});
												}}
											>
												<div>
													<GoPlus />
												</div>
												<div>
													<p className='font-normal text-sm'>{ctaText}</p>
												</div>
											</button>
										</div>
									);
								},
							)}
						</div>
					</div>
					<div className='mt-4 lg:mt-1'>
						<p className='font-light text-base text-gray-600'>
							Below are all of the buy and sell orders you have made to date.
						</p>
					</div>
					<div className='mt-3 border-b border-gray-200 py-1'>
						<div className='grid grid-cols-4 gap-4'>
							{['Order', 'Shares', 'Avg Entry Price', 'Side'].map((header) => {
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
						{assetOrdersForLoggedInUser.map(
							({
								alpaca_order_filled_at,
								alpaca_order_filled_avg_price: avg_entry_price,
								alpaca_order_filled_qty: qty,
								alpaca_order_side: side,
								alpaca_order_symbol: symbol,
							}) => {
								const date =
									alpaca_order_filled_at == null
										? 'Pending'
										: DateTime.fromISO(alpaca_order_filled_at).toLocaleString(
												DateTime.DATE_SHORT,
										  );
								const avgEntryPriceCents =
									avg_entry_price == null
										? 0
										: parseFloat(avg_entry_price) * 100;
								const avgEntryPriceUsdString = avgEntryPriceCents
									? getCurrencyUsdStringFromCents(avgEntryPriceCents)
									: 'Pending';
								const orderName = `${symbol} - ${date}`;
								return (
									<div key={orderName} className={cn('grid grid-cols-4 gap-4')}>
										{[
											orderName,
											qty || 'Pending',
											avgEntryPriceUsdString,
											changeCase.capitalCase(side || 'Pending'),
										].map((value, valueIdx) => {
											return (
												<div key={valueIdx}>
													<p className='font-light text-sm'>{value}</p>
												</div>
											);
										})}
									</div>
								);
							},
						)}
					</div>
				</div>
			</AccountDashboardPage>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/ACCOUNT/TRANSACTIONS' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Transactions',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
