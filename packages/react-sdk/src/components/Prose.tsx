import { default as cn } from 'ergonomic-react/src/lib/cn';
import { BaseComponentWithChildren } from 'ergonomic-react/src/types/BaseComponentTypes';

export const Prose: React.FC<BaseComponentWithChildren> = ({ children }) => {
	return (
		<div
			className={cn(
				'max-w-none prose hover:prose-a:opacity-90 prose-code:rounded prose-code:px-1 prose-code:font-medium',
				'prose-a:text-indigo-600 prose-a:hover:text-indigo-800 prose-a:no-underline prose-a:hover:no-underline',
				'dark:prose-invert dark:prose-a:text-indigo-400 dark:prose-a:hover:text-indigo-300',
				'prose-p:py-0',
				'prose-p:my-3',
				'prose-p:leading-snug',
				'prose-h6:py-0',
				'prose-h6:my-0.5',
				'prose-h5:py-0',
				'prose-h5:my-1.5',
				'prose-h4:py-0',
				'prose-h4:my-2',
				'prose-h3:py-0',
				'prose-h3:my-2.5',
				'prose-h2:py-0',
				'prose-h2:my-4',
				'prose-h1:py-0',
				'prose-h1:my-5',
				'prose-ul:py-0',
				'prose-ul:my-0',
				'prose-li:py-0',
				'prose-li:my-1',
				'prose-li:leading-snug',
			)}
		>
			{children}
		</div>
	);
};
