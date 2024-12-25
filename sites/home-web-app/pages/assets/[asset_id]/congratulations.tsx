import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Page as PageComponent, PageStaticProps, PageProps } from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeWebAppRouteQueryParams, getSsoWebAppRoute } from '@wallot/js';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PlatformLogo } from 'ergonomic-react/src/components/brand/PlatformLogo';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';
import Link from 'next/link';
import { GoCheck } from 'react-icons/go';
import { useQueryCurrentUser } from '@wallot/react/src/features/users';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_WEB_APP__/ASSETS/[ASSET_ID]/CONGRATULATIONS' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Congratulations',
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

	// Current User
	const { currentUser } = useQueryCurrentUser();

	// ==== Constants ==== //

	// Router Query
	const query = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { asset_id } = query;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace('[ASSET_ID]', asset_id || '');

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className={cn('min-h-screen relative', 'px-8 pt-24')}>
				<div className='mb-10 flex items-center justify-center'>
					{OPEN_GRAPH_CONFIG.siteBrandLogoDarkMode && OPEN_GRAPH_CONFIG.siteBrandLogoLightMode && (
						<PlatformLogo
							height={380}
							size='xl'
							srcMap={{
								dark: OPEN_GRAPH_CONFIG.siteBrandLogoDarkMode,
								light: OPEN_GRAPH_CONFIG.siteBrandLogoLightMode,
							}}
							width={2048}
						/>
					)}
					{!(OPEN_GRAPH_CONFIG.siteBrandLogoDarkMode && OPEN_GRAPH_CONFIG.siteBrandLogoLightMode) && (
						<div>
							<p className={cn('text-2xl font-bold', 'lg:text-3xl')}>{OPEN_GRAPH_CONFIG.siteName}</p>
						</div>
					)}
				</div>
				<div>
					<p>AAPL is yours!</p>
				</div>
				<div>
					<p>Stock purchase in progress. Sit back and let your money work for you.</p>
				</div>
				<div>
					<Link href={`/assets/${asset_id}/track`}>
						<p>Continue</p>
					</Link>
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
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;
