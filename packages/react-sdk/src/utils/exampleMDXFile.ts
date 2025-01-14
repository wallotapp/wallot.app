type FrontMatterData = {
	date_published: string;
	parent: string;
	title: string;
};
type FrontMatter = FrontMatterData & { footnoteIds?: string[] };
type MDXFile = { content: string; frontMatter: FrontMatter };
export const exampleMDXFile: MDXFile = {
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

## Code

<MonacoCodeSnippet
  code={exampleCodeSnippet}
  language="javascript"
/>

## Charts with Mermaid

Fuse cutouts and reclosers work together to protect the distribution system from faults, disconnecting the faulty section while allowing the rest of the system to remain operational.

<Mermaid
  chart={\`
  graph TD;
    A[Distribution Transformer] --> B[Feeder];
    B --> C[Main and Laterals];\`}
/>

## Footnotes

1. **Acetylcholine**: This neurotransmitter plays key roles in muscle movement, memory, and other functions.<Footnote id="acetylcholine" />
2. **Dopamine**: This neurotransmitter is associated with pleasure and addiction. It is also vital for motor control.<Footnote id="dopamine" />
3. **Norepinephrine**: Often called the 'stress' neurotransmitter, norepinephrine affects attention and response actions.<Footnote id="norepinephrine" />
4. **Serotonin**: This neurotransmitter helps regulate mood, appetite, and sleep.<Footnote id="serotonin" />
5. **GABA**: GABA is the primary neurotransmitter responsible for inhibitory functions in the brain.<Footnote id="gaba" />
6. **Glutamate**: As the main excitatory neurotransmitter, Glutamate assists in memory and learning.<Footnote id="glutamate" />
7. **Endorphins**: Often referred to as natural painkillers, Endorphins interact with the opiate receptors in the brain to reduce the sensation of pain.<Footnote id="endorphins" />

## Mathematical Representation

Mathematically, the model for a purely nested design can be written as:

<BlockMath math="y_{ij} = \\mu + \\alpha_i + \\beta_{j(i)} + \\epsilon_{ij}" />

Let's take an urn analogy as an example. Suppose, we have <InlineMath math="n" /> urns and each urn <InlineMath math="i" /> has <InlineMath math="m_i" /> balls. Then the number of ways to choose a specific ball from a specific urn can be computed as:

<BlockMath math="N = \sum_{i=1}^n m_i" />

## Conclusion

Thanks for reading.

<hr />

<Footnotes
  acetylcholine={(
		<div>
			Acetylcholine is the first neurotransmitter to be discovered, playing
			crucial roles in both the peripheral and central nervous systems.
		</div>
	)}
	dopamine={(
		<div>
			Dopamine is often linked with reward-driven behavior and motivation.
		</div>
	)}
	norepinephrine={(
		<div>
			Norepinephrine arousal and alertness levels, particularly during
			stressful situations.
		</div>
	)}
	serotonin={(
		<div>
			Serotonin's role in mood regulation has linked it to several mental
			health disorders, including depression and anxiety.
		</div>
	)}
	gaba={(
		<div>
			GABA counters excitatory actions, helping to maintain a balance of
			neural activity in the brain.
		</div>
	)}
	glutamate={(
		<div>
			Glutamate is involved in a variety of cognitive functions, but an excess
			can be neurotoxic.
		</div>
	)}
	endorphins={(
		<div>
			Endorphins have a similar structure to opiates and can lead to feelings
			of euphoria.
		</div>
	)}
/>
  `,
	frontMatter: {
		date_published: '2025-01-13T00:00:00.000Z',
		parent: '',
		title: 'Hello world, this is a blog!',
	},
};
