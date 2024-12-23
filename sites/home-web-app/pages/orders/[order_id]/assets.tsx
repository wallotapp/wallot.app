import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { getHomeWebAppRoute, HomeWebAppRouteQueryParams } from '@wallot/js';
import { AssetOrder, Recommendation } from '@wallot/js';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';
import { useQueryRecommendationPage } from '@wallot/react/src/features/recommendations';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { Fragment } from 'react';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import Link from 'next/link';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { FiShoppingCart } from 'react-icons/fi';

const AssetOrderCard: React.FC<{
	assetOrder: AssetOrder;
	recommendation: Recommendation;
}> = ({ assetOrder, recommendation }) => {
	const assetSymbol = assetOrder.alpaca_order_symbol;
	const { best_investments } = recommendation;
	const investmentRecommendationForAsset = best_investments.find(
		({ symbol }) => symbol === assetSymbol,
	);
	if (!investmentRecommendationForAsset) {
		return null;
	}
	const { amount, rationale } = investmentRecommendationForAsset;
	const amountUsdString = getCurrencyUsdStringFromCents(Number(amount) * 100);

	return (
		<div
			className={cn(
				'bg-white border border-gray-200 rounded-md shadow-md p-6 h-full',
			)}
		>
			<div className={cn('flex justify-between')}>
				<div>
					<p className={cn('text-2xl font-semibold')}>
						{assetOrder.alpaca_order_symbol}
					</p>
					<p className={cn('text-lg font-light')}>
						{assetOrder.alpaca_order_qty} shares
					</p>
				</div>
				<div>
					<p className={cn('text-2xl font-medium')}>{amountUsdString}</p>
					<p className={cn('text-lg font-light')}>
						{assetOrder.alpaca_order_side} order
					</p>
				</div>
			</div>
			<div className={cn('mt-5')}>
				<div>
					<p className={cn('text-xs font-semibold')}>Investment thesis</p>
				</div>
				<div className='mt-0.5'>
					<p className={cn('text-sm font-extralight')}>{rationale}</p>
				</div>
			</div>
		</div>
	);
};

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/ASSETS' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Assets',
};

// Route Query Params Type
type RouteQueryParams = HomeWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();

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
	const recommendationIds = assetOrders[0]?.recommendations;
	const firstRecommendationId = recommendationIds?.[0];
	const { data: recommendationPage, isLoading: isRecommendationPageLoading } =
		useQueryRecommendationPage({
			firestoreQueryOptions: {
				whereClauses: [['_id', '==', firstRecommendationId]],
			},
		});
	const recommendations = recommendationPage?.documents ?? [];
	const recommendation = recommendations[0];

	const isDataLoading =
		isAssetOrderPageLoading ||
		isRecommendationPageLoading ||
		recommendation == null;

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
						<div className={cn('', 'lg:flex lg:items-end lg:justify-between')}>
							<div>
								<p className='text-5xl'>
									Wallot AI recommends
									<br />
									these stocks for your portfolio
								</p>
							</div>
							<div>
								<Link
									href={getHomeWebAppRoute({
										includeOrigin: true,
										origin: siteOriginByTarget.HOME_WEB_APP,
										queryParams: { order_id },
										routeStaticId: 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CART',
									})}
								>
									<button>
										<div className='bg-black py-1.5 px-8 rounded-sm flex items-center space-x-3'>
											<div>
												<FiShoppingCart className='text-white dark:text-brand text-sm' />
											</div>
											<div>
												<p className='text-sm text-white dark:text-brand'>
													Continue to Cart
												</p>
											</div>
										</div>
									</button>
								</Link>
							</div>
						</div>
						<div
							className={cn(
								'mt-10',
								'grid grid-cols-1 gap-3',
								'md:grid-cols-2',
								'lg:grid-cols-2',
								'xl:grid-cols-4',
							)}
						>
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
									{assetOrders.map((assetOrder) => {
										return (
											<AssetOrderCard
												assetOrder={assetOrder}
												key={assetOrder._id}
												recommendation={recommendation}
											/>
										);
									})}
								</Fragment>
							)}
						</div>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;
