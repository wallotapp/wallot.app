import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { getHomeSiteRoute, HomeSiteRouteQueryParams } from '@wallot/js';
import { AccountDashboardPage } from '@wallot/home-site/src/components/AccountDashboardPage';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import Link from 'next/link';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { useQueryLoggedInUserStatus } from '@wallot/react/src/hooks/useQueryLoggedInUserStatus';
import { GoArrowRight, GoCheckCircle, GoPerson } from 'react-icons/go';
import { useQueryAssetOrdersForLoggedInUser } from '@wallot/react/src/features/assetOrders/hooks/useQueryAssetOrdersForLoggedInUser';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import { Fragment, useEffect } from 'react';
import { BsBank } from 'react-icons/bs';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// Router
	const {
		loggedInUserEquityBalanceUsdString,
		loggedInUserDisplayName,
		loggedInUserFullName,
		loggedInUserAddress,
	} = useQueryLoggedInUser();
	const {
		state,
		tasks,
		isUserActivatedByAlpaca,
		isKycUser,
		isUserWithAlpacaEquity,
		isActivatedUser,
		isLoggedInUserStatusLoading,
	} = useQueryLoggedInUserStatus();
	const { assetOrdersForLoggedInUser } = useQueryAssetOrdersForLoggedInUser();

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

	// ==== Effects ==== //

	// Redirect to onboarding if user is not activated
	useEffect(() => {
		if (isLoggedInUserStatusLoading) return;
		if (!isActivatedUser) {
			void router.push(
				getHomeSiteRoute({
					includeOrigin: false,
					origin: null,
					queryParams: {},
					routeStaticId: 'HOME_SITE__/GET_STARTED',
				}),
			);
		}
	}, [isLoggedInUserStatusLoading, isActivatedUser]);

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<AccountDashboardPage className={cn('lg:max-w-3xl')}>
				<div>
					{/* Welcome Section */}
					<div>
						<div>
							<p className='font-semibold text-2xl'>
								Welcome back
								{loggedInUserDisplayName ? `, ${loggedInUserDisplayName}` : ''}!
							</p>
						</div>
						<div className='mt-1'>
							<p className='font-light text-base text-gray-600'>
								Browse our{' '}
								<span
									className='font-normal text-brand hover:text-brand-dark cursor-pointer'
									onClick={() => {
										toast({
											title: 'Coming Soon',
											description:
												"This feature isn't available yet. Stay tuned!",
										});
									}}
								>
									knowledge base
								</span>{' '}
								or{' '}
								<Link href='https://instagram.com/wallotapp' target='_blank'>
									<span className='font-normal text-brand hover:text-brand-dark'>
										explore all the ways
									</span>
								</Link>{' '}
								to start trading on Wallot.
							</p>
						</div>
					</div>
					{(tasks.length > 0 ||
						state ===
							'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAccountToChangeFromSubmittedToActive') && (
						<div className='mt-4'>
							{/* Account Status Section */}
							<div className='flex items-center space-x-2 w-fit'>
								<div>
									<p className='font-medium text-lg'>Account Status</p>
								</div>
								{state ===
								'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAccountToChangeFromSubmittedToActive' ? (
									<div className={cn('px-2 py-1 rounded-md bg-blue-200')}>
										<p className={cn('font-light text-xs text-blue-800')}>
											In Review
										</p>
									</div>
								) : isUserActivatedByAlpaca ? (
									<div className={cn('px-2 py-1 rounded-md bg-green-200')}>
										<p className={cn('font-light text-xs text-green-800')}>
											Activated
										</p>
									</div>
								) : (
									<div className={cn('px-2 py-1 rounded-md bg-red-200')}>
										<p className={cn('font-light text-xs text-red-800')}>
											Not Activated
										</p>
									</div>
								)}
							</div>
							<div className='mt-2.5'>
								<p className='font-normal text-xs'>Tasks</p>
							</div>
							<div className='mt-1.5'>
								{tasks.map(({ ctaHref, ctaText, title, subtitle }, taskIdx) => {
									return (
										<div
											key={ctaHref}
											className={cn(
												'p-4 bg-white rounded-lg shadow-sm border',
												'lg:flex lg:items-center lg:justify-between lg:space-x-16',
												taskIdx > 0 ? 'mt-4' : '',
												taskIdx === 0 ? 'border-red-800' : '',
											)}
										>
											<div>
												<div className='font-medium'>{title}</div>
												<div className='font-extralight text-gray-600 text-sm'>
													{subtitle}
												</div>
											</div>
											<div>
												<Link href={ctaHref}>
													<div
														className={cn(
															'bg-black hover:bg-brand-dark cursor-pointer rounded-lg',
															'flex items-center justify-center space-x-2',
															'mt-4 px-4 py-2',
															'lg:mt-0',
														)}
													>
														<div>
															<p className='text-white text-sm font-semibold'>
																{ctaText}
															</p>
														</div>
														<div>
															<GoArrowRight className='text-white text-sm' />
														</div>
													</div>
												</Link>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}
					<div className='mt-6'>
						<p className='font-medium text-lg'>Dashboard</p>
					</div>
					<div
						className={cn(
							'mt-3',
							'grid grid-cols-1 gap-y-4',
							'lg:grid-cols-3 lg:gap-x-4 lg:gap-y-0',
						)}
					>
						{[
							{
								ActionContent: isUserWithAlpacaEquity ? (
									<div className=''>
										<Link
											className='text-center flex items-center justify-center space-x-2'
											href={getHomeSiteRoute({
												includeOrigin: false,
												origin: null,
												queryParams: {},
												routeStaticId: 'HOME_SITE__/ACCOUNT/BANKING',
											})}
										>
											<div>
												<p className='font-light text-sm underline'>
													Deposit or withdraw
												</p>
											</div>
										</Link>
									</div>
								) : null,
								CardContent: (
									<Fragment>
										{isUserWithAlpacaEquity ? (
											<div className='flex flex-col justify-around h-full'>
												<div>
													<p className='font-light text-2xl'>
														{loggedInUserEquityBalanceUsdString}
													</p>
												</div>
											</div>
										) : (
											<Link
												className='flex flex-col items-center justify-center h-full space-y-2 px-4 text-center'
												href={getHomeSiteRoute({
													includeOrigin: false,
													origin: null,
													queryParams: {},
													routeStaticId: 'HOME_SITE__/ACCOUNT/SETTINGS',
												})}
											>
												<div>
													<BsBank className='font-light text-4xl' />
												</div>
												<div>
													<p className='font-light text-sm underline'>
														Fund your account
													</p>
												</div>
											</Link>
										)}
									</Fragment>
								),
								title: 'Equity',
							},
							{
								ActionContent: (
									<div className=''>
										<Link
											className='text-center flex items-center justify-center space-x-2'
											href={getHomeSiteRoute({
												includeOrigin: false,
												origin: null,
												queryParams: {},
												routeStaticId: 'HOME_SITE__/ACCOUNT/TRANSACTIONS',
											})}
										>
											<div>
												<p className='font-light text-sm underline'>
													New order
												</p>
											</div>
										</Link>
									</div>
								),
								CardContent: (
									<div className='w-full'>
										{assetOrdersForLoggedInUser.map(
											(
												{
													order,
													amount,
													alpaca_order_symbol,
													alpaca_order_filled_avg_price,
												},
												assetOrderIdx,
											) => {
												const amountUsdString =
													getCurrencyUsdStringFromCents(amount);
												const isFilled =
													alpaca_order_filled_avg_price != null &&
													alpaca_order_filled_avg_price !== '';
												const ctaText = isFilled ? 'View' : 'Finish order';
												return (
													<div
														key={alpaca_order_symbol}
														className={cn(
															'flex items-center space-x-2 justify-between',
															assetOrderIdx > 0
																? 'py-1.5 border-t border-t-gray-200'
																: '',
														)}
													>
														<div className='flex items-center space-x-2'>
															<div>
																<p className='font-light text-xs'>
																	{amountUsdString}
																</p>
															</div>
															<div>
																<p className='font-light text-sm'>
																	{alpaca_order_symbol}
																</p>
															</div>
														</div>
														<div>
															<Link
																className='text-right'
																href={getHomeSiteRoute({
																	includeOrigin: false,
																	origin: null,
																	queryParams: { order_id: order },
																	routeStaticId: isFilled
																		? 'HOME_SITE__/ORDERS/[ORDER_ID]/TRACK'
																		: 'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT',
																})}
															>
																<div className='cursor-pointer rounded-lg flex items-center justify-center space-x-2 px-2 py-1'>
																	<div>
																		<p className='text-xs underline'>
																			{ctaText}
																		</p>
																	</div>
																</div>
															</Link>
														</div>
													</div>
												);
											},
										)}
									</div>
								),
								title: 'Orders',
							},
							{
								ActionContent: isKycUser ? (
									<div>
										<Link
											className='text-center'
											href={getHomeSiteRoute({
												includeOrigin: false,
												origin: null,
												queryParams: {},
												routeStaticId: 'HOME_SITE__/ACCOUNT/SETTINGS',
											})}
										>
											<div>
												<p className='font-light text-sm underline'>Edit</p>
											</div>
										</Link>
									</div>
								) : null,
								CardContent: (
									<Fragment>
										{isKycUser ? (
											<div className='flex flex-col h-full justify-between'>
												<div>
													<div>
														<p className='font-semibold text-xs'>
															{loggedInUserFullName}
														</p>
													</div>
													<div>
														<p className='font-semibold text-xs'>
															{loggedInUserAddress}
														</p>
													</div>
												</div>
											</div>
										) : (
											<Link
												className='flex flex-col items-center justify-center h-full space-y-2 px-4 text-center'
												href={getHomeSiteRoute({
													includeOrigin: false,
													origin: null,
													queryParams: {},
													routeStaticId: 'HOME_SITE__/ACCOUNT/SETTINGS',
												})}
											>
												<div>
													<GoPerson className='font-light text-4xl' />
												</div>
												<div>
													<p className='font-light text-sm underline'>
														Complete billing information
													</p>
												</div>
											</Link>
										)}
									</Fragment>
								),
								title: 'Billing Information',
							},
						].map(({ ActionContent = <div />, CardContent, title }) => {
							return (
								<div className='bg-white rounded-md shadow-sm px-4 py-4 border border-gray-200 flex flex-col'>
									<div className='flex items-center justify-between'>
										<div>
											<p className='font-medium text-base'>{title}</p>
										</div>
										<div>{ActionContent}</div>
									</div>
									<div className='mt-2 h-full'>{CardContent}</div>
								</div>
							);
						})}
					</div>
					{tasks.length === 0 &&
						state !==
							'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAccountToChangeFromSubmittedToActive' && (
							<div className='mt-4'>
								{/* Account Status Section */}
								<div className='flex items-center space-x-2 w-fit'>
									<div>
										<p className='font-medium text-lg'>Account Status</p>
									</div>
									<div className='bg-green-200 px-2 py-1 rounded-md'>
										<p className='font-light text-green-800 text-xs'>
											Activated
										</p>
									</div>
								</div>
								<div className='bg-slate-100 mt-2 flex flex-col items-center justify-center p-4 rounded-lg space-y-1'>
									<div>
										<GoCheckCircle className='font-light text-xl' />
									</div>
									<div>
										<p className='font-light text-sm'>
											Your account is activated
										</p>
									</div>
								</div>
							</div>
						)}
				</div>
			</AccountDashboardPage>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/ACCOUNT/OVERVIEW' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Account',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
