import React, { useEffect, useState } from 'react';
import {
	default as MonacoEditor,
	loader as MonacoEditorLoader,
} from '@monaco-editor/react';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import cn from 'ergonomic-react/src/lib/cn';
import { loadNightOwl } from '@wallot/react/src/config/monacoConfig';
import { GoCopy } from 'react-icons/go';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';

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
	const { toast } = useToast();

	useEffect(() => {
		if (isThemeLoaded) return;
		return void loadNightOwl(MonacoEditorLoader, setIsThemeLoaded);
	}, [isThemeLoaded]);

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		toast({
			title: 'Success',
			description: 'Code copied to clipboard',
		});
	};

	return (
		<div className={cn('!overflow-hidden !rounded-xl', className)}>
			<div className='flex items-center justify-between px-4 py-2 bg-black text-gray-200 text-sm font-medium rounded-t-xl'>
				<span className=''>{language}</span>
				<div>
					<button
						onClick={handleCopy}
						className='flex items-center space-x-1 text-gray-200 hover:text-gray-50 focus:outline-none focus:ring focus:ring-blue-400 rounded transition'
					>
						<GoCopy className='w-4 h-4' />
						<span>Copy</span>
					</button>
				</div>
			</div>
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
