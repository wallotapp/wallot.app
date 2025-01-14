import { MDXRemoteProps } from 'next-mdx-remote';

export type MDXFrontMatterData = {
	date_published: string;
	parent: string;
	title: string;
};
export type MDXFrontMatter = MDXFrontMatterData & { footnoteIds?: string[] };
export type MDXFileScope = MDXFrontMatter & {
	[key: string]: unknown;
};
export type MDXFile = {
	content: string;
	scope: MDXFileScope;
};
export type MDXPageProps = {
	mdx: Omit<MDXRemoteProps<MDXFile['scope']>, 'components'>;
};
