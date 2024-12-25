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
	getHomeWebAppRoute,
	HomeWebAppRouteQueryParams,
	getSsoWebAppRoute,
} from '@wallot/js';
import { AssetOrderCartItem } from '@wallot/react/src/features/assetOrders';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { Fragment } from 'react';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import Link from 'next/link';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { FiChevronLeft } from 'react-icons/fi';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CART' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Cart',
};

// Route Query Params Type
type RouteQueryParams = HomeWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== Hooks ==== //

	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();

	// Auth
	useAuthenticatedRouteRedirect({
		authSiteOrigin: siteOriginByTarget.SSO_WEB_APP,
		loginRoutePath: getSsoWebAppRoute({
			includeOrigin: false,
			origin: null,
			queryParams: {},
			routeStaticId: 'SSO_WEB_APP__/LOGIN',
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
						<Link
							href={getHomeWebAppRoute({
								includeOrigin: true,
								origin: siteOriginByTarget.HOME_WEB_APP,
								queryParams: { order_id },
								routeStaticId: 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/ASSETS',
							})}
							className={cn(
								'flex items-center space-x-0.5 cursor-pointer text-brand-dark',
								'absolute top-28 left-6 lg:left-28',
							)}
						>
							<div>
								<FiChevronLeft />
							</div>
							<div>
								<p className='text-sm font-semibold'>Back</p>
							</div>
						</Link>
						<div className={cn('lg:flex lg:justify-between lg:space-x-28')}>
							<div className='lg:w-3/5'>
								<div>
									<p className='font-semibold text-3xl'>Your Cart</p>
									<p className='font-medium text-base'>
										Wallot is a trusted partner to buy and trade stocks
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
							<div
								className={cn(
									'bg-slate-100 mt-8 px-10 py-10 rounded-xl h-fit',
									'lg:w-2/5',
								)}
							>
								<div>
									<p className='font-semibold text-xl'>Order Summary</p>
								</div>
								<div className='mt-2.5'>
									<p className='font-medium text-base'>
										{assetOrders.length} item{assetOrders.length > 1 ? 's' : ''}
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
								<div className='mt-6 text-center'>
									<p className='font-normal text-sm'>
										Subtotal does not include applicable
										<br />
										trading license fees and taxes
									</p>
								</div>
								<div className='mt-6'>
									<Link
										href={getHomeWebAppRoute({
											includeOrigin: true,
											origin: siteOriginByTarget.HOME_WEB_APP,
											queryParams: { order_id },
											routeStaticId:
												'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CHECKOUT',
										})}
									>
										<button className='w-full'>
											<div className='bg-black py-2.5 px-10 rounded-sm flex items-center justify-center space-x-2'>
												<p className='font-medium text-sm text-white dark:text-brand'>
													I'm Ready to Pay
												</p>
											</div>
										</button>
									</Link>
								</div>
								<div></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;
