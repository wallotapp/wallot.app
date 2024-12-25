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
	getSsoSiteRoute
} from '@wallot/js';
import { AssetOrderCartItem } from '@wallot/react/src/features/assetOrders';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { Fragment } from 'react';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';

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
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;
