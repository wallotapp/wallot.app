import { default as cn } from 'ergonomic-react/src/lib/cn';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';

export function ApplicationDashboardPageSuspense({ length = 5 }) {
	return (
		<div className='flex flex-col space-y-7'>
			{Array.from({ length }).map((_, i) =>
				i % 3 === 0 ? (
					<div key={i} className='flex space-x-4'>
						<Skeleton
							className={cn(
								'bg-slate-300 h-20',
								i % 2 === 0 ? 'flex-[2_2_0%]' : 'flex-1',
							)}
						/>
						<Skeleton
							className={cn(
								'bg-slate-300 h-20',
								i % 2 === 0 ? 'flex-1' : 'flex-[4_4_0%]',
							)}
						/>
					</div>
				) : (
					<Skeleton key={i} className='bg-slate-300 h-28' />
				),
			)}
		</div>
	);
}
