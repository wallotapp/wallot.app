import { default as cn } from 'ergonomic-react/src/lib/cn';
import { BaseComponentWithChildren } from 'ergonomic-react/src/types/BaseComponentTypes';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { useRouteStateContext } from 'ergonomic-react/src/hooks/useRouteStateContext';
import { accountDashboardConfigByRoute } from '@wallot/home-site/src/config/accountDashboardConfig';
import Link from 'next/link';
import { getSsoSiteRoute } from '@wallot/js';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';

export type AccountDashboardPageProps = BaseComponentWithChildren;
export const AccountDashboardPage: React.FC<AccountDashboardPageProps> = ({
	children,
}) => {
	// ==== Hooks ==== //

	// Site origins
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

	// Route State
	const { routeState } = useRouteStateContext();
	const currentRouteStaticId = routeState.currentRouteStaticId ?? '';

	return (
		<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
			<AuthenticatedPageHeader showHomeLink={false} />
			<PageActionHeader />
			<div
				className={cn('min-h-[95vh] w-full', 'py-36 px-6', 'lg:py-36 lg:px-28')}
			>
				<div>
					<p className='font-medium text-xl'>Account</p>
				</div>
				<div
					className={cn(
						'mt-2',
						'lg:flex lg:items-center lg:space-x-5 lg:border-b-[1.5px] lg:border-gray-200 lg:w-fit',
					)}
				>
					{Object.entries(accountDashboardConfigByRoute).map(
						([routeId, { href, title }]) => {
							const isActive = routeId === currentRouteStaticId;
							return (
								<Link key={routeId} href={href}>
									<div
										className={cn(
											'py-0.5 w-fit',
											isActive
												? 'border-b-2 border-b-brand-dark'
												: 'border-b-2 border-b-transparent',
										)}
									>
										<div className='hover:bg-gray-100 py-1 px-1.5 rounded-lg'>
											<p className='font-light text-sm'>{title}</p>
										</div>
									</div>
								</Link>
							);
						},
					)}
				</div>
				<div className='mt-7'>{children}</div>
			</div>
		</div>
	);
};
