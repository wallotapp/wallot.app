import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';
import {
	MDXFile,
	MDXFileScope,
	MDXFrontMatter,
} from '@wallot/react/src/types/MDXTypes';

export const getMDXFile = (
	rootDir: string,
	relativeFilePath: string,
): MDXFile => {
	const docSource = fs.readFileSync(
		path.join(rootDir, relativeFilePath),
		'utf-8',
	);

	const { data, content } = matter(docSource);
	const frontMatter = data as MDXFrontMatter;
	const regex = /<Footnote\s+id="\w+"\s+\/>/g;
	const footnoteMatches = content.match(regex) || [];
	const footnoteIDs = footnoteMatches.map((match) =>
		match.replace('<Footnote id="', '').replace('" />', ''),
	);
	const scope: MDXFileScope = { ...frontMatter, footnoteIDs, relativeFilePath };

	return {
		content,
		scope,
	};
};
