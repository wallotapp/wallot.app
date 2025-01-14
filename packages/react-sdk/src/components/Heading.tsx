export type HeadingProps = { level: number; children: string };
export const Heading: React.FC<HeadingProps> = ({ level, children }) => {
	const id = children.replace(/\s+/g, '-').toLowerCase();
	const styles = {
		1: 'text-6xl font-semibold pr-8',
		2: '',
		3: '',
		4: '',
		5: '',
		6: '',
	} as Record<number, string>;
	const getTextComponent = () =>
		({
			1: (
				<h1 id={id} className={styles[level]}>
					{children}
				</h1>
			),
			2: (
				<h2 id={id} className={styles[level]}>
					{children}
				</h2>
			),
			3: (
				<h3 id={id} className={styles[level]}>
					{children}
				</h3>
			),
			4: (
				<h4 id={id} className={styles[level]}>
					{children}
				</h4>
			),
			5: (
				<h5 id={id} className={styles[level]}>
					{children}
				</h5>
			),
			6: (
				<h6 id={id} className={styles[level]}>
					{children}
				</h6>
			),
		}[level as 1 | 2 | 3 | 4 | 5 | 6]);

	return <>{getTextComponent()}</>;
};
