import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	HomeWebAppRouteQueryParams,
	getHomeWebAppRoute,
	getSsoWebAppRoute,
} from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { Input } from 'ergonomic-react/src/components/ui/input';
import { Label } from 'ergonomic-react/src/components/ui/label';
import { Button } from 'ergonomic-react/src/components/ui/button';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

const alpacaMockStockOrderPayload = {
	orders: [
		{
			symbol: 'AAPL',
			qty: 1,
			side: 'buy',
			type: 'market',
			time_in_force: 'gtc',
		},
		{
			symbol: 'TSLA',
			qty: 2,
			side: 'sell',
			type: 'limit',
			time_in_force: 'day',
		},
		{
			symbol: 'GOOGL',
			qty: 3,
			side: 'buy',
			type: 'stop',
			time_in_force: 'gtc',
		},
	],
};
type AlpacaMockStockOrderPayload = typeof alpacaMockStockOrderPayload;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID =
	'HOME_WEB_APP__/RECOMMENDATIONS/[RECOMMENDATION_ID]/DETAILS' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Recommendation',
};

// Route Query Params Type
type RouteQueryParams = HomeWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// ==== Constants ==== //

	// Router Query
	const query = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { client_token, recommendation_id } = query;
	client_token;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace(
		'[ORDER_ID]',
		recommendation_id || '',
	);

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
	};

	const siteOriginByTarget = useSiteOriginByTarget();

	const orderConfirmationDestinationRoute = getHomeWebAppRoute({
		includeOrigin: true,
		origin: siteOriginByTarget.HOME_WEB_APP,
		queryParams: { order_id: '1' },
		routeStaticId: 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CONFIRM',
	});
	const registerRoute = getSsoWebAppRoute({
		includeOrigin: true,
		origin: siteOriginByTarget.SSO_WEB_APP,
		queryParams: { dest: orderConfirmationDestinationRoute },
		routeStaticId: 'SSO_WEB_APP__/REGISTER',
	});
	const {
		formState: { isSubmitting },
		handleSubmit,
		register,
	} = useForm<AlpacaMockStockOrderPayload>({
		defaultValues: alpacaMockStockOrderPayload,
		shouldUnregister: false,
	});
	const onSubmit = async (data: AlpacaMockStockOrderPayload) => {
		toast({
			title: 'Success',
			description: 'Saving your order...',
		});
		// Wait 1 second
		await new Promise((resolve) => setTimeout(resolve, 2500));
		console.log('Building stock order with the following data:', data);
		await router.push(registerRoute);
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className='p-8'>
				<div className='max-w-2xl'>
					<div>
						<p className='text-2xl font-bold'>
							Select the stocks you wish to order
						</p>
					</div>
					<div className='mt-4'>
						<form onSubmit={handleSubmit(onSubmit) as () => void}>
							<div>
								<Label>
									<p>
										Stock Symbol{' '}
										<span className='text-gray-400'>(e.g. AAPL)</span>
									</p>
								</Label>
								<Input
									placeholder='Stock Symbol'
									type='text'
									{...register('orders.0.symbol')}
								/>
							</div>
							<div className='mt-4 text-right'>
								<Button disabled={isSubmitting} type='submit'>
									<div>
										{isSubmitting ? (
											<>
												<div className='flex items-center justify-center space-x-2 min-w-16'>
													<div
														className={cn(
															'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
															'border-t-[#7F43D7] border-r-[#7F43D7] border-b-[#7F43D7]',
														)}
													></div>
												</div>
											</>
										) : (
											<p>Continue</p>
										)}
									</div>
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;
