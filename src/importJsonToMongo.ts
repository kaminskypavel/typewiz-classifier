import {createReadStream} from 'fs';
import {createInterface} from 'readline';

const lineReader = createInterface({
	input: createReadStream(`${__dirname}/typescript-interfaces.json`)
});

lineReader.on('line', (datasetEntry) => {
	const {id, interface: declaration, path} = JSON.parse(datasetEntry);
	console.log('id : ', id);
	console.log(declaration);
	console.log('path : ', path);
	console.log('----------------');
});

lineReader.on('close', () => {
	console.log('done!');
});
