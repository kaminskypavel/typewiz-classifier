import {createReadStream} from 'fs';
import {createInterface} from 'readline';
import * as mongoose from 'mongoose';
import {RawInterface} from './schemas/RawInterace';

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

	const lineReader = createInterface({
		input: createReadStream(`typescript-interfaces.json`)
	});

	lineReader.on('line', async (datasetEntry) => {
		// tslint:disable-next-line
		const {id: _id, interface: declarationRaw, path} = JSON.parse(datasetEntry);
		const paths = path.map((p: string) => `http://github.com/${p}`);
		const upsert = await RawInterface.findOneAndUpdate(
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
		console.log(upsert);
		console.log('----------------');
	});

	lineReader.on('close', async () => {
		console.log('done inserting the interfaces!');
		mongoose.connection.close();
	});
})();
