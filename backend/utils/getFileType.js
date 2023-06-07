import got from 'got';

import { fileTypeFromStream } from 'file-type';

export default async function getFileType({ url = '' }) {
	const stream = got.stream(url);

	return await (
		await fileTypeFromStream(stream)
	).ext;
}
