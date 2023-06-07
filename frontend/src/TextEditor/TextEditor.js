import React, { useEffect, useMemo, useState } from 'react';
import '@uiw/react-textarea-code-editor/dist.css';
import http from '../http-common';
import CodeEditor from '@uiw/react-textarea-code-editor';

function TextEditor(props) {
	const [code, setCode] = useState();
	const [fileExtension, setFileExtension] = useState('');

	const fileExtensions = [
		'txt',
		'sql',
		'c',
		'cpp',
		'html',
		'css',
		'js',
		'php',
		'ts',
		'java',
	];

	useEffect(() => {
		let path = props.activeFile;
		var fileExtension = '';
		fileExtension = path.split('.').pop();

		setFileExtension(fileExtension);

		console.log(path);
		console.log(fileExtension);

		if (path !== '' && path !== undefined && path !== null && fileExtension) {
			if (fileExtensions.indexOf(fileExtension) !== -1) {
				console.log('path ada');
				http
					.post('/read-file', {
						file: path,
					})
					.then((data) => setCode(data.data.content));
			} else {
				console.log('file is not supported');
			}
			// console.log(fileExtension);
		} else {
			console.log('path ga ada ');
			setCode('Please click a file');
		}
	}, [props.activeFile]);

	return (
		<CodeEditor
			value={code}
			language={fileExtension}
			placeholder={'Please choose a file'}
			onChange={(evn) => setCode(evn.target.value)}
			padding={15}
			style={{
				fontSize: 12,
				backgroundColor: '#f5f5f5',
				fontFamily:
					'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
			}}
		/>
	);
}

export default TextEditor;
