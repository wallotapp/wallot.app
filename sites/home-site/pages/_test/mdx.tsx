import type { NextPage } from 'next';
import { Fragment } from 'react';
import { useIsMounted } from 'ergonomic-react/src/hooks/useIsMounted';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { default as mdxMermaid } from 'mdx-mermaid';
import { serialize } from 'next-mdx-remote/serialize';
import { Prose } from '@wallot/react/src/components/Prose';
import { getMDXComponents } from '@wallot/react/src/components/getMDXComponents';
import { exampleMDXFile } from '@wallot/react/src/utils/exampleMDXFile';

type FrontMatterData = {
	date_published: string;
	parent: string;
	title: string;
};
type FrontMatter = FrontMatterData & { footnoteIds?: string[] };
type PostPageProps = {
	mdx: Omit<MDXRemoteProps, 'components'>;
	scope: FrontMatter;
};
const Page: NextPage<PostPageProps> = ({ mdx, scope }) => {
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
						<MDXRemote
							{...mdx}
							components={getMDXComponents({ frontMatter: scope })}
							scope={scope}
						/>
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
	const mdx = await serialize(mdxContent, {
		mdxOptions: {
			remarkPlugins: [[mdxMermaid, { output: 'svg' }]],
			rehypePlugins: [],
		},
		scope,
	});
	const props: PostPageProps = {
		mdx,
		scope,
	};
	return {
		props,
	};
};
