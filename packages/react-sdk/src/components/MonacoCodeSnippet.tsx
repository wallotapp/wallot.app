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
