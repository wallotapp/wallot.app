import path from 'path';
import fs from 'fs';

export const getMDXFileRelativePaths = (rootDir: string): string[] => {
	const treeFilePath = path.join(rootDir, 'tree.json');
	const treeFileString = fs.readFileSync(treeFilePath, 'utf-8');
	return JSON.parse(treeFileString) as string[];
};
