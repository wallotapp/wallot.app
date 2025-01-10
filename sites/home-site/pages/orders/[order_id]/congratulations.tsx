import { Fragment, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	HomeSiteRouteQueryParams,
	getHomeSiteRoute,
	getSsoSiteRoute,
} from '@wallot/js';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useWindowSize } from '@wallot/react/src/hooks/useWindowSize';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PlatformIcon } from 'ergonomic-react/src/components/brand/PlatformIcon';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';
import { GoCheck } from 'react-icons/go';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import Confetti from 'react-confetti';
import { SuspensePage } from '@wallot/react/src/components/SuspensePage';
import {
	AssetOrderCartItem,
	useQueryAssetOrderPage,
} from '@wallot/react/src/features/assetOrders';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import { AsyncLink } from 'ergonomic-react/src/components/custom-ui/async-link';
import {
	ALPACA_OAUTH_APP_BASE_URL,
	ALPACA_OAUTH_CLIENT_ID,
} from '@wallot/react/src/config/alpacaOAuthConfig';
import Image from 'next/image';
import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from 'ergonomic-react/src/components/ui/dialog';
import { RxSlash } from 'react-icons/rx';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID =
	'HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Congratulations',
};

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

const Icon = ({
	size,
}: {
	size: 'md' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl';
}) => (
	<div className='flex items-center justify-center'>
		{OPEN_GRAPH_CONFIG.siteBrandIconDarkMode &&
			OPEN_GRAPH_CONFIG.siteBrandIconLightMode && (
				<PlatformIcon
					height={380}
					size={size}
					srcMap={{
						dark: OPEN_GRAPH_CONFIG.siteBrandIconDarkMode,
						light: OPEN_GRAPH_CONFIG.siteBrandIconLightMode,
					}}
					width={2048}
				/>
			)}
		{!(
			OPEN_GRAPH_CONFIG.siteBrandIconDarkMode &&
			OPEN_GRAPH_CONFIG.siteBrandIconLightMode
		) && (
			<div>
				<p className={cn('text-2xl font-bold', 'lg:text-3xl')}>
					{OPEN_GRAPH_CONFIG.siteName}
				</p>
			</div>
		)}
	</div>
);

