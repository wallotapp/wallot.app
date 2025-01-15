import {
	MDXPageProps,
	MDXFileScope,
	MDXFile,
} from '@wallot/react/src/types/MDXTypes';
import { default as mdxMermaid } from 'mdx-mermaid';
import { serialize } from 'next-mdx-remote/serialize';

export async function getMDXPageProps({
	content,
	scope,
}: MDXFile): Promise<MDXPageProps> {
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
	return props;
}
