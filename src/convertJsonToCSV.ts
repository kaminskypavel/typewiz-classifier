import * as fs from 'fs';
import {createReadStream} from 'fs';
import * as _ from 'lodash';
import * as ProgressBar from 'progress';
import {createInterface} from 'readline';
import {parseInterface} from './interfaceParser';

const output = fs.createWriteStream('output.csv', {encoding: 'utf8'});

(async () => {
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
			const {name, structure} = parseInterface(declarationRaw);
			const parametersName = structure
				.map((param) => {
					return param.stem;
				})
				.join(',');
			output.write(`${name},${parametersName}\r\n`);

			parseSuccessCount++;
		} catch (e) {
			parseErrorCount++;
		}
	});

	lineReader.on('close', async () => {
		console.log('Done Importing');
		bar.update(1);
		output.end();
		const totalCount = parseErrorCount + parseSuccessCount;
		console.log(`Statistics : 
		Errors (Skipped) : ${parseErrorCount} (${_.round(100 * parseErrorCount / totalCount, 2)}) 
		Success (Inserted) ${parseSuccessCount} (${_.round(100 * parseSuccessCount / totalCount, 2)})`);
	});
})();
