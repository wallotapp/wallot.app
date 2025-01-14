import Image from 'next/image';
import { Mermaid } from 'mdx-mermaid/lib/Mermaid';
import { InlineMath, BlockMath } from 'react-katex';
import { Heading } from '@wallot/react/src/components/Heading';
import { ExLink } from '@wallot/react/src/components/ExternalLink';
import { MonacoCodeSnippet } from '@wallot/react/src/components/MonacoCodeSnippet';
import '@wallot/react/src/config/mermaidConfig';

type GetMDXComponentProps = {
	frontMatter: {
		date_published: string;
		parent: string;
		title: string;
	};
};
export function getMDXComponents(_: GetMDXComponentProps) {
	const components = {
		BlockMath,
		ExLink,
		Image,
		InlineMath,
		Mermaid,
		MonacoCodeSnippet,
		h1: (props: U) => <Heading level={1} {...props} />,
		h2: (props: U) => <Heading level={2} {...props} />,
		h3: (props: U) => <Heading level={3} {...props} />,
		h4: (props: U) => <Heading level={4} {...props} />,
		h5: (props: U) => <Heading level={5} {...props} />,
		h6: (props: U) => <Heading level={6} {...props} />,
	} as unknown as Record<string, T>;
	return components;
}

type T = () => JSX.Element;
type U = { children: string };