const Page: NextPage = () => {
	// ==== State ==== //
	const [recycle, setRecycle] = useState(true);

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

	// Current User
	const { loggedInUser } = useQueryLoggedInUser();
	const receiptEmail =
		loggedInUser?.alpaca_account_contact?.email_address ??
		loggedInUser?.firebase_auth_email ??
		'your email on file';
	const loggedInUserId = loggedInUser?._id;

	// Window size
	const { height, width } = useWindowSize();

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

	// Connection Link
	const homeSiteOrigin = siteOriginByTarget.HOME_SITE;
	const isConnectionLinkReady =
		homeSiteOrigin != null && loggedInUserId != null;
	const connectionLink = isConnectionLinkReady
		? getAlpacaConnectionLink(homeSiteOrigin, loggedInUserId)
		: '/';

	// ==== Hooks ==== //
	const { data: assetOrderPage, isLoading: isAssetOrderPageLoading } =
		useQueryAssetOrderPage({
			firestoreQueryOptions: {
				whereClauses: [['order', '==', order_id]],
			},
		});
	const assetOrders = assetOrderPage?.documents ?? [];
	const hasOneAssetOrder = assetOrders.length === 1;
	const hasTwoAssetOrders = assetOrders.length === 2;
	const hasThreeOrMoreAssetOrders = assetOrders.length >= 3;
	const assetSymbols = assetOrders.map(
		(assetOrder) => assetOrder.alpaca_order_symbol,
	);
	const firstAssetSymbol = assetSymbols[0] ?? '';
	const assetOrdersCongratulationText = hasOneAssetOrder // 1
		? `${firstAssetSymbol} is yours!`
		: hasTwoAssetOrders // 2
		? `${assetSymbols.join(' and ')} are yours!`
		: hasThreeOrMoreAssetOrders // 4+
		? `${assetSymbols.slice(0, 2).join(', ')} and more are yours!`
		: '';
	const orderSubtotalAmount = assetOrders.reduce((acc, assetOrder) => {
		return acc + Number(assetOrder.amount);
	}, 0);
	const taxesAndFeesAmount = 2499;
	const taxesAndFeesAmountUsdString =
		getCurrencyUsdStringFromCents(taxesAndFeesAmount);
	const assetTotalAmountUsdString = getCurrencyUsdStringFromCents(
		orderSubtotalAmount + taxesAndFeesAmount,
	);

	// ==== Effects ==== //
	useEffect(() => {
		if (height == null || width == null) return;

		const timer = setTimeout(() => setRecycle(false), 3000);
		return () => clearTimeout(timer); // Cleanup timeout when the component unmounts
	}, [height, width]);

	// Component

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			{isAssetOrderPageLoading ? (
				<SuspensePage />
			) : (
				<Fragment>
					<div
						className={cn('h-screen relative', 'px-8 pt-12 overflow-hidden')}
					>
						<Icon size='md' />
						<div className='flex flex-col items-center text-center'>
							<div className='mt-8'>
								<p className='font-normal text-4xl'>
									{assetOrdersCongratulationText}
								</p>
							</div>
							<div className='mt-3'>
								<p className='font-light text-base'>
									Stock purchase in progress. Complete your trading account
									setup below.
								</p>
							</div>
							<div className='mt-8'>
								<Dialog>
									<DialogTrigger asChild>
										<div
											className={cn(
												'bg-black text-white rounded-md py-4 px-8 cursor-pointer w-fit',
												'flex items-center space-x-3 w-fit',
											)}
										>
											<p>Continue</p>
										</div>
									</DialogTrigger>
									<DialogContent className=''>
										<div
											className={cn(
												'flex items-center justify-center space-x-3',
											)}
										>
											<div>
												<Icon size='lg' />
											</div>
											<RxSlash className={cn('text-gray-500 text-3xl')} />
											<div>
												<Image
													alt='Alpaca Icon'
													height={64}
													src='/img/integrations/alpaca-icon.png'
													width={64}
												/>
											</div>
										</div>
										<DialogHeader className='mt-2'>
											<DialogTitle>Complete your Trading Account</DialogTitle>
											<DialogDescription>
												We've partnered with Alpaca to deliver a seamless
												trading experience for you.
											</DialogDescription>
										</DialogHeader>
										<AsyncLink
											href={connectionLink}
											isReady={isConnectionLinkReady}
											className='w-full'
										>
											<div
												className={cn(
													'bg-black text-white rounded-md px-4 py-2.5 cursor-pointer',
													'flex items-center justify-center space-x-3 w-full',
												)}
											>
												<div>
													<Image
														alt='Alpaca Icon'
														height={21}
														src='/img/integrations/alpaca-icon.png'
														width={21}
													/>
												</div>
												<div>
													<p className='font-light'>Connect Alpaca Account</p>
												</div>
											</div>
										</AsyncLink>
										<DialogFooter className=''>
											<div className={cn('mt-1', 'lg:max-w-2xl')}>
												<p className='font-semibold text-xs'>
													Authorize Wallot
												</p>
												<p className='font-light text-[0.55rem]'>
													By allowing Wallot to access your Alpaca account, you
													are granting Wallot access to your account information
													and authorization to place transactions in your
													account at your direction. Alpaca does not warrant or
													guarantee that Wallot will work as advertised or
													expected. Before authorizing, learn more about Wallot.
												</p>
											</div>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
						</div>
						<div
							className={cn(
								'mt-10 flex flex-col items-center bg-white p-4 rounded-md max-w-4xl mx-auto shadow-xl border border-gray-200',
								'overflow-y-auto h-screen',
							)}
						>
							<div className='mt-4 text-center'>
								<GoCheck className='text-green-600 text-5xl' />
							</div>
							<div className='mt-6 text-center'>
								<p className='font-normal text-xl'>Thank you for your order!</p>
							</div>
							<div className='mt-0.5 text-center'>
								<p className='font-light text-base'>
									We've emailed your receipt to{' '}
									<span className='font-semibold'>{receiptEmail}</span>
								</p>
							</div>
							<div className='mt-5 w-full'>
								{assetOrders.map((assetOrder, assetOrderIdx) => {
									return (
										<AssetOrderCartItem
											assetOrder={assetOrder}
											className={cn(
												assetOrderIdx > 0
													? '!border-t !border-t-gray-200 !border-b-0 !border-l-0 !border-r-0'
													: '!border-0',
												'!rounded-none !shadow-none',
												'p-6',
											)}
											key={assetOrder._id}
										/>
									);
								})}
							</div>
							<div className='border-t border-t-gray-200 pt-4 flex justify-between items-center w-full px-4'>
								<div>
									<p className='font-light text-lg'>Taxes and fees</p>
								</div>
								<div>
									<p className='font-light text-lg'>
										{taxesAndFeesAmountUsdString}
									</p>
								</div>
							</div>
							<div className='mt-8 flex justify-between items-center w-full px-4'>
								<div>
									<p className='font-normal text-3xl'>Total</p>
								</div>
								<div>
									<p className='font-normal text-3xl text-green-600'>
										{assetTotalAmountUsdString}
									</p>
								</div>
							</div>
							<div className='min-h-[60vh]' />
						</div>
					</div>
					{height != null && width != null && (
						<Confetti height={height} recycle={recycle} width={width} />
					)}
				</Fragment>
			)}
		</PageComponent>
	);
};

export default Page;

function getAlpacaConnectionLink(homeSiteOrigin: string, userId: string) {
	const redirectUri = getHomeSiteRoute({
		includeOrigin: true,
		origin: homeSiteOrigin,
		queryParams: {},
		routeStaticId: 'HOME_SITE__/OAUTH/ALPACA/CALLBACK',
	});
	const redirectUriEncoded = encodeURIComponent(redirectUri);
	return `${ALPACA_OAUTH_APP_BASE_URL}/oauth/authorize?response_type=code&client_id=${ALPACA_OAUTH_CLIENT_ID}&redirect_uri=${redirectUriEncoded}&state=${userId}&scope=account:write%20trading`;
}
