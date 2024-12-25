import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { getBlogSiteRoute } from '@wallot/js';
import Link from 'next/link';
import { GoChevronRight } from 'react-icons/go';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export type PageActionHeaderProps = BaseComponent;
export const PageActionHeader: React.FC<PageActionHeaderProps> = ({
	className = '',
}) => {
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
					href={getBlogSiteRoute({
						includeOrigin: true,
						origin: siteOriginByTarget['BLOG_SITE'],
						queryParams: {},
						routeStaticId: 'BLOG_SITE__/INDEX',
					})}
					target='_blank'
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
};
