import path from 'path';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { getMDXFileRelativePaths } from '@wallot/react/src/utils/getMDXFileRelativePaths';
import { getMDXFiles } from '@wallot/react/src/utils/getMDXFiles';
import {
	MDXPageProps,
	MDXPageContextProps,
	MDXFileScope,
} from '@wallot/react/src/types/MDXTypes';
import { default as mdxMermaid } from 'mdx-mermaid';
import { serialize } from 'next-mdx-remote/serialize';
import { Prose } from '@wallot/react/src/components/Prose';
import { getMDXComponents } from '@wallot/react/src/components/getMDXComponents';
import { MDXRemote } from 'next-mdx-remote';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PageHeader } from '@wallot/react/src/components/PageHeader';
import { Heading } from '@wallot/react/src/components/Heading';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'BLOG_SITE__/ARTICLE/[SLUG]' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Content',
};

const Page: NextPage<MDXPageProps> = ({ mdx }) => {
	// ==== Constants ==== //

	// Slug
	const slug = mdx.scope.relativeFilePath.replace('.mdx', '');

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace('[SLUG]', slug);

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
		title: mdx.scope.title,
		...(mdx.scope.thumbnail
			? {
					thumbnailData: {
						thumbnail: mdx.scope.thumbnail,
						thumbnailAlt: mdx.scope.title,
						thumbnailHeight: 1260,
						thumbnailType: 'image/jpg',
						thumbnailWidth: '2240',
					},
			  }
			: {}),
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
				<PageHeader showHomeLink={false} />
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
		</PageComponent>
	);
};

const cwd = process.cwd();
const rootDir = path.join(cwd, '../../../wallot-cms/mdx/blog-site/article');
export const getStaticPaths: GetStaticPaths = async () => {
	const relativeFilePaths = getMDXFileRelativePaths(rootDir);
	return {
		paths: relativeFilePaths.map((relativeFilePath) => ({
			params: { slug: relativeFilePath.replace('.mdx', '') },
		})),
		fallback: false,
	};
};
export const getStaticProps: GetStaticProps<
	MDXPageProps,
	MDXPageContextProps
> = async (context) => {
	const { slug } = context.params ?? {};
	const files = getMDXFiles(rootDir);
	const file = files.find(
		({ scope: { relativeFilePath } }) =>
			relativeFilePath.replace('.mdx', '') === slug,
	);
	if (file == null) return { notFound: true };

	const { content, scope } = file;
	const mdx = await serialize<MDXFileScope>(content, {
		mdxOptions: {
			remarkPlugins: [[mdxMermaid, { output: 'svg' }]],
			rehypePlugins: [],
		},
		scope,
	});
	const props: MDXPageProps = {
		mdx,
	};
	return {
		props,
	};
};

export default Page;
