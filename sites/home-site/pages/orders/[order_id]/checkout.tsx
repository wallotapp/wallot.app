import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import {
	getHomeSiteRoute,
	HomeSiteRouteQueryParams,
	getSsoSiteRoute,
} from '@wallot/js';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import Link from 'next/link';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { FiChevronLeft } from 'react-icons/fi';
import { BankAccountsContainer } from '@wallot/react/src/features/bankAccounts/components/BankAccountsContainer';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { useConfirmOrderMutation } from '@wallot/react/src/features/orders';
import { BillingInformationContainer } from '@wallot/react/src/features/users/components/BillingInformationContainer';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Checkout',
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

	// Toaster
	const { toast } = useToast();

	// Current User
	const { loggedInUser } = useQueryLoggedInUser();
	const defaultBankAccountId = loggedInUser?.default_bank_account ?? 'null';

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
	const { data: assetOrderPage } = useQueryAssetOrderPage({
		firestoreQueryOptions: {
			whereClauses: [['order', '==', order_id]],
		},
	});
	const assetOrders = assetOrderPage?.documents ?? [];
	const assetTotalAmount = assetOrders.reduce((acc, assetOrder) => {
		return acc + Number(assetOrder.amount);
	}, 0);
	const assetTotalAmountUsdString = getCurrencyUsdStringFromCents(
		assetTotalAmount + 2499,
	);

	// ==== Complete Purchase ==== //
	const { mutate: confirmOrder, isLoading: isConfirmOrderRunning } =
		useConfirmOrderMutation(order_id, {
			onError: ({ error: { message } }) => {
				// Show the error message
				toast({
					title: 'Error',
					description: message,
				});
			},
			onSuccess: async ({ redirect_uri }) => {
				// Show success toast
				toast({
					title: 'Success',
					description: 'Confirmed your order...',
				});

				// Redirect to the order page
				await router.push(redirect_uri);
			},
		});
	const isCompletePurchaseButtonDisabled = isConfirmOrderRunning;

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
							href={getHomeSiteRoute({
								includeOrigin: true,
								origin: siteOriginByTarget.HOME_SITE,
								queryParams: { order_id },
								routeStaticId: 'HOME_SITE__/ORDERS/[ORDER_ID]/CART',
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
									<p className='font-semibold text-3xl'>Checkout</p>
								</div>
								<BillingInformationContainer
									className='mt-8'
									disableEdits={isCompletePurchaseButtonDisabled}
								/>
								<BankAccountsContainer
									className='mt-8'
									disableConnectionCallback={isCompletePurchaseButtonDisabled}
								/>
							</div>
							<div
								className={cn(
									'bg-slate-100 mt-8 px-10 py-10 rounded-xl h-fit',
									'lg:w-2/5 lg:sticky lg:top-28 lg:mt-0',
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
								<div className='mt-6'>
									<button
										className={cn(
											'py-2.5 px-10 rounded-md flex items-center justify-center space-x-2 w-full',
											isCompletePurchaseButtonDisabled
												? 'bg-slate-500'
												: 'bg-black',
										)}
										disabled={isCompletePurchaseButtonDisabled}
										onClick={() =>
											confirmOrder({ bank_account: defaultBankAccountId })
										}
									>
										{isConfirmOrderRunning ? (
											<div className='flex items-center justify-center space-x-2 min-w-16 py-0.5'>
												<div
													className={cn(
														'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
														'border-t-brand border-r-brand border-b-brand',
													)}
												></div>
											</div>
										) : (
											<p
												className={cn(
													'font-medium text-sm',
													isCompletePurchaseButtonDisabled
														? 'text-slate-300'
														: 'text-white',
												)}
											>
												Complete Purchase
											</p>
										)}
									</button>
								</div>
								<div className='mt-6'>
									<p className='font-normal text-sm'>
										By clicking "Complete Purchase", you agree to our{' '}
										<Link
											href={getHomeSiteRoute({
												includeOrigin: true,
												origin: siteOriginByTarget.HOME_SITE,
												queryParams: {},
												routeStaticId: 'HOME_SITE__/TERMS',
											})}
											target='_blank'
										>
											<span className='underline'>Terms of Service</span>
										</Link>{' '}
										and{' '}
										<Link
											href={getHomeSiteRoute({
												includeOrigin: true,
												origin: siteOriginByTarget.HOME_SITE,
												queryParams: {},
												routeStaticId: 'HOME_SITE__/PRIVACY',
											})}
											target='_blank'
										>
											<span className='underline'>Privacy Policy</span>
										</Link>
										, and affirm that the billing information you provided is
										accurate and complete to the best of your knowledge. In
										addition, you agree that you are conducting trading activity
										at your own risk and that you are responsible for any losses
										that may occur.
									</p>
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
