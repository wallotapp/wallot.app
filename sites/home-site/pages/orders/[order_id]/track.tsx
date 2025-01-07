import * as R from 'ramda';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import {
	HomeSiteRouteQueryParams,
	getSsoSiteRoute,
	isAchTransferWithFundsReceivedByAlpaca,
	isAssetOrderFilledByAlpaca,
	isUserActivatedByAlpaca,
} from '@wallot/js';
import {
	AssetOrderCartItem,
	useQueryAssetOrderPage,
} from '@wallot/react/src/features/assetOrders';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { Fragment } from 'react';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { GoCheckCircleFill, GoCircle } from 'react-icons/go';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { useQueryAchTransferPage } from '@wallot/react/src/features/achTransfers';

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
		shouldPauseFirebaseAuthRedirects: false,
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

	// Asset Orders
	const { data: assetOrderPage, isLoading: isAssetOrderPageLoading } =
		useQueryAssetOrderPage({
			firestoreQueryOptions: {
				whereClauses: [['order', '==', order_id]],
			},
		});
	const assetOrders = assetOrderPage?.documents ?? [];
	const orderSubtotalAmount = assetOrders.reduce((acc, assetOrder) => {
		return acc + Number(assetOrder.amount);
	}, 0);
	const subtotalAmountUsdString =
		getCurrencyUsdStringFromCents(orderSubtotalAmount);
	const taxesAndFeesAmount = 2499;
	const taxesAndFeesAmountUsdString =
		getCurrencyUsdStringFromCents(taxesAndFeesAmount);
	const assetTotalAmountUsdString = getCurrencyUsdStringFromCents(
		orderSubtotalAmount + taxesAndFeesAmount,
	);
	const unfilledAssetOrders = assetOrders.filter(
		R.complement(isAssetOrderFilledByAlpaca),
	);
	const isStockPurchasesStepCompleted = unfilledAssetOrders.length === 0;

	// Current User
	const { loggedInUser, isLoggedInUserLoading } = useQueryLoggedInUser();
	const isAccountVerified =
		loggedInUser != null && isUserActivatedByAlpaca(loggedInUser);

	// ACH Transfer
	const { data: achTransferPage, isLoading: isAchTransferPageLoading } =
		useQueryAchTransferPage({
			firestoreQueryOptions: {
				whereClauses: [
					[
						'alpaca_ach_transfer_account_id',
						'==',
						loggedInUser?.alpaca_account_id,
					],
				],
			},
		});
	const achTransfers = achTransferPage?.documents ?? [];
	const achTransfersWithFundsReceivedByAlpaca = achTransfers.filter(
		isAchTransferWithFundsReceivedByAlpaca,
	);
	const isFundsTransferStepCompleted =
		achTransfersWithFundsReceivedByAlpaca.length > 0;

	type OrderStep =
		| 'Account Verification'
		| 'Funds Transfer'
		| 'Stock Purchases';
	const orderSteps: OrderStep[] = [
		'Account Verification',
		'Funds Transfer',
		'Stock Purchases',
	];
	const completedSteps: OrderStep[] = [
		isAccountVerified ? ('Account Verification' as const) : null,
		isFundsTransferStepCompleted ? ('Funds Transfer' as const) : null,
		isStockPurchasesStepCompleted ? ('Stock Purchases' as const) : null,
	].filter((x): x is Exclude<typeof x, null> => x !== null);
	const nextStepToComplete = orderSteps.find(
		(step) => !completedSteps.includes(step),
	);

	const isAnyQueryLoading = [
		isAssetOrderPageLoading,
		isLoggedInUserLoading,
		isAchTransferPageLoading,
	].some(Boolean);

	const accountVerificationStepCopyEdit =
		"We're verifying your account details to get things started. This ensures a secure and seamless experience for your order.";
	const fundsTransferStepCopyEdit =
		"We're processing your funds transfer. Hang tight—this usually doesn't take long.";
	const purchasingStocksCopyEdit =
		"We're currently purchasing your selected stocks. You'll receive confirmation once this step is finalized.";
	const allDoneCopyEdit =
		'Your order is complete! Congratulations on your new investments.';
	const copyEdit = isAnyQueryLoading
		? ''
		: nextStepToComplete === 'Account Verification'
		? accountVerificationStepCopyEdit
		: nextStepToComplete === 'Funds Transfer'
		? fundsTransferStepCopyEdit
		: nextStepToComplete === 'Stock Purchases'
		? purchasingStocksCopyEdit
		: allDoneCopyEdit;

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
									{isAssetOrderPageLoading ? (
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
											<p className='font-semibold text-sm'>Subtotal</p>
										</div>
										<div>
											<p className='font-medium text-sm'>
												{subtotalAmountUsdString}
											</p>
										</div>
									</div>
									<div className='mt-1 flex justify-between'>
										<div>
											<p className='font-semibold text-sm'>Taxes and Fees</p>
										</div>
										<div>
											<p className='font-medium text-sm'>
												{taxesAndFeesAmountUsdString}
											</p>
										</div>
									</div>
									<div className='mt-6 flex justify-between'>
										<div>
											<p className='font-semibold text-xl'>
												Total{' '}
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
									<div className=''>
										<p className='font-semibold text-xl'>Order Status</p>
									</div>
									<div className='mt-1 mb-5'>
										<p className='font-light text-sm'>{copyEdit}</p>
									</div>
									{isAnyQueryLoading ? (
										<div className='flex flex-col space-y-2.5'>
											{[1, 2, 3].map((_, index) => (
												<div className=''>
													<Skeleton className='h-8 !bg-gray-300' key={index} />
												</div>
											))}
										</div>
									) : (
										<div className='px-4'>
											{orderSteps.map((step, index) => {
												const isCurrentStep = step === nextStepToComplete;
												const isCompletedStep = completedSteps.includes(step);
												return (
													<div
														className={cn(
															isCurrentStep
																? 'text-brand-dark'
																: 'text-gray-500',
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
									)}
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
