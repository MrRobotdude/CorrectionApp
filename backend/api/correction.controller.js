// import app from './server.js';
// import downloadFile from '../utils/downloadFile.js';
import extractor from '../utils/extractor.js';
import ReadTextBasedFile from '../utils/readTextBasedFile.js';
import directoryListing from '../utils/readDirectory.js';
import deleteDirectory from '../utils/deleteDirectory.js';

export default class CorrectionController {
	static async extract(req, res, next) {
		try {
			const { url, fileName } = req.body;
			if (!url) {
				res.status(418).send({ message: 'url must be provided' });
			}
			const name = await extractor({ url, fileName });
			return res.status(200).send({ fileName: name });
			// res.json({ status: 'success' });
		} catch (e) {
			return res.status(500).json({ error: e.message });
		}
	}

	static async getDirectoryList(req, res, next) {
		try {
			const { path } = req.params;
			if (!path) {
				res.status(418).send({ message: 'path must be provided' });
			}
			// const fileName = await extractor({ url, fileName });
			// const list = directoryListing(`./files/${path}`);
			const list = directoryListing(`${path}`);

			return res.status(200).send({ directoryList: list });
			// res.json({ status: 'success' });
		} catch (e) {
			return res.status(500).json({ error: e.message });
		}
	}

	static async getTextBasedData(req, res, next) {
		try {
			const { file } = req.body;
			if (!file) {
				res.status(418).send({ message: 'file must be provided' });
			}
			const content = await ReadTextBasedFile.getContent({ path: file });
			return res.status(200).send({ content: content });

			// res.json({ status: 'success' });
		} catch (e) {
			return res.status(500).json({ error: e.message });
		}
	}

	static async apiTesting(req, res, next) {
		try {
			const { url } = req.body;

			res.status(200).send({ message: `api sucess ${url}` });
		} catch (e) {
			console.log(`api, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiDeleteDirectory(req, res, next) {
		try {
			const { path } = req.body;

			deleteDirectory({ path });

			res.status(200).send({ message: `delete directory success ${path}` });
		} catch (e) {
			console.log(`api, ${e}`);
			res.status(500).json({ error: e });
		}
	}
}
