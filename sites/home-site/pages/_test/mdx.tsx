import type { NextPage } from 'next';
import { Fragment } from 'react';
import { useIsMounted } from 'ergonomic-react/src/hooks/useIsMounted';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { default as mdxMermaid } from 'mdx-mermaid';
import { serialize } from 'next-mdx-remote/serialize';
import { Prose } from '@wallot/react/src/components/Prose';
import { getMDXComponents } from '@wallot/react/src/components/getMDXComponents';

type PostPageProps = {
	frontMatter: {
		date_published: string;
		parent: string;
		title: string;
	};
	mdx: Omit<MDXRemoteProps, 'components'>;
};
const Page: NextPage<PostPageProps> = ({ frontMatter, mdx }) => {
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
	const mdxFile = {
		content: `---
date_published: "2025-01-13T00:00:00.000Z"
parent: ""
title: "Hello world, this is a blog!"
---

# Hello world, this is a blog!

What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, when an
unknown printer took a galley of type and scrambled it to make a
type specimen book. 

It has survived not only five centuries, but
also the leap into **electronic typesetting**, remaining essentially
unchanged. It was popularised in the 1960s with the release of
Letraset sheets containing Lorem Ipsum passages, and more recently
with desktop publishing software like Aldus.

## Images

<Image
  className="rounded-md"
  src="/img/brand/og-image-black-background.png"
  layout="responsive"
  width={1024}
  height={538}
  alt="Brand image"
  priority
/>

## Links

<ExLink href="https://www.pcisecuritystandards.org/">PCI DSS</ExLink> (Payment Card
Industry Data Security Standard) is a set of security standards designed to ensure
that all companies that accept, process, store, or transmit [credit card](https://en.wikipedia.org/wiki/Credit_card)
information maintain a secure environment.

## Lists

Here are the best bands ever:

- The Beatles
- The Rolling Stones
- Led Zeppelin
- The Who

Here are the steps to bake a cake:

1. Preheat the oven
2. Mix the ingredients
3. Bake the cake
4. Enjoy!

`,
		frontMatter: {
			date_published: '2025-01-13T00:00:00.000Z',
			parent: '',
			title: 'Hello world, this is a blog!',
		},
	};
	const mdxContent = await serialize(mdxFile.content.split('---').pop() ?? '', {
		mdxOptions: {
			remarkPlugins: [[mdxMermaid, { output: 'svg' }]],
			rehypePlugins: [],
		},
		scope: mdxFile.frontMatter,
	});
	const props = {
		frontMatter: mdxFile.frontMatter,
		mdx: mdxContent,
	};
	return {
		props,
	};
};
