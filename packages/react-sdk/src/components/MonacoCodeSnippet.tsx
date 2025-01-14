import React, { useEffect, useState } from 'react';
import {
	default as MonacoEditor,
	loader as MonacoEditorLoader,
} from '@monaco-editor/react';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import cn from 'ergonomic-react/src/lib/cn';

export type MonacoCodeSnippetProps = BaseComponent & {
	code: string;
	language: string;
	height?: string;
};
export const MonacoCodeSnippet: React.FC<MonacoCodeSnippetProps> = ({
	className = '',
	code,
	language,
	height = '300px',
}) => {
	const [isThemeLoaded, setIsThemeLoaded] = useState(false);

	useEffect(() => {
		if (isThemeLoaded) return;
		return void (async () => {
			const monaco = await MonacoEditorLoader.init();
			type DefineThemeFn = typeof monaco.editor.defineTheme;
			type ThemeArgument = Parameters<DefineThemeFn>[1];
			const data = (await import(
				'monaco-themes/themes/Night Owl.json'
			)) as unknown as {
				base: string;
				inherit: boolean;
				rules: Record<string, unknown>[];
				encodedTokensColors?: string[];
				colors: Record<string, unknown>;
			};
			monaco.editor.defineTheme('NightOwl', data as unknown as ThemeArgument);
			setIsThemeLoaded(true);
		})();
	}, [isThemeLoaded]);

	return (
		<div className={cn('!overflow-hidden !rounded-xl', className)}>
			{isThemeLoaded ? (
				<MonacoEditor
					height={height}
					width='100%'
					defaultLanguage={language}
					value={code}
					theme={'NightOwl'}
					options={{
						fontSize: 10,
						lineDecorationsWidth: 1,
						lineNumbers: 'on',
						minimap: { enabled: false },
						padding: { bottom: 13, top: 13 },
						readOnly: true,
						scrollbar: { vertical: 'hidden' },
						scrollBeyondLastLine: false,
						tabSize: 2,
						wordWrap: 'wordWrapColumn',
						wordWrapColumn: 40,
					}}
				/>
			) : (
				<Skeleton
					style={{
						height,
						width: '100%',
					}}
				/>
			)}
		</div>
	);
};

export const exampleCodeSnippet = `import * as yup from 'yup';

const schema = yup.object().shape({
	name: yup.string().required(),
	age: yup.number().required().positive().integer(),
});

const data = {
	name: 'John Doe',
	age: 30,
};

schema
	.validate(data)
	.then(() => {
		console.log('Data is valid');
	})
	.catch((err) => {
		console.log(err.errors);
	});`;
