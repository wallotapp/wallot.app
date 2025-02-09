import { MDXPageProps } from '@wallot/react/src/types/MDXTypes';
import { Prose } from '@wallot/react/src/components/Prose';
import { getMDXComponents } from '@wallot/react/src/components/getMDXComponents';
import { MDXRemote } from 'next-mdx-remote';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PageHeader } from '@wallot/react/src/components/PageHeader';
import { Heading } from '@wallot/react/src/components/Heading';

export function MDXPage({ mdx }: MDXPageProps) {
	return (
		<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
			<PageHeader />
			<div
				className={cn(
					'min-h-[95vh] w-full scroll-smooth',
					'py-28 px-6',
					'lg:py-28 lg:px-28',
				)}
			>
				<div className='lg:max-w-3xl lg:mx-auto'>
					<Prose>
						<div className='text-center mb-7'>
							<Heading level={1}>{mdx.scope.title}</Heading>
						</div>
						<MDXRemote {...mdx} components={getMDXComponents(mdx.scope)} />
					</Prose>
				</div>
			</div>
		</div>
	);
}
