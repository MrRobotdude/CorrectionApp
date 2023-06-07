import { unrar, list } from 'unrar-promise';

export default async function extractRAR({ file, outputPath }) {
	await unrar(file, outputPath);
	console.log('file extracted !');
}
