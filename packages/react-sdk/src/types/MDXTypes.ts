import { ParsedUrlQuery } from 'querystring';
import { MDXRemoteProps } from 'next-mdx-remote';

export type MDXFrontMatter = {
	date_published: string;
	thumbnail: string;
	title: string;
};
export type MDXFileScope = MDXFrontMatter & {
	footnoteIDs: string[];
	relativeFilePath: string;
	[key: string]: unknown;
};
export type MDXFile = {
	content: string;
	scope: MDXFileScope;
};
export type MDXPageProps = {
	mdx: Omit<MDXRemoteProps<MDXFile['scope']>, 'components'>;
};
export type MDXPageContextProps<
	T extends {
		slug: string;
	} = {
		slug: string;
	},
> = ParsedUrlQuery & T;
