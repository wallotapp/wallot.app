import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeWebAppRouteQueryParams } from '@wallot/js/utils/routeDefinitions';
import Link from 'next/link';
import { Button } from 'ergonomic-react/src/components/ui/button';

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

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className='p-8'>
				<div className='max-w-2xl'>
					<div>
						<p className='text-2xl font-bold'>Welcome to Wallot</p>
					</div>
					<div className='mt-4'>
						<Link href={connectBankAccountUrl}>
							<Button>
								<p>Connect your bank account</p>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;
