import { BaseComponentWithChildren } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';

export type OnboardingCardProps = BaseComponentWithChildren & {
	step: 0 | 1;
	subtitle: string;
	title: string;
};
export const OnboardingCard: React.FC<OnboardingCardProps> = ({
	children,
	step,
	subtitle,
	title,
}) => {
	return (
		<div
			className={cn(
				'bg-white border border-gray-200 rounded-md shadow-lg flex flex-col items-center justify-evenly pt-24 pb-14 px-8 mx-auto relative',
				'w-full',
				'md:w-[28rem]',
			)}
		>
			<div className='absolute top-12 flex justify-center mb-8 space-x-5'>
				<div className='w-16 h-2 rounded-md bg-brand'></div>
				<div
					className={cn(
						'w-16 h-2 rounded-md',
						step === 0 ? 'bg-gray-200' : 'bg-brand',
					)}
				></div>
			</div>
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
	);
};
