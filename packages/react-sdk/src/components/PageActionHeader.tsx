import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { getHomeSiteRoute } from '@wallot/js';
import Link from 'next/link';
import { GoChevronRight } from 'react-icons/go';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';

export type PageActionHeaderProps = BaseComponent;
export function PageActionHeader({ className = '' }: PageActionHeaderProps) {
	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();
	return (
		<div
			className={cn(
				'h-10 items-center justify-between px-6 fixed top-12 left-0 w-full z-10',
				'lg:px-28',
				'bg-brand-dark',
				'hidden md:flex',
				className,
			)}
		>
			<div className='flex items-center space-x-1'>
				<div
					className={cn(
						'flex items-center space-x-2',
						'bg-black py-0.5 px-2.5 rounded-full',
					)}
				>
					<p className='font-light text-xs text-white'>New</p>
				</div>
				<div>
					<p className='font-light text-xs text-white'>
						Introducing Wallot's brand new digital trading platform powered by
						AI
					</p>
				</div>
			</div>
			<div className='flex items-center space-x-3'>
				<Link
					href={getHomeSiteRoute({
						includeOrigin: SITE_ORIGIN !== siteOriginByTarget.HOME_SITE,
						origin: siteOriginByTarget.HOME_SITE,
						queryParams: {},
						routeStaticId: 'HOME_SITE__/ACCOUNT/OVERVIEW',
					})}
					target={
						SITE_ORIGIN !== siteOriginByTarget.HOME_SITE ? '_blank' : '_self'
					}
				>
					<div className='bg-black py-1.5 pl-3 pr-2 rounded-sm flex items-center space-x-1'>
						<div>
							<p className='text-xs text-white dark:text-brand'>Learn more</p>
						</div>
						<div>
							<GoChevronRight className='text-white dark:text-brand text-sm' />
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
