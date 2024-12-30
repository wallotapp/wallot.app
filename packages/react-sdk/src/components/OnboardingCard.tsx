import { Fragment } from 'react';
import { BaseComponentWithChildren } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PlatformLogo } from 'ergonomic-react/src/components/brand/PlatformLogo';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';

export type OnboardingCardProps = BaseComponentWithChildren & {
	step: 0 | 1 | null;
	subtitle: string;
	title: string;
};
export function OnboardingCard({
	children,
	step,
	subtitle,
	title,
}: OnboardingCardProps) {
	return (
		<Fragment>
			<div className='mb-10 flex items-center justify-center'>
				{OPEN_GRAPH_CONFIG.siteBrandLogoDarkMode &&
					OPEN_GRAPH_CONFIG.siteBrandLogoLightMode && (
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
				{!(
					OPEN_GRAPH_CONFIG.siteBrandLogoDarkMode &&
					OPEN_GRAPH_CONFIG.siteBrandLogoLightMode
				) && (
					<div>
						<p className={cn('text-2xl font-bold', 'lg:text-3xl')}>
							{OPEN_GRAPH_CONFIG.siteName}
						</p>
					</div>
				)}
			</div>
			<div
				className={cn(
					'bg-white border border-gray-200 rounded-md shadow-lg flex flex-col items-center justify-evenly py-14 px-8 mx-auto relative',
					'w-full',
					'md:w-[28rem]',
				)}
			>
				{step !== null && (
					<div className='flex justify-center mb-8 space-x-5'>
						<div className='w-16 h-2 rounded-md bg-brand'></div>
						<div
							className={cn(
								'w-16 h-2 rounded-md',
								step === 0 ? 'bg-gray-200' : 'bg-brand',
							)}
						></div>
					</div>
				)}
				<div className='text-center max-w-[75%] mx-auto'>
					<div className=''>
						<p className='font-semibold text-xl'>{title}</p>
					</div>
					<div className='mt-1 text-center'>
						<p className='text-gray-400 text-base'>{subtitle}</p>
					</div>
				</div>

				<div className={cn('mt-4 w-full', 'md:w-80')}>{children}</div>
			</div>
		</Fragment>
	);
}
