import fs from 'fs';
import path from 'path';
let directory = [];

// let jsonTree = {
// 	'./files/': [
// 		{
// 			a: [
// 				{ file: 'a1.sql' },
// 				{ file: 'a2.sql' },
// 				{ b: [{ file: 'b1.sql' }, { file: 'b2.sql' }] },
// 			],
// 		},
// 	],
// };

let jsonTree = [];
let dir2 = [];
let childrenTemp = [];
import dirTree from 'directory-tree';

export default function directoryListing(dir = '') {
	const tree = dirTree(dir);
	console.log(tree);
	return tree;
	// console.log('[+]', dir);

	// let files = fs.readdirSync(dir);

	// for (let file in files) {
	// 	let next = path.join(dir, files[file]);
	// 	if (fs.lstatSync(next).isDirectory() == true) {
	// 		console.log('[+]', files[file]);
	// 		jsonTree.push({
	// 			// key: '1',
	// 			label: files[file],
	// 			// icon: 'fa fa-desktop',
	// 			title: files[file],
	// 			children: childrenTemp,
	// 		});
	// 		// console.log('[-]', next);

	// 		// jsonTree.files.push({ [dir]: [{}] });
	// 		directoryListing(next);
	// 		childrenTemp = [];
	// 	} else {
	// 		childrenTemp.push(
	// 			// jsonTree.push({
	// 			// key: '1',
	// 			{
	// 				label: files[file],
	// 				// icon: 'fa fa-desktop',
	// 				title: files[file],
	// 			}
	// 			// });
	// 		);

	// 		// jsonTree.push({
	// 		// 	key: '0-1-4',
	// 		// 	label: 'Document-0-4.doc',
	// 		// 	// icon: 'fa fa-file',
	// 		// 	title: 'Documents Folder',
	// 		// });
	// 		// console.log(jsonTree[dir]);
	// 		// jsonTree.files.push({ files: files[file] });
	// 		// jsonTree[files.push(files[file])];
	// 		// directory.push(next);
	// 		console.log('\t', files[file]);
	// 	}
	// }
}

// crawl('./extracted/');
