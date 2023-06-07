import extractZip from '../utils/extractZip.js';
import downloadFile from '../utils/downloadFile.js';
import directoryListing from '../utils/readDirectory.js';
import ReadTextBasedFile from '../utils/readTextBasedFile.js';
import getFileType from '../utils/getFileType.js';
import { v1 as uuidv1, v4 } from 'uuid';
import extractRAR from '../utils/extractRAR.js';
import deleteFiles from '../utils/deleteFiles.js';
import deleteDirectory from '../utils/deleteDirectory.js';

let dummyUrl =
	'https://binusianorg-my.sharepoint.com/personal/slc_storage_binus_edu/_layouts/15/download.aspx?UniqueId=07f98245-60a0-46f2-8a75-79dc5f2e5d2c&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYmludXNpYW5vcmctbXkuc2hhcmVwb2ludC5jb21AMzQ4NWI5NjMtODJiYS00YTZmLTgxMGYtYjVjYzIyNmZmODk4IiwiaXNzIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwIiwibmJmIjoiMTY0MTc1MTk2NiIsImV4cCI6IjE2NDE3NTU1NjYiLCJlbmRwb2ludHVybCI6ImRyMXJLZEQrQkhVcGxVKzhDYU1WOHVGS1dOVHFoMHFueWh3UlhhTzlQaEU9IiwiZW5kcG9pbnR1cmxMZW5ndGgiOiIxNTYiLCJpc2xvb3BiYWNrIjoiVHJ1ZSIsImNpZCI6Ik9HRTNaR1V3TnpVdE5qZ3haQzAwTlRRMkxXSTVPREV0TW1aaU9HVmhOemxpT0RjdyIsInZlciI6Imhhc2hlZHByb29mdG9rZW4iLCJzaXRlaWQiOiJPVEkzTjJGa05HTXROMlkzTVMwMFlUWmpMV0ppWXpJdFlUY3hORFpoT0RZelpUQXkiLCJhcHBfZGlzcGxheW5hbWUiOiJTdHVkZW50IFByYWN0aWN1bSAtIEJpbnVzIFVuaXZlcnNpdHkiLCJnaXZlbl9uYW1lIjoiU0xDIiwiZmFtaWx5X25hbWUiOiJTdG9yYWdlIiwiYXBwaWQiOiJmN2ExYWFlYi03MmY4LTQxYWUtYmQ3My1iN2ExZmZhNjZiODEiLCJ0aWQiOiIzNDg1Yjk2My04MmJhLTRhNmYtODEwZi1iNWNjMjI2ZmY4OTgiLCJ1cG4iOiJzbGMuc3RvcmFnZUBiaW51cy5lZHUiLCJwdWlkIjoiMTAwMzIwMDBGOEVERTc2NiIsImNhY2hla2V5IjoiMGguZnxtZW1iZXJzaGlwfDEwMDMyMDAwZjhlZGU3NjZAbGl2ZS5jb20iLCJzY3AiOiJhbGxmaWxlcy53cml0ZSBhbGxwcm9maWxlcy5yZWFkIiwidHQiOiIyIiwidXNlUGVyc2lzdGVudENvb2tpZSI6bnVsbCwiaXBhZGRyIjoiMjAuMTkwLjE2My4yOSJ9.TSsxZnVVOVZGakVuWVNjN0ZJQ0tqM0pLekFTT1JmWkhBeGpWMEpxcGpVMD0&ApiVersion=2.0';

export default async function extractor({ url = dummyUrl, fileName = '' }) {
	let fileType = await getFileType({ url });
	// fileName = uuidv1().toString();
	let fileNameWithType = `${fileName}.${fileType}`;
	let filePath = `./temp_files/${fileNameWithType}`;

	await downloadFile({ url, fileName: fileNameWithType });
	if (fileType === 'rar') {
		await extractRAR({ file: filePath, outputPath: `./files/${fileName}` });
	} else {
		await extractZip({
			fileName: fileNameWithType,
			outputPath: `${fileName}`,
		});
	}
	// deleteDirectory({ path: './temp_files' });
	return fileName;
	// return directoryListing(`./files/${fileName}`);

	// console.log(fileName);
}

// extractor({ url: dummyUrl });
