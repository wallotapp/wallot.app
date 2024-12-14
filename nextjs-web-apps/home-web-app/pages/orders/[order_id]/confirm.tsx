import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeWebAppRouteQueryParams, getHomeWebAppRoute } from '@wallot/js';
import Link from 'next/link';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { Input } from 'ergonomic-react/src/components/ui/input';
import { Label } from 'ergonomic-react/src/components/ui/label';
import { Button } from 'ergonomic-react/src/components/ui/button';
import { default as cn } from 'ergonomic-react/src/lib/cn';

const wallotMockPaymentMethodPayload = {
	stripe_payment_method: { card: { number: '4242424242424242' } },
};
type WallotPaymentMethodPayload = typeof wallotMockPaymentMethodPayload;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CONFIRM' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Confirm Order',
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
	const { client_token, order_id } = query;
	client_token;

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

	const connectBankAccountUrl = `https://stripe.com/todo`;
	const assetsRoute = getHomeWebAppRoute({
		includeOrigin: false,
		origin: null,
		queryParams: {},
		routeStaticId: 'HOME_WEB_APP__/ASSETS',
	});
	const {
		formState: { isSubmitting },
		handleSubmit,
		register,
	} = useForm<WallotPaymentMethodPayload>({
		defaultValues: wallotMockPaymentMethodPayload,
		shouldUnregister: false,
	});
	const onSubmit = async (data: WallotPaymentMethodPayload) => {
		toast({
			title: 'Confirming your Wallot stock order...',
			description: 'This may take a few seconds.',
		});
		// Wait 1 second
		await new Promise((resolve) => setTimeout(resolve, 2500));
		console.log('Confirming stock order with following data data:', data);
		await router.push(assetsRoute);
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className='p-8'>
				<div className='max-w-2xl'>
					<div>
						<p className='text-2xl font-bold'>Confirm your stock order</p>
					</div>
					<div className='mt-4'>
						<Link href={connectBankAccountUrl}>
							<Button>
								<p>Connect your bank account</p>
							</Button>
						</Link>
					</div>
					<div className='mt-4'>
						<form onSubmit={handleSubmit(onSubmit) as () => void}>
							<div>
								<Label>
									<p>Card Number</p>
								</Label>
								<Input
									placeholder='Card Number'
									type='text'
									{...register('stripe_payment_method.card.number')}
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
											<p>Submit order</p>
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
