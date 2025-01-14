import type { NextPage } from 'next';
import { Fragment } from 'react';
import { useIsMounted } from 'ergonomic-react/src/hooks/useIsMounted';
import { MDXRemote } from 'next-mdx-remote';
import { default as mdxMermaid } from 'mdx-mermaid';
import { serialize } from 'next-mdx-remote/serialize';
import { Prose } from '@wallot/react/src/components/Prose';
import { getMDXComponents } from '@wallot/react/src/components/getMDXComponents';
import { exampleMDXFile } from '@wallot/react/src/utils/exampleMDXFile';
import { MDXPageProps, MDXFileScope } from '@wallot/react/src/types/MDXTypes';

const Page: NextPage<MDXPageProps> = ({ mdx }) => {
	const isMounted = useIsMounted();

	if (!isMounted) {
		return null;
	}

	return (
		<Fragment>
			<div className='p-10'>
				<div>
					<p>Here's some MDX</p>
				</div>
				<div className='mt-4 max-w-3xl mx-auto'>
					<Prose>
						<MDXRemote {...mdx} components={getMDXComponents(mdx.scope)} />
					</Prose>
				</div>
				<div>Let us know if you like it!</div>
			</div>
		</Fragment>
	);
};

export default Page;

export const getStaticProps = async () => {
	const mdxContent = exampleMDXFile.content.split('---').pop() ?? '';
	const regex = /<Footnote\s+id="\w+"\s+\/>/g;
	const footnoteMatches = mdxContent.match(regex) || [];
	const footnoteIds = footnoteMatches.map((match) =>
		match.replace('<Footnote id="', '').replace('" />', ''),
	);
	exampleMDXFile.scope.footnoteIds = footnoteIds;
	const { scope } = exampleMDXFile;
	const mdx = await serialize<MDXFileScope>(mdxContent, {
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
