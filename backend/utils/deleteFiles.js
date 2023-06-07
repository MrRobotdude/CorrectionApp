import { unlink } from 'fs';
// Assuming that 'path/file.txt' is a regular file.
export default function deletFiles({ path }) {
	unlink(path, (err) => {
		if (err) throw err;
		console.log(`${path} was deleted`);
	});
}
