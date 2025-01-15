import { MDXFile } from '@wallot/react/src/types/MDXTypes';
import { getMDXFileRelativePaths } from '@wallot/react/src/utils/getMDXFileRelativePaths';
import { getMDXFile } from '@wallot/react/src/utils/getMDXFile';

export const getMDXFiles = (rootDir: string): MDXFile[] =>
	getMDXFileRelativePaths(rootDir).map((relativeFilePath) =>
		getMDXFile(rootDir, relativeFilePath),
	);
