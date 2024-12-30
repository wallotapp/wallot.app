import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from 'ergonomic-react/src/components/ui/dialog';
import Link from 'next/link';
import { DialogClose } from 'ergonomic-react/src/components/ui/dialog';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';

export function ScheduleCallDialog({
	TriggerComponent,
}: BaseComponent & {
	TriggerComponent: React.ReactNode;
}) {
	const scheduleCallUrl = process.env.NEXT_PUBLIC_SCHEDULE_CALL_URL ?? '';

	return (
		<Dialog>
			<DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Let's hop on a call</DialogTitle>
					<DialogDescription>
						Grab time on our calendar to discuss your needs.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='flex !items-center !justify-start !space-x-4'>
					<DialogClose>
						<div
							className={cn(
								'bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100',
								'flex items-center space-x-1',
								'text-center',
							)}
						>
							<p className='text-sm'>Back</p>
						</div>
					</DialogClose>
					<DialogClose>
						<Link href={scheduleCallUrl} target='_blank'>
							<div
								className={cn(
									'bg-black px-4 py-1.5 rounded-md border border-slate-300 hover:bg-gray-700',
									'flex items-center space-x-1',
									'text-center',
								)}
							>
								<p className='text-sm text-white'>Schedule a call</p>
							</div>
						</Link>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
