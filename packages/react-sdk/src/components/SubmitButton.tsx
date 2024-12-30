import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { Button } from 'ergonomic-react/src/components/ui/button';
import { default as cn } from 'ergonomic-react/src/lib/cn';

export type SubmitButtonProps = BaseComponent & {
	isSubmitting: boolean;
	text?: string;
	textClassName?: string;
	type?: 'submit' | 'button';
};
export function SubmitButton({
	className = '',
	isSubmitting,
	text = 'Continue',
	textClassName = '',
	type = 'submit',
}: SubmitButtonProps) {
	return (
		<Button className={className} disabled={isSubmitting} type={type}>
			<div>
				{isSubmitting ? (
					<>
						<div className='flex items-center justify-center space-x-2 min-w-16'>
							<div
								className={cn(
									'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
									'border-t-brand border-r-brand border-b-brand',
								)}
							></div>
						</div>
					</>
				) : (
					<p className={cn('text-base font-medium', textClassName)}>{text}</p>
				)}
			</div>
		</Button>
	);
}
