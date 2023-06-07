import React, { useContext, useState } from 'react';

const CurrentFileContext = React.createContext();
const CurrentFileUpdateContext = React.createContext();

export function useCurrentFile() {
	return useContext(CurrentFileContext);
}

export function useCurrentFileUpdate() {
	return useContext(CurrentFileUpdateContext);
}

export function CurrentFileProvider({ children }) {
	const [currentFile, setCurrentFile] = useState('');

	function changeFile(file) {
		setCurrentFile(file);
		console.log(currentFile);
	}

	return (
		<CurrentFileContext.Provider value={currentFile}>
			<CurrentFileUpdateContext.Provider
				// value={(file) => changeFile({ file: file })}
				value={changeFile}
			>
				{children}
			</CurrentFileUpdateContext.Provider>
		</CurrentFileContext.Provider>
	);
}
