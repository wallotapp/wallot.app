import { default as cn } from 'ergonomic-react/src/lib/cn';
import { FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

export type ChangeAuthenticationRouteProps = {
	oppositeRoute: string;
	text: string;
};
export function ChangeAuthenticationRoute({
	oppositeRoute,
	text,
}: ChangeAuthenticationRouteProps) {
	return (
		<div className='flex flex-col items-center justify-center w-fit py-16 px-8 mx-auto'>
			<div>
				<Link href={oppositeRoute}>
					<div
						className={cn(
							'flex items-center space-x-0.5 cursor-pointer',
							'text-base',
						)}
					>
						<p className='font-medium text-base text-brand-light'>{text}</p>
						<FiChevronRight className='mt-0.5 stroke-[3px] text-brand-light' />
					</div>
				</Link>
			</div>
		</div>
	);
}
