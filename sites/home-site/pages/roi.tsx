import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PageHeader } from '@wallot/react/src/components/PageHeader';
import { HomeSiteRouteQueryParams } from '@wallot/js';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import {
	initialRetrieveInvestmentProductNetGainPageQueryKey,
	initialRetrieveInvestmentProductNetGainPageSearchParams,
	useRetrieveInvestmentProductNetGainPage,
} from '@wallot/react/src/features/assetOrders/hooks/useRetrieveInvestmentProductNetGainPage';
import { queryClient } from 'ergonomic-react/src/lib/tanstackQuery';
import { dehydrate } from '@tanstack/react-query';
import { retrieveInvestmentProductNetGainPage } from '@wallot/react/src/features/assetOrders/api/retrieveInvestmentProductNetGainPage';
import { AccountDashboardPageSuspense } from '@wallot/home-site/src/components/AccountDashboardPage';

const Page: NextPage<PageProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Investment Product Net Gains
	const {
		data: investmentProductNetGainPage,
		isLoading: isInvestmentProductNetGainPageLoading,
	} = useRetrieveInvestmentProductNetGainPage({});

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
			<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
				<PageHeader showHomeLink={false} />
				<div
					className={cn(
						'min-h-[95vh] w-full scroll-smooth',
						'py-32 px-6',
						'lg:py-32 lg:px-28',
					)}
				>
					<div className='container p-8 rounded-lg shadow'>
						<header className='mb-6'>
							<h1 className='text-3xl font-bold'>
								How well has Wallot AI performed historically?
							</h1>
							<p className='text-gray-600'>Let's take a look</p>
						</header>

						<div
							className={cn(
								isInvestmentProductNetGainPageLoading ? 'block' : 'hidden',
							)}
						>
							<AccountDashboardPageSuspense length={4} />
						</div>
						<div
							className={cn(
								isInvestmentProductNetGainPageLoading ? 'hidden' : 'block',
							)}
						>
							<section id='introduction' className='mb-6'>
								<h2 className='text-2xl font-semibold'>Summary</h2>
								<p className='mt-1 font-normal text-base'>
									{investmentProductNetGainPage?.summary.description}
								</p>
							</section>
						</div>

						<Separator />

						<section id='disclaimer' className='mt-6'>
							<h2 className='text-sm font-semibold'>
								Disclaimer and Limitation of Liability
							</h2>
							<p className='mt-1 font-light text-xs'>
								Wallot and its services are provided on an "as is" and "as
								available" basis. Wallot expressly disclaims all warranties of
								any kind, whether express or implied, including, but not limited
								to, the implied warranties of merchantability, fitness for a
								particular purpose, and non-infringement. In no event shall
								Wallot, its affiliates, agents, directors, employees, suppliers,
								or licensors be liable for any indirect, punitive, incidental,
								special, consequential, or exemplary damages, including without
								limitation damages for loss of profits, goodwill, use, data, or
								other intangible losses that result from the use of, or
								inability to use, the service. AI can make mistakes, and
								historical returns are not necessarily indicative of future
								results. Consult with a financial advisor before making any
								investment decisions.
							</p>
						</section>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/TERMS' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = async () => {
	// Prefetch the default query data
	await queryClient.prefetchQuery(
		initialRetrieveInvestmentProductNetGainPageQueryKey,
		() =>
			retrieveInvestmentProductNetGainPage(
				initialRetrieveInvestmentProductNetGainPageSearchParams,
			),
	);

	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Return on Investment',
	};
	return Promise.resolve({
		props: { ...ROUTE_STATIC_PROPS, dehydratedState: dehydrate(queryClient) },
	});
};
