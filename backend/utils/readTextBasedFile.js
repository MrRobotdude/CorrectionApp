import readTextFile from 'read-text-file';

export default class ReadTextBasedFile {
	static async getContent({ path }) {
		var contentsPromise = readTextFile.read(path);
		var contents = readTextFile.readSync(path);
		return contentsPromise;
	}
}
