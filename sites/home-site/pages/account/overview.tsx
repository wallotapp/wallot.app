import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeSiteRouteQueryParams } from '@wallot/js';
import { AccountDashboardPage } from '@wallot/home-site/src/components/AccountDashboardPage';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import Link from 'next/link';
import {
	useQueryLoggedInUser,
	useQueryLoggedInUserStatus,
} from '@wallot/react/src/features/users';
import { GoArrowRight } from 'react-icons/go';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Router
	const { loggedInUserDisplayName } = useQueryLoggedInUser();
	const { isLoggedInUserStatusLoading, state, tasks } =
		useQueryLoggedInUserStatus();
	isLoggedInUserStatusLoading;
	state;
	tasks;

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
				<div>
					{/* Welcome Section */}
					<div>
						<div>
							<p className='font-semibold text-2xl'>
								Welcome back
								{loggedInUserDisplayName ? `, ${loggedInUserDisplayName}` : ''}!
							</p>
						</div>
						<div className='mt-1'>
							<p className='font-light text-base text-gray-600'>
								Browse our{' '}
								<Link href='/knowledge-base' target='_blank'>
									<span className='font-normal text-brand hover:text-brand-dark'>
										knowledge base
									</span>
								</Link>{' '}
								or{' '}
								<Link href='https://instagram.com/wallotapp' target='_blank'>
									<span className='font-normal text-brand hover:text-brand-dark'>
										explore all the ways
									</span>
								</Link>{' '}
								to start trading on Wallot.
							</p>
						</div>
					</div>
					<div className='mt-4'>
						{/* Tasks Section */}
						<div>
							<p className='font-medium text-lg'>Tasks</p>
						</div>
						<div className='mt-2'>
							{tasks.map(({ ctaHref, ctaText, title, subtitle }, taskIdx) => {
								return (
									<div
										key={ctaHref}
										className={cn(
											'p-4 bg-white rounded-lg shadow-sm border',
											'lg:flex lg:items-center lg:justify-between lg:space-x-16',
											taskIdx > 0 ? 'mt-4' : '',
											taskIdx === 0 ? 'border-red-800' : '',
										)}
									>
										<div>
											<div className='font-medium'>{title}</div>
											<div className='font-extralight text-gray-600 text-sm'>
												{subtitle}
											</div>
										</div>
										<div>
											<Link href={ctaHref}>
												<div
													className={cn(
														'bg-black px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-2 hover:bg-brand-dark',
													)}
												>
													<div>
														<p className='text-white text-sm font-semibold'>
															{ctaText}
														</p>
													</div>
													<div>
														<GoArrowRight className='text-white text-sm' />
													</div>
												</div>
											</Link>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className='mt-4'>
						{/* Equity Section */}
						<div>Equity</div>
					</div>
					<div className='mt-4'>
						{/* Recent Orders Section */}
						<div>Recent orders</div>
					</div>
					<div className='mt-4'>
						{/* Billing Information */}
						<div>Billing information</div>
					</div>
				</div>
			</AccountDashboardPage>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/ACCOUNT/OVERVIEW' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Account',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
