import {createInterface} from 'readline';
import * as mongoose from 'mongoose';
import * as fs from 'fs';
import {createReadStream} from 'fs';
import {RawInterface} from './schemas/RawInterace';

import * as ProgressBar from 'progress';

const getDbConnection = async () => {
	const mongoUrl = 'mongodb://localhost:27017/typewiz_classifier';
	(mongoose as any).Promise = global.Promise;

	const connection = await mongoose.connect(mongoUrl).catch((err) => {
		console.log(err);
	});

	console.log('connected to db');
	return connection;
};

(async () => {
	await getDbConnection();

	const {size: totalSize} = await fs.statSync('typescript-interfaces.json');
	const bar = new ProgressBar('formatting [:bar] :rate/bps :percent :etas', {
		complete: '=',
		incomplete: ' ',
		width: 40,
		total: totalSize
	});

	const lineReader = createInterface({
		input: createReadStream(`typescript-interfaces.json`)
	});

	lineReader.on('line', async (datasetEntry) => {
		bar.tick(datasetEntry.length + 2);

		// tslint:disable-next-line
		const {id: _id, interface: declarationRaw, path} = JSON.parse(datasetEntry);
		const paths = path.map((p: string) => `http://github.com/${p}`);
		await RawInterface.findOneAndUpdate(
			{_id},
			{
				_id,
				declaration: {
					raw: declarationRaw
				},
				paths
			},
			{upsert: true}
		);
	});

	lineReader.on('close', async () => {
		console.log('done inserting the interfaces!');
		mongoose.connection.close();
		bar.update(1);
	});
})();
