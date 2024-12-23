import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { PlatformLogo } from 'ergonomic-react/src/components/brand/PlatformLogo';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';
import { useRouteStateContext } from 'ergonomic-react/src/hooks/useRouteStateContext';
import {
	getBlogWebAppRoute,
	getHomeWebAppRoute,
	getKnowledgeBaseWebAppRoute,
	getSsoWebAppRoute,
} from '@wallot/js';
import { FiMenu } from 'react-icons/fi';
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from 'ergonomic-react/src/components/ui/sheet';
import { Fragment } from 'react';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export type PageHeaderProps = BaseComponent & {
	getCustomLogoButton?: (props: BaseComponent) => JSX.Element;
	showHomeLink?: boolean;
};
export const PageHeader: React.FC<PageHeaderProps> = ({
	className = '',
	getCustomLogoButton,
	showHomeLink = true,
}) => {
	// ==== Hooks ==== //
	const {
		routeState: { currentRouteStaticId },
	} = useRouteStateContext();
	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
	const knowledgeBaseWebAppOrigin = siteOriginByTarget[
		'KNOWLEDGE_BASE_WEB_APP'
	] as string;
	const homeWebAppOrigin = siteOriginByTarget['HOME_WEB_APP'] as string;
	const ssoWebAppOrigin = siteOriginByTarget['SSO_WEB_APP'] as string;
	const blogWebAppOrigin = siteOriginByTarget['BLOG_WEB_APP'] as string;

	// ==== Components ==== //
	const LogoButton: React.FC<BaseComponent> = ({ className = '' }) => {
		const darkModeSrc = OPEN_GRAPH_CONFIG.siteBrandLogoDarkMode as string;
		const lightModeSrc = OPEN_GRAPH_CONFIG.siteBrandLogoLightMode as string;
		if (getCustomLogoButton == null)
			return (
				<Link className={className} href='/'>
					<PlatformLogo
						height={380}
						size='md'
						srcMap={{
							dark: darkModeSrc,
							light: lightModeSrc,
						}}
						width={2048}
					/>
				</Link>
			);

		return getCustomLogoButton({ className });
	};
	const HomeLink: React.FC<BaseComponent> = ({ className = '' }) => {
		const homeHref = getHomeWebAppRoute({
			includeOrigin: siteUrl !== homeWebAppOrigin,
			origin: homeWebAppOrigin,
			queryParams: {},
			routeStaticId: 'HOME_WEB_APP__/INDEX',
		});
		const homeTarget = siteUrl !== homeWebAppOrigin ? '_blank' : '';
		return (
			<Link className={className} href={homeHref} target={homeTarget}>
				<p
					className={cn(
						'font-light text-sm',
						currentRouteStaticId === 'HOME_WEB_APP__/INDEX' &&
							'underline underline-offset-4',
					)}
				>
					Home
				</p>
			</Link>
		);
	};
	const KnowledgeBaseLink: React.FC<BaseComponent> = ({ className = '' }) => {
		const knowledgeBaseHref = getKnowledgeBaseWebAppRoute({
			includeOrigin: siteUrl !== knowledgeBaseWebAppOrigin,
			origin: knowledgeBaseWebAppOrigin,
			queryParams: {},
			routeStaticId: 'KNOWLEDGE_BASE_WEB_APP__/INDEX',
		});
		const knowledgeBaseTarget =
			siteUrl !== knowledgeBaseWebAppOrigin ? '_blank' : '';
		return (
			<Link
				className={className}
				href={knowledgeBaseHref}
				target={knowledgeBaseTarget}
			>
				<p
					className={cn(
						'font-light text-sm',
						currentRouteStaticId?.startsWith('KNOWLEDGE_BASE_WEB_APP') &&
							'underline underline-offset-4',
					)}
				>
					Learn
				</p>
			</Link>
		);
	};
	const SupportLink: React.FC<BaseComponent> = ({ className = '' }) => {
		const supportHref = getSsoWebAppRoute({
			includeOrigin: true,
			origin: ssoWebAppOrigin,
			queryParams: {},
			routeStaticId: 'SSO_WEB_APP__/LOGIN',
		});
		return (
			<Link className={className} href={supportHref} target='_blank'>
				<p className='font-light text-sm'>Support</p>
			</Link>
		);
	};
	const BlogLink: React.FC<BaseComponent> = ({ className = '' }) => {
		const blogHref = getBlogWebAppRoute({
			includeOrigin: true,
			origin: blogWebAppOrigin,
			queryParams: {},
			routeStaticId: 'BLOG_WEB_APP__/INDEX',
		});
		return (
			<Link className={className} href={blogHref} target='_blank'>
				<p className='font-light text-sm'>Blog</p>
			</Link>
		);
	};
	const LoginButton: React.FC<BaseComponent> = ({ className = '' }) => {
		const loginHref = getSsoWebAppRoute({
			includeOrigin: true,
			origin: ssoWebAppOrigin,
			queryParams: {},
			routeStaticId: 'SSO_WEB_APP__/LOGIN',
		});
		return (
			<Link className={className} href={loginHref} target='_blank'>
				<button>
					<p className='text-gray-500 text-sm'>Login</p>
				</button>
			</Link>
		);
	};
	const RegisterButton: React.FC<BaseComponent> = ({ className = '' }) => {
		const registerHref = getSsoWebAppRoute({
			includeOrigin: true,
			origin: ssoWebAppOrigin,
			queryParams: {},
			routeStaticId: 'SSO_WEB_APP__/REGISTER',
		});
		return (
			<Link className={className} href={registerHref} target='_blank'>
				<button
					className={cn(
						'bg-brand space-x-2 flex items-center rounded-sm px-4 py-1.5',
					)}
				>
					<p className='text-xs text-white font-light'>Create a free account</p>
				</button>
			</Link>
		);
	};
	const LoginLink: React.FC<BaseComponent> = ({ className = '' }) => {
		const loginHref = getSsoWebAppRoute({
			includeOrigin: true,
			origin: ssoWebAppOrigin,
			queryParams: {},
			routeStaticId: 'SSO_WEB_APP__/LOGIN',
		});
		return (
			<Link className={className} href={loginHref} target='_blank'>
				<p className='font-light text-sm'>Login</p>
			</Link>
		);
	};
	const navbarComponents = [
		showHomeLink ? { Component: HomeLink, key: 'Home' } : null,
		{ Component: KnowledgeBaseLink, key: 'Learn' },
		{ Component: SupportLink, key: 'Support' },
		{ Component: BlogLink, key: 'Blog' },
	].filter((x): x is Exclude<typeof x, null> => x != null);

	// ==== Render ==== //
	return (
		<div
			className={cn(
				'border-b border-b-gray-300 dark:border-b-gray-800 flex h-12 items-center justify-between px-6 fixed top-0 left-0 w-full z-10',
				'lg:px-28',
				'bg-white dark:bg-[#020611]',
				className,
			)}
		>
			<div className='flex items-center space-x-6'>
				<LogoButton />
				<div
					className={cn(
						'hidden',
						'lg:flex lg:items-center lg:w-fit lg:space-x-4',
					)}
				>
					{navbarComponents.map(({ Component, key }) => {
						return <Component key={key} />;
					})}
				</div>
			</div>
			<div
				className={cn(
					'hidden',
					'lg:flex lg:items-center lg:w-fit lg:space-x-4',
				)}
			>
				<LoginButton />
				<RegisterButton />
			</div>
			<Sheet>
				<SheetTrigger asChild>
					<div className='lg:hidden'>
						<FiMenu className='text-2xl text-gray-500 dark:text-gray-400 cursor-pointer' />
					</div>
				</SheetTrigger>
				<SheetContent>
					<div className='flex flex-col gap-4'>
						<LogoButton className='mb-4' />
						{navbarComponents.map(({ Component, key }) => {
							return (
								<Fragment key={key}>
									<Component />
									<hr />
								</Fragment>
							);
						})}
						<LoginLink />
						<hr />
						<RegisterButton />
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
