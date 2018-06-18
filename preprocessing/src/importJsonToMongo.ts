import * as fs from 'fs';
import {createReadStream} from 'fs';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import * as ProgressBar from 'progress';
import {createInterface} from 'readline';
import {parseInterface} from './interfaceParser';
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

	const {size: totalSize} = await fs.statSync('typescript-interfaces.json');
	const bar = new ProgressBar('Analyzing Interfaces [:bar] :rate/bps :percent :etas', {
		complete: '=',
		incomplete: ' ',
		width: 40,
		total: totalSize
	});

	const lineReader = createInterface({
		input: createReadStream(`typescript-interfaces.json`)
	});

	let parseErrorCount = 0;
	let parseSuccessCount = 0;

	lineReader.on('line', async (datasetEntry) => {
		bar.tick(datasetEntry.length + 2);

		// tslint:disable-next-line
		const {id: githubId, interface: declarationRaw, path} = JSON.parse(datasetEntry);
		const paths = path.map((p: string) => `http://github.com/${p}`);
		try {
			const rawInterface = new RawInterface({
				githubId,
				declaration: {
					raw: declarationRaw,
					parsed: parseInterface(declarationRaw)
				},
				paths
			});

			await rawInterface.save();
			parseSuccessCount++;
		} catch (e) {
			parseErrorCount++;
		}
	});

	lineReader.on('close', async () => {
		console.log('Done Importing');
		mongoose.connection.close();
		bar.update(1);
		const totalCount = parseErrorCount + parseSuccessCount;
		console.log(`Statistics : 
		Errors (Skipped) : ${parseErrorCount} (${_.round(100 * parseErrorCount / totalCount, 2)}) 
		Success (Inserted) ${parseSuccessCount} (${_.round(100 * parseSuccessCount / totalCount, 2)})`);
	});
})();
