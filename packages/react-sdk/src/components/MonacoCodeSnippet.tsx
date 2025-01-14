import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

export type MonacoCodeSnippetProps = {
	code: string;
	language: string;
	height?: string;
	className?: string;
};
export const MonacoCodeSnippet: React.FC<MonacoCodeSnippetProps> = ({
	code,
	language,
	height = '300px',
	className = '',
}) => {
	const editorContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!editorContainerRef.current) return;

		const editor = monaco.editor.create(editorContainerRef.current, {
			value: code,
			language,
			readOnly: true,
			scrollBeyondLastLine: false,
			minimap: { enabled: false },
		});

		return () => {
			editor.dispose();
		};
	}, [code, language]);

	return (
		<div ref={editorContainerRef} style={{ height }} className={className} />
	);
};
