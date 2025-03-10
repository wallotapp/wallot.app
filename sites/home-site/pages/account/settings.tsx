import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeSiteRouteQueryParams } from '@wallot/js';
import { AccountDashboardPage } from '@wallot/home-site/src/components/AccountDashboardPage';
import { BillingInformationContainer } from '@wallot/react/src/features/users/components/BillingInformationContainer';
import { default as cn } from 'ergonomic-react/src/lib/cn';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const _: RouteQueryParams = router?.query ?? {};
	_;

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
			<AccountDashboardPage className={cn('lg:max-w-3xl')}>
				<BillingInformationContainer defaultOpen />
			</AccountDashboardPage>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/ACCOUNT/SETTINGS' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Billing Information',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
