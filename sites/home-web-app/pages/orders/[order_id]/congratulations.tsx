import { Fragment, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Page as PageComponent, PageStaticProps, PageProps } from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeWebAppRouteQueryParams, getSsoWebAppRoute } from '@wallot/js';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useWindowSize } from '@wallot/react/src/hooks/useWindowSize';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PlatformIcon } from 'ergonomic-react/src/components/brand/PlatformIcon';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';
import Link from 'next/link';
import { GoCheck } from 'react-icons/go';
import { useQueryCurrentUser } from '@wallot/react/src/features/users';
import Confetti from 'react-confetti';
import { SuspensePage } from '@wallot/react/src/components/SuspensePage';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CONGRATULATIONS' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Congratulations',
};

// Route Query Params Type
type RouteQueryParams = HomeWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== State ==== //
	const [recycle, setRecycle] = useState(true);

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

	// Current User
	const { currentUser } = useQueryCurrentUser();

	// Window size
	const { height, width } = useWindowSize();

	// ==== Constants ==== //

	// Router Query
	const query = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { order_id } = query;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace('[ORDER_ID]', order_id || '');

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Hooks ==== //
	const { data: assetOrderPage, isLoading: isAssetOrderPageLoading } = useQueryAssetOrderPage({
		firestoreQueryOptions: {
			whereClauses: [['order', '==', order_id]],
		},
	});
	const assetOrders = assetOrderPage?.documents ?? [];
	const firstAsset = assetOrders[0];
	const firstAssetId = firstAsset?._id ?? '';
	const hasOneAsset = assetOrders.length === 1;
	const hasTwoAssets = assetOrders.length === 2;
	const hasThreeOrMoreAssets = assetOrders.length >= 3;
	const assetNames = assetOrders.map((assetOrder) => assetOrder.alpaca_order_symbol);
	const firstAssetName = assetNames[0] ?? '';
	const assetCongratulationText = hasOneAsset // 1
		? `${firstAssetName} is yours!`
		: hasTwoAssets // 2
		? `${assetNames.join(' and ')} are yours!`
		: hasThreeOrMoreAssets // 4+
		? `${assetNames.slice(0, 2).join(', ')} and more are yours!`
		: '';

	// ==== Effects ==== //
	useEffect(() => {
		if (height == null || width == null) return;

		const timer = setTimeout(() => setRecycle(false), 3000);
		return () => clearTimeout(timer); // Cleanup timeout when the component unmounts
	}, [height, width]);

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			{isAssetOrderPageLoading ? (
				<SuspensePage />
			) : (
				<Fragment>
					<div className={cn('min-h-screen relative', 'px-8 pt-12')}>
						<div className='mb-10 flex items-center justify-center'>
							{OPEN_GRAPH_CONFIG.siteBrandIconDarkMode && OPEN_GRAPH_CONFIG.siteBrandIconLightMode && (
								<PlatformIcon
									height={380}
									size='lg'
									srcMap={{
										dark: OPEN_GRAPH_CONFIG.siteBrandIconDarkMode,
										light: OPEN_GRAPH_CONFIG.siteBrandIconLightMode,
									}}
									width={2048}
								/>
							)}
							{!(OPEN_GRAPH_CONFIG.siteBrandIconDarkMode && OPEN_GRAPH_CONFIG.siteBrandIconLightMode) && (
								<div>
									<p className={cn('text-2xl font-bold', 'lg:text-3xl')}>{OPEN_GRAPH_CONFIG.siteName}</p>
								</div>
							)}
						</div>
						<div className='flex flex-col items-center'>
							<div className='mt-7'>
								<p className='font-normal text-4xl'>{assetCongratulationText}</p>
							</div>
							<div className='mt-3'>
								<p className='font-light text-base'>Stock purchase in progress. We'll take it from here.</p>
							</div>
							<div className='mt-8'>
								<Link href={`/assets/${firstAssetId}/track`}>
									<div className='bg-black text-white rounded-md py-4 px-8 cursor-pointer w-fit'>
										<p className='font-light'>Continue</p>
									</div>
								</Link>
							</div>
						</div>
						<div>
							<div>
								<GoCheck />
							</div>
							<div>Thank you for your order!</div>
							<div>We've emailed your receipt to {currentUser?.firebase_auth_email ?? 'your email on file'}</div>
							<div>AAPL shares: $100.00</div>
							<div>Taxes and fees: $24.99</div>
							<div>Total: $124.99</div>
							<p>
								Height {height} Width {width}
							</p>
						</div>
					</div>
					{height != null && width != null && <Confetti height={height} recycle={recycle} width={width} />}
				</Fragment>
			)}
		</PageComponent>
	);
};

export default Page;
