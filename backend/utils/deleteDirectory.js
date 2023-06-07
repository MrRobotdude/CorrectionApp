import fs from 'fs';
export default function deleteDirectory({ path = '' }) {
	fs.rmSync(path, { recursive: true, force: true });
}
