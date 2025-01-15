import { Fragment } from 'react';

export function getFootnoteComponents(footnoteIDs: string[]) {
	if (!Array.isArray(footnoteIDs) || footnoteIDs.length === 0) {
		return { Footnote: () => <Fragment />, Footnotes: () => <Fragment /> };
	}

	return {
		Footnote: getFootnoteComponent(footnoteIDs) as T,
		Footnotes: getFootnotesComponent(footnoteIDs) as T,
	};
}

type T = () => JSX.Element;

function getFootnotePos({
	footnoteIDs,
	id,
}: {
	footnoteIDs: string[];
	id: string;
}) {
	const i = footnoteIDs.findIndex((k) => k === id);
	if (i === -1) {
		const log = { footnoteIDs, id };
		console.error('footnote error:', log);
		return -1;
	}
	return i + 1;
}

type FootnoteProps = {
	id: string;
};
function getFootnoteComponent(footnoteIDs: string[]) {
	return function ({ id }: FootnoteProps): JSX.Element {
		return (
			<a
				href={`#details-${id}`}
				id={`footnote-${id}`}
				style={{ textDecoration: 'none' }}
			>
				<sup>{getFootnotePos({ footnoteIDs, id })}</sup>
			</a>
		);
	};
}

type FootnotesProps = {
	[key: string]: string | React.ReactNode;
};
function getFootnotesComponent(footnoteIDs: string[]) {
	return function ({ ...footnotes }: FootnotesProps): JSX.Element {
		const left_padding = <div>&nbsp;&nbsp;&nbsp;</div>;
		if (Object.keys(footnotes || {}).find((k) => !footnoteIDs.includes(k))) {
			return <div></div>;
		}
		return (
			<div>
				<p>
					<strong>Notes</strong>
				</p>
				<div
					style={{
						fontSize: 'xx-small',
						width: '50%',
					}}
				>
					{footnoteIDs.map((id) => {
						const note = footnotes[id];
						if (!note) {
							const log = { footnotes, footnoteIDs, id };
							throw new Error(
								`footnote error: ${JSON.stringify(log, null, '\t')}`,
							);
						}
						return (
							<div className='mt-1' key={id} id={`details-${id}`}>
								<div style={{ display: 'inline-flex' }}>
									<a
										href={`#footnote-${id}`}
										style={{ textDecoration: 'none' }}
									>
										^{getFootnotePos({ footnoteIDs, id })}
									</a>
									{left_padding}
									{note}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};
}
