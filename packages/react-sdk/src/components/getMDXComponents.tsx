import Image from 'next/image';
import { Mermaid } from 'mdx-mermaid/lib/Mermaid';
import { InlineMath, BlockMath } from 'react-katex';
import { Heading } from '@wallot/react/src/components/Heading';
import { ExLink } from '@wallot/react/src/components/ExternalLink';
import { MonacoCodeSnippet } from '@wallot/react/src/components/MonacoCodeSnippet';

type GetMDXComponentProps = {
	frontMatter: {
		date_published: string;
		parent: string;
		title: string;
	};
};
export function getMDXComponents(_: GetMDXComponentProps) {
	const components: Record<string, T> = {
		BlockMath: BlockMath as T,
		ExLink: ExLink as T,
		Image: Image as unknown as T,
		InlineMath: InlineMath as T,
		Mermaid: Mermaid as T,
		MonacoCodeSnippet: MonacoCodeSnippet as T,
		h1: ((props: U) => <Heading level={1} {...props} />) as T,
		h2: ((props: U) => <Heading level={2} {...props} />) as T,
		h3: ((props: U) => <Heading level={3} {...props} />) as T,
		h4: ((props: U) => <Heading level={4} {...props} />) as T,
		h5: ((props: U) => <Heading level={5} {...props} />) as T,
		h6: ((props: U) => <Heading level={6} {...props} />) as T,
	};
	return components;
}

type T = () => JSX.Element;
type U = { children: string };
