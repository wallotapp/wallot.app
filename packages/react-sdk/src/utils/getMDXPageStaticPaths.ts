import { GetStaticPaths } from 'next';
import { getMDXFileRelativePaths } from '@wallot/react/src/utils/getMDXFileRelativePaths';
import { ParsedUrlQuery } from 'querystring';

export function getMDXPageStaticPaths(
	rootDir: string,
	getParsedUrlQuery: (relativeFilePath: string) => ParsedUrlQuery,
): GetStaticPaths {
	return async () => {
		const relativeFilePaths = getMDXFileRelativePaths(rootDir);
		return {
			paths: relativeFilePaths.map((relativeFilePath) => ({
				params: getParsedUrlQuery(relativeFilePath),
			})),
			fallback: false,
		};
	};
}
