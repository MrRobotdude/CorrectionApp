import Downloader from 'nodejs-file-downloader';

export default async function downloadFile({ url, fileName = '' }) {
	//Wrapping the code with an async function, just for the sake of example.

	const downloader = new Downloader({
		url: url, //If the file name already exists, a new file with the name 200MB1.zip is created.
		directory: './temp_files',
		onProgress: function (percentage, chunk, remainingSize) {
			//Gets called with each chunk.
			console.log('% ', percentage);
			console.log('Current chunk of data: ', chunk);
			console.log('Remaining bytes: ', remainingSize);
		},
		// onBeforeSave: (deducedName) => {
		// 	console.log(`The file name is: ${deducedName}`);
		// 	//If you return a string here, it will be used as the name(that includes the extension!).
		// },
		fileName: fileName,
		cloneFiles: false, // overwrite jika udah ada
	});
	try {
		await downloader.download(); //Downloader.download() returns a promise.

		console.log('All done');
	} catch (error) {
		//IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
		//Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
		console.log('Download failed', error);
	}
}
