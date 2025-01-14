import type { NextPage } from 'next';
import { Fragment } from 'react';
import { useIsMounted } from 'ergonomic-react/src/hooks/useIsMounted';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { default as mdxMermaid } from 'mdx-mermaid';
import { serialize } from 'next-mdx-remote/serialize';
import { Prose } from '@wallot/react/src/components/Prose';
import { getMDXComponents } from '@wallot/react/src/components/getMDXComponents';
import { exampleCodeSnippet } from '@wallot/react/src/utils/exampleCodeSnippet';
import { exampleMDXFile } from '@wallot/react/src/utils/exampleMDXFile';

type FrontMatterData = {
	date_published: string;
	parent: string;
	title: string;
};
type FrontMatter = FrontMatterData & { footnoteIds?: string[] };
type PostPageProps = {
	frontMatter: FrontMatter;
	mdx: Omit<MDXRemoteProps, 'components'>;
	scope: Record<string, unknown>;
};
const Page: NextPage<PostPageProps> = ({ frontMatter, mdx, scope }) => {
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
							components={getMDXComponents({ frontMatter })}
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
	exampleMDXFile.frontMatter.footnoteIds = footnoteIds;
	const mdx = await serialize(mdxContent, {
		mdxOptions: {
			remarkPlugins: [[mdxMermaid, { output: 'svg' }]],
			rehypePlugins: [],
		},
		scope: exampleMDXFile.frontMatter,
	});
	const props: PostPageProps = {
		frontMatter: exampleMDXFile.frontMatter,
		mdx,
		scope: { exampleCodeSnippet },
	};
	return {
		props,
	};
};
