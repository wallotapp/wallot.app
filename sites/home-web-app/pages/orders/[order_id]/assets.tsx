import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeWebAppRouteQueryParams } from '@wallot/js';
import { AssetOrder } from '@wallot/js';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';

const AssetOrderCard: React.FC<{ assetOrder: AssetOrder }> = ({
	assetOrder,
}) => {
	return <div>{assetOrder._id}</div>;
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
	const assetOrders = (assetOrderPage?.documents ?? []).filter(() => false);

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div>
				<div>Assets</div>
				{!isAssetOrderPageLoading && (
					<div className='flex space-x-4'>
						{[1, 2, 3].map((_, index) => (
							<Skeleton className='h-[30rem] w-72' key={index} />
						))}
					</div>
				)}
				{assetOrders.map((assetOrder) => {
					return (
						<AssetOrderCard key={assetOrder._id} assetOrder={assetOrder} />
					);
				})}
			</div>
		</PageComponent>
	);
};

export default Page;
