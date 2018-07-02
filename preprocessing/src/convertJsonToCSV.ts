import * as fs from 'fs';
import {createReadStream} from 'fs';
import * as _ from 'lodash';
import * as ProgressBar from 'progress';
import {createInterface} from 'readline';
import {parseInterface} from './interfaceParser';

const allCsvStream = fs.createWriteStream('../output/output.csv', {encoding: 'utf8'});
const featuresCsvStream = fs.createWriteStream('../output/features.csv', {encoding: 'utf8'});
const intrefacsCsvStream = fs.createWriteStream('../output/interfaces.csv', {encoding: 'utf8'});
const inputPath = `${__dirname}/../../typescript-interfaces.json`;

(async () => {
	console.log('loading from : ', inputPath);

	const {size: totalSize} = await fs.statSync(inputPath);
	const bar = new ProgressBar('Analyzing Interfaces [:bar] :rate/bps :percent :etas', {
		complete: '=',
		incomplete: ' ',
		width: 40,
		total: totalSize
	});

	const lineReader = createInterface({
		input: createReadStream(inputPath)
	});

	let parseErrorCount = 0;
	let parseSuccessCount = 0;
	let skippedCount = 0;

	lineReader.on('line', async (datasetEntry) => {
		bar.tick(datasetEntry.length + 2);

		// tslint:disable-next-line
		const {id: githubId, interface: declarationRaw, path} = JSON.parse(datasetEntry);

		// const paths = path.map((p: string) => `http://github.com/${p}`);
		try {
			const {name, structure} = parseInterface(declarationRaw);
			const parametersName = structure
				.map((param) => {
					return param.stem;
				})
				.join(',');

			if (!_.isEmpty(parametersName)) {
				allCsvStream.write(`${name},${parametersName}\n`);
				featuresCsvStream.write(`${parametersName}\n`);
				intrefacsCsvStream.write(`${name}\n`);
				parseSuccessCount++;
			}
			else {
				skippedCount++;
			}
		} catch (e) {
			parseErrorCount++;
		}
	});

	lineReader.on('close', async () => {
		console.log('Done Importing');
		bar.update(1);
		allCsvStream.end();
		const totalCount = parseErrorCount + parseSuccessCount + skippedCount;

		console.log(`Statistics : 
		Errors (Skipped)   : ${parseErrorCount} (${_.round(100 * parseErrorCount / totalCount, 2)}) 
		Empty (Skipped)    : ${skippedCount} (${_.round(100 * skippedCount / totalCount, 2)}) 
		Success (Inserted) : ${parseSuccessCount} (${_.round(100 * parseSuccessCount / totalCount, 2)})`);
	});
})();
