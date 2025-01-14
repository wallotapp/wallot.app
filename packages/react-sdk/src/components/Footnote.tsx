import { Fragment } from 'react';

export function getFootnoteComponents(footnoteIds: string[]) {
	if (!Array.isArray(footnoteIds) || footnoteIds.length === 0) {
		return { Footnote: () => <Fragment />, Footnotes: () => <Fragment /> };
	}

	return {
		Footnote: getFootnoteComponent(footnoteIds) as T,
		Footnotes: getFootnotesComponent(footnoteIds) as T,
	};
}

type T = () => JSX.Element;

function getFootnotePos({
	footnoteIds,
	id,
}: {
	footnoteIds: string[];
	id: string;
}) {
	const i = footnoteIds.findIndex((k) => k === id);
	if (i === -1) {
		const log = { footnoteIds, id };
		console.error('footnote error:', log);
		return -1;
	}
	return i + 1;
}

type FootnoteProps = {
	id: string;
};
function getFootnoteComponent(footnoteIds: string[]) {
	return function ({ id }: FootnoteProps): JSX.Element {
		return (
			<a
				href={`#details-${id}`}
				id={`footnote-${id}`}
				style={{ textDecoration: 'none' }}
			>
				<sup>{getFootnotePos({ footnoteIds, id })}</sup>
			</a>
		);
	};
}

type FootnotesProps = {
	[key: string]: string | React.ReactNode;
};
function getFootnotesComponent(footnoteIds: string[]) {
	return function ({ ...footnotes }: FootnotesProps): JSX.Element {
		const left_padding = <div>&nbsp;&nbsp;&nbsp;</div>;
		if (Object.keys(footnotes || {}).find((k) => !footnoteIds.includes(k))) {
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
					{footnoteIds.map((id) => {
						const note = footnotes[id];
						if (!note) {
							const log = { footnotes, footnoteIds, id };
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
										^{getFootnotePos({ footnoteIds, id })}
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
