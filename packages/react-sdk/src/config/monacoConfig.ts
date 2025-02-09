import { loader } from '@monaco-editor/react';

export const loadNightOwl = async (
	MonacoEditorLoader: typeof loader,
	setIsThemeLoaded: React.Dispatch<React.SetStateAction<boolean>>,
) => {
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
};
