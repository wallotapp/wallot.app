import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeWebAppRouteQueryParams } from '@wallot/js/utils/routeDefinitions';

const alpacaMockAssets = [
	{
		id: '...',
		client_order_id: '...',
		created_at: '2024-12-12T17:42:48.325445516Z',
		updated_at: '2024-12-12T17:42:48.383109161Z',
		submitted_at: '2024-12-12T17:42:48.331538917Z',
		filled_at: '2024-12-12T17:42:48.381423893Z',
		expired_at: null,
		canceled_at: null,
		failed_at: null,
		replaced_at: null,
		replaced_by: null,
		replaces: null,
		asset_id: '...',
		symbol: 'AAPL',
		asset_class: 'us_equity',
		notional: null,
		qty: '1',
		filled_qty: '1',
		filled_avg_price: '248.04',
		order_class: '',
		order_type: 'market',
		type: 'market',
		side: 'buy',
		position_intent: 'buy_to_open',
		time_in_force: 'gtc',
		limit_price: null,
		stop_price: null,
		status: 'filled',
		extended_hours: false,
		legs: null,
		trail_percent: null,
		trail_price: null,
		hwm: null,
		commission: '0',
		subtag: null,
		source: null,
		expires_at: '2025-03-12T20:00:00Z',
	},
];

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

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
			<div className='p-8'>
				<div className='max-w-2xl'>
					<div>
						<p className='text-2xl font-bold'>Here are your Wallot Assets</p>
					</div>
					<div className='mt-4'>
						<div className='flex flex-col space-y-4'>
							{alpacaMockAssets.map((asset) => (
								<div
									key={asset.id}
									className='flex flex-col space-y-2 p-4 bg-gray-100 rounded-md'
								>
									<div className='flex justify-between'>
										<p className='text-lg font-bold'>{asset.symbol}</p>
										<p className='text-lg font-bold'>{asset.qty}</p>
									</div>
									<div className='flex justify-between'>
										<p className='text-sm text-gray-500'>Filled at</p>
										<p className='text-sm text-gray-500'>
											{asset.filled_avg_price}
										</p>
									</div>
									<div className='flex justify-between'>
										<p className='text-sm text-gray-500'>Filled on</p>
										<p className='text-sm text-gray-500'>{asset.filled_at}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_WEB_APP__/ASSETS' as const;

// Route Query Params Type
type RouteQueryParams = HomeWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Assets',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
