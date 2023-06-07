// import fs from 'fs';
// import path from 'path';
// import StreamZip from 'node-stream-zip';
import _7z from '7zip-min';

export default async function extractZip({ fileName = '', outputPath }) {
	// unpack
	_7z.unpack(`./temp_files/${fileName}`, `./files/${outputPath}`, (err) => {
		// done
		console.log(err);
	});
	// let file = `./temp_files/${fileName}`;
	// var zip = new StreamZip({
	// 	file: `./temp_files/${fileName}`,
	// 	storeEntries: true,
	// 	fileName: outputName,
	// });

	// zip.on('error', function (err) {
	// 	console.error('[ERROR]', err);
	// });

	// zip.on('ready', function () {
	// 	console.log('All entries read: ' + zip.entriesCount);
	// 	console.log(zip.entries());
	// });

	// zip.on('entry', function (entry) {
	// 	var pathname = path.resolve('./files', entry.name);
	// 	if (/\.\./.test(path.relative('./files', pathname))) {
	// 		console.warn(
	// 			'[zip warn]: ignoring maliciously crafted paths in zip file:',
	// 			entry.name
	// 		);
	// 		return;
	// 	}

	// 	if ('/' === entry.name[entry.name.length - 1]) {
	// 		console.log('[DIR]', entry.name);
	// 		// pathname = outputName;
	// 		return;
	// 	}

	// 	console.log('[FILE]', entry.name);
	// 	zip.stream(entry.name, function (err, stream) {
	// 		if (err) {
	// 			console.error('Error:', err.toString());
	// 			return;
	// 		}

	// 		stream.on('error', function (err) {
	// 			console.log('[ERROR]', err);
	// 			return;
	// 		});

	// 		// example: print contents to screen
	// 		//stream.pipe(process.stdout);

	// 		// example: save contents to file
	// 		fs.mkdir(path.dirname(pathname), { recursive: true }, function (err) {
	// 			stream.pipe(fs.createWriteStream(pathname));
	// 		});
	// 	});
	// });

	// // unpack into the current directory (process.cwd()) if no output directory specified
	// _7z.unpack('path/to/archive.7z', (err) => {
	// 	// done
	// });
}
// export default extract_zip;
