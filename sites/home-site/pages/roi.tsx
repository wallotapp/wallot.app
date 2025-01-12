import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PageHeader } from '@wallot/react/src/components/PageHeader';
import { HomeSiteRouteQueryParams, InvestmentProductNetGain } from '@wallot/js';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import {
	initialRetrieveInvestmentProductNetGainPageQueryKey,
	initialRetrieveInvestmentProductNetGainPageSearchParams,
	useRetrieveInvestmentProductNetGainPage,
} from '@wallot/react/src/features/assetOrders/hooks/useRetrieveInvestmentProductNetGainPage';
import { queryClient } from 'ergonomic-react/src/lib/tanstackQuery';
import { dehydrate } from '@tanstack/react-query';
import { retrieveInvestmentProductNetGainPage } from '@wallot/react/src/features/assetOrders/api/retrieveInvestmentProductNetGainPage';
import { AccountDashboardPageSuspense } from '@wallot/home-site/src/components/AccountDashboardPage';
import { getCurrencyUsdStringFromCents, getEnum, EnumMember } from 'ergonomic';
import { GoArrowUpRight } from 'react-icons/go';
import { useState } from 'react';

const MonthEnum = getEnum([
	'2024-07',
	'2024-08',
	'2024-09',
	'2024-10',
	'2024-11',
	'2024-12',
]);
type Month = EnumMember<typeof MonthEnum>;
const Page: NextPage<PageProps> = (props) => {
	// ==== State ==== //
	const [months, setMonths] = useState<Month[] | null>(MonthEnum.arr.slice(-1));
	const isProductInRange = (product: InvestmentProductNetGain) => {
		const { exit_date } = product.results;
		if (!months) return true;
		return months.some((month) => exit_date.startsWith(month));
	};

	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Investment Product Net Gains
	const {
		data: investmentProductNetGainPage,
		isLoading: isInvestmentProductNetGainPageLoading,
	} = useRetrieveInvestmentProductNetGainPage({});

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const _ = query;
	typeof _;

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
			<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
				<PageHeader showHomeLink={false} />
				<div
					className={cn(
						'min-h-[95vh] w-full scroll-smooth',
						'py-32 px-6',
						'lg:py-32 lg:px-28',
					)}
				>
					<div className='container p-8 rounded-lg shadow'>
						<header className=''>
							<h1 className='text-3xl font-semibold'>
								How well has Wallot AI performed historically?
							</h1>
							<p className='text-gray-600'>Let's take a look</p>
						</header>

						<div
							className={cn(
								isInvestmentProductNetGainPageLoading ? 'block mt-6' : 'hidden',
							)}
						>
							<AccountDashboardPageSuspense length={4} />
						</div>
						<div
							className={cn(
								isInvestmentProductNetGainPageLoading ? 'hidden' : 'block mt-6',
							)}
						>
							<section id='introduction' className=''>
								<h2 className='text-xl font-medium'>Summary</h2>
								<p className='mt-1 font-light text-sm'>
									{investmentProductNetGainPage?.summary.description}
								</p>
							</section>

							<div
								className={cn(
									'mt-6',
									'flex flex-col space-y-4',
									'lg:flex lg:flex-row lg:items-center lg:justify-between lg:space-y-0',
								)}
							>
								<div>
									<h2 className='text-xl font-medium'>
										Historical Performance
									</h2>
								</div>
								<div>
									<div className='lg:text-right'>
										<h3 className='text-sm font-medium'>Filter by Month</h3>
									</div>
									<div className='flex items-center gap-2 mt-1 flex-wrap lg:space-x-2 lg:gap-0'>
										{MonthEnum.arr.map((month) => {
											const monthPretty = month;
											return (
												<button
													key={month}
													className={cn(
														'text-xs font-light border border-gray-300 rounded-lg px-2 py-1',
														months?.includes(month) ? 'bg-gray-200' : '',
													)}
													onClick={() => {
														setMonths((prevMonths) => {
															if (!prevMonths) return [month];
															let next;
															if (prevMonths.includes(month)) {
																next = prevMonths.filter(
																	(prevMonth) => prevMonth !== month,
																);
															} else {
																next = [...prevMonths, month];
															}
															if (next.length === 0) return null;
															return next;
														});
													}}
												>
													{monthPretty}
												</button>
											);
										})}
									</div>
								</div>
							</div>

							<Separator className='mt-2' />

							<section id='table' className='mb-6 max-w-full overflow-x-auto'>
								<div className='mt-1'>
									{(investmentProductNetGainPage?.products ?? [])
										.filter(isProductInRange)
										.map(
											(
												{
													id: productNetGainId,
													investment_product: {
														description: productDescription,
														title: productTitle,
														trades,
													},
													results: {
														entry_date: productEntryDate,
														exit_date: productExitDate,
														summary: productSummary,
													},
												},
												productIdx,
											) => {
												// Define this array here or outside if you prefer
												const tradeRowHeaders = [
													'Result',
													'Symbol',
													'Amount',
													'Net Gain',
													'Net Gain Rate',
												];

												return (
													<div
														key={productNetGainId}
														className={cn(
															productIdx === 0
																? ''
																: 'mt-6 border-t border-t-gray-300',
															'py-4',
															'flex flex-col',
														)}
													>
														<div className='text-xs'>
															{/* Product Info */}
															<div className='text-sm'>
																<dl>
																	<div className='flex items-baseline space-x-2 font-semibold text-base'>
																		{productTitle}
																	</div>
																	<div className='hidden'>
																		{productDescription}
																	</div>
																	<div className='flex items-baseline space-x-2 text-xs mt-2'>
																		<dt className='font-medium text-gray-700'>
																			Position held:
																		</dt>
																		<dd>
																			{productEntryDate} through{' '}
																			{productExitDate}
																		</dd>
																	</div>
																	<div className='flex items-baseline space-x-2 text-xs'>
																		<dt className='font-medium text-gray-700'>
																			Result:
																		</dt>
																		<dd
																			className={cn(
																				productSummary === 'win'
																					? 'text-green-500'
																					: 'text-red-500',
																			)}
																		>
																			{productSummary == 'win'
																				? 'Gain'
																				: 'Loss'}
																		</dd>
																	</div>
																</dl>
															</div>

															{/* Table Label */}
															<h3 className='text-sm font-semibold mt-4'>
																Trades
															</h3>

															{/* Table */}
															<table className='mt-2 w-full border-collapse'>
																{/* Table Head */}
																<thead>
																	<tr>
																		{tradeRowHeaders.map((header) => (
																			<th
																				key={header}
																				className='border border-gray-300 px-2 py-1 text-left'
																			>
																				{header}
																			</th>
																		))}
																	</tr>
																</thead>

																{/* Table Body */}
																<tbody>
																	{trades.map(
																		({
																			trade,
																			results: {
																				net_gain: tradeNetGain,
																				net_gain_rate: tradeNetGainRate,
																				summary: tradeSummary,
																			},
																		}) => {
																			const tradeNetGainRatePretty = `${(
																				tradeNetGainRate * 100
																			).toFixed(2)}%`;
																			const tradeAmountStringInDollarsUnformatted =
																				trade.amount;
																			const tradeAmountInCents =
																				parseFloat(
																					tradeAmountStringInDollarsUnformatted,
																				) * 100;
																			const tradeAmountPretty =
																				getCurrencyUsdStringFromCents(
																					tradeAmountInCents,
																				);
																			const tradeNetGainPretty =
																				getCurrencyUsdStringFromCents(
																					tradeNetGain,
																				);

																			return (
																				<tr
																					key={trade.id}
																					className='hover:bg-gray-100'
																				>
																					<td className='border border-gray-300 px-2 py-1'>
																						<GoArrowUpRight
																							className={cn(
																								'text-xl',
																								tradeSummary === 'win'
																									? 'text-green-500'
																									: 'text-red-500 rotate-90',
																							)}
																						/>
																					</td>
																					<td className='border border-gray-300 px-2 py-1'>
																						{trade.symbol}
																					</td>
																					<td className='border border-gray-300 px-2 py-1'>
																						{tradeAmountPretty}
																					</td>
																					<td className='border border-gray-300 px-2 py-1'>
																						{tradeNetGainPretty}
																					</td>
																					<td className='border border-gray-300 px-2 py-1'>
																						{tradeNetGainRatePretty}
																					</td>
																				</tr>
																			);
																		},
																	)}
																</tbody>
															</table>
														</div>
													</div>
												);
											},
										)}
								</div>
							</section>
						</div>

						<Separator />

						<section id='disclaimer' className='mt-6'>
							<h2 className='text-sm font-semibold'>
								Disclaimer and Limitation of Liability
							</h2>
							<p className='mt-1 font-light text-xs'>
								Wallot and its services are provided on an "as is" and "as
								available" basis. Wallot expressly disclaims all warranties of
								any kind, whether express or implied, including, but not limited
								to, the implied warranties of merchantability, fitness for a
								particular purpose, and non-infringement. In no event shall
								Wallot, its affiliates, agents, directors, employees, suppliers,
								or licensors be liable for any indirect, punitive, incidental,
								special, consequential, or exemplary damages, including without
								limitation damages for loss of profits, goodwill, use, data, or
								other intangible losses that result from the use of, or
								inability to use, the service. AI can make mistakes, and
								historical returns are not necessarily indicative of future
								results. Consult with a financial advisor before making any
								investment decisions.
							</p>
						</section>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/TERMS' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = async () => {
	// Prefetch the default query data
	await queryClient.prefetchQuery(
		initialRetrieveInvestmentProductNetGainPageQueryKey,
		() =>
			retrieveInvestmentProductNetGainPage(
				initialRetrieveInvestmentProductNetGainPageSearchParams,
			),
	);

	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Return on Investment',
	};
	return Promise.resolve({
		props: { ...ROUTE_STATIC_PROPS, dehydratedState: dehydrate(queryClient) },
	});
};
