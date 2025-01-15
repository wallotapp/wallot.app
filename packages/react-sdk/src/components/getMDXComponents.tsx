import Image from 'next/image';
import { Mermaid } from 'mdx-mermaid/lib/Mermaid';
import { InlineMath, BlockMath } from 'react-katex';
import { Heading } from '@wallot/react/src/components/Heading';
import { ExLink } from '@wallot/react/src/components/ExternalLink';
import { LoomVideo } from '@wallot/react/src/components/LoomVideo';
import { MonacoCodeSnippet } from '@wallot/react/src/components/MonacoCodeSnippet';
import '@wallot/react/src/config/mermaidConfig';
import { getFootnoteComponents } from '@wallot/react/src/components/Footnote';
import { MDXFileScope } from '@wallot/react/src/types/MDXTypes';

export function getMDXComponents(scope: MDXFileScope) {
	const { footnoteIDs = [] } = scope || {};
	const components = {
		BlockMath,
		ExLink,
		Image,
		InlineMath,
		LoomVideo,
		Mermaid,
		MonacoCodeSnippet,
		h1: (props: U) => <Heading level={1} {...props} />,
		h2: (props: U) => <Heading level={2} {...props} />,
		h3: (props: U) => <Heading level={3} {...props} />,
		h4: (props: U) => <Heading level={4} {...props} />,
		h5: (props: U) => <Heading level={5} {...props} />,
		h6: (props: U) => <Heading level={6} {...props} />,
		...getFootnoteComponents(footnoteIDs),
	} as unknown as Record<string, T>;

	return components;
}

type T = () => JSX.Element;
type U = { children: string };
