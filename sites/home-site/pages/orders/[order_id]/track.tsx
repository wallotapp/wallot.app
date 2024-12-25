import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { HomeSiteRouteQueryParams, getSsoSiteRoute } from '@wallot/js';
import { AssetOrderCartItem } from '@wallot/react/src/features/assetOrders';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { Fragment } from 'react';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { GoCheckCircleFill, GoCircle } from 'react-icons/go';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/ORDERS/[ORDER_ID]/TRACK' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Track',
};

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== Hooks ==== //

	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();

	// Auth
	useAuthenticatedRouteRedirect({
		authSiteOrigin: siteOriginByTarget.SSO_SITE,
		loginRoutePath: getSsoSiteRoute({
			includeOrigin: false,
			origin: null,
			queryParams: {},
			routeStaticId: 'SSO_SITE__/LOGIN',
		}),
	});

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { order_id } = query;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace(
		'[ORDER_ID]',
		order_id || '',
	);

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Hooks ==== //
	const { data: assetOrderPage, isLoading: isAssetOrderPageLoading } =
		useQueryAssetOrderPage({
			firestoreQueryOptions: {
				whereClauses: [['order', '==', order_id]],
			},
		});
	const assetOrders = assetOrderPage?.documents ?? [];
	const assetTotalAmount = assetOrders.reduce((acc, assetOrder) => {
		return acc + assetOrder.amount;
	}, 0);
	const assetTotalAmountUsdString =
		getCurrencyUsdStringFromCents(assetTotalAmount);
	const isDataLoading = isAssetOrderPageLoading;

	type OrderStep =
		| 'Account Verification'
		| 'Funds Transfer'
		| 'Stock Purchases';
	const orderSteps: OrderStep[] = [
		'Account Verification',
		'Funds Transfer',
		'Stock Purchases',
	];
	const completedSteps: OrderStep[] = [];
	// const completedSteps: OrderStep[] = ['Account Verification'];
	// const completedSteps: OrderStep[] = [
	// 	'Account Verification',
	// 	'Funds Transfer',
	// ];
	// const completedSteps: OrderStep[] = [
	// 	'Account Verification',
	// 	'Funds Transfer',
	// 	'Stock Purchases',
	// ];
	const nextStepToComplete = orderSteps.find(
		(step) => !completedSteps.includes(step),
	);

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
				<AuthenticatedPageHeader showHomeLink={false} />
				<PageActionHeader />
				<div
					className={cn(
						'min-h-[95vh] w-full',
						'py-48 px-6',
						'lg:py-48 lg:px-28',
					)}
				>
					<div>
						<div className={cn('lg:flex lg:justify-between lg:space-x-28')}>
							<div className='lg:w-3/5'>
								<div>
									<p className='font-semibold text-3xl'>Your Order</p>
									<p className='font-medium text-base'>
										Below is a list of the stocks included in this order.
									</p>
								</div>
								<div className='mt-6'>
									{isDataLoading ? (
										<Fragment>
											{[1, 2, 3, 4].map((_, index) => (
												<div className=''>
													<Skeleton
														className='h-[30rem] !bg-gray-300'
														key={index}
													/>
												</div>
											))}
										</Fragment>
									) : (
										<Fragment>
											{assetOrders.map((assetOrder, assetOrderIdx) => {
												return (
													<AssetOrderCartItem
														assetOrder={assetOrder}
														className={cn(assetOrderIdx === 0 ? '' : 'mt-4')}
														key={assetOrder._id}
													/>
												);
											})}
										</Fragment>
									)}
								</div>
							</div>
							<div className={cn('mt-8 lg:w-2/5')}>
								<div className='bg-slate-100 border border-gray-200 shadow-sm px-10 py-10 rounded-xl h-fit'>
									<div>
										<p className='font-semibold text-xl'>Order Summary</p>
									</div>
									<div className='mt-2.5'>
										<p className='font-medium text-base'>
											{assetOrders.length} item
											{assetOrders.length > 1 ? 's' : ''}
										</p>
									</div>
									<div className='mt-4'>
										<Separator />
									</div>
									<div className='mt-6 flex justify-between'>
										<div>
											<p className='font-semibold text-xl'>
												Subtotal{' '}
												<span className='text-sm text-brand-dark'>(USD)</span>
											</p>
										</div>
										<div>
											<p className='font-medium text-xl'>
												{assetTotalAmountUsdString}
											</p>
										</div>
									</div>
								</div>
								<div className='bg-white border border-gray-200 shadow-sm px-10 py-10 rounded-xl h-fit mt-8'>
									<div className='mb-4'>
										<p className='font-semibold text-xl'>Order Status</p>
									</div>
									<div className='px-4'>
										{orderSteps.map((step, index) => {
											const isCurrentStep = step === nextStepToComplete;
											const isCompletedStep = completedSteps.includes(step);
											return (
												<div
													className={cn(
														isCurrentStep ? 'text-brand-dark' : 'text-gray-500',
														index === 1 && 'border-l border-l-gray-400 py-4',
														index !== 1 && 'border-l border-l-transparent',
													)}
													key={index}
												>
													<div className='flex items-center space-x-2.5'>
														<div className='-ml-[0.8rem]'>
															{isCurrentStep ? (
																<div className='flex items-center'>
																	<GoCircle className='text-gray-800 w-6 h-6 bg-white rounded-full' />
																</div>
															) : isCompletedStep ? (
																<div className='flex items-center'>
																	<GoCheckCircleFill className='text-blue-700 w-6 h-6 bg-white rounded-full' />
																</div>
															) : (
																<div className='flex items-center'>
																	<GoCircle className='text-gray-300 w-6 h-6 bg-white rounded-full' />
																</div>
															)}
														</div>
														<div className='flex items-center space-x-2.5'>
															<div>
																<p
																	className={cn(
																		'text-base',
																		isCompletedStep
																			? 'font-medium text-gray-800'
																			: isCurrentStep
																			? 'font-light text-gray-800'
																			: 'font-light text-gray-400',
																	)}
																>
																	{step}
																</p>
															</div>
															{isCompletedStep && (
																<div className='bg-blue-300 rounded-lg px-1.5 py-0.5 w-fit'>
																	<p className='text-blue-800 text-[0.6rem]'>
																		COMPLETE
																	</p>
																</div>
															)}
															{isCurrentStep && (
																<div className='bg-gray-300 rounded-lg px-1.5 py-0.5 w-fit animate-pulse'>
																	<p className='text-gray-800 text-[0.6rem]'>
																		IN PROGRESS
																	</p>
																</div>
															)}
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;
