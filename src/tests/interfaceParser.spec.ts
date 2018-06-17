import {
	getInterfaceName,
	getInterfaceProperties,
	getPropertyKind,
	getPropertyName,
	getPropertyQuestion,
	parseInterface
} from '../interfaceParser';
import {example1, example2, example3, example4} from './fixtures/mockInterfaces';

describe('#getInterfaceName', () => {
	it('should return the interface name', () => {
		expect(getInterfaceName(example1)).toBe('Example1');
		expect(getInterfaceName(example2)).toBe('Example2');
		expect(getInterfaceName(example3)).toBe('Example3');
		expect(getInterfaceName(example4)).toBe('Example4');
	});
});

describe('#getProperties', () => {
	it('should find the correct number on nodes', () => {
		expect(getInterfaceProperties(example1).length).toEqual(0);
		expect(getInterfaceProperties(example2).length).toEqual(5);
		expect(getInterfaceProperties(example3).length).toEqual(6);
		expect(getInterfaceProperties(example4).length).toEqual(9);
	});
});

describe('#getPropertyName', () => {
	it('should find the correct node names', () => {
		expect(getInterfaceProperties(example1).map((node) => getPropertyName(node))).toEqual([]);

		expect(getInterfaceProperties(example2).map((node) => getPropertyName(node))).toEqual([
			'requestId',
			'orderedDependencies',
			'dependencyUrls',
			'javaScript',
			'paramValues'
		]);

		expect(getInterfaceProperties(example3).map((node) => getPropertyName(node))).toEqual([
			'allowSort',
			'fieldName',
			'fieldType',
			'indexAnalyzer',
			'searchAnalyzer',
			'similarity'
		]);

		expect(getInterfaceProperties(example4).map((node) => getPropertyName(node))).toEqual([
			'minZoom',
			'maxZoom',
			'radius',
			'extent',
			'nodeSize',
			'log',
			'reduce',
			'initial',
			'map'
		]);
	});
});

describe('#getPropertyQuestion', () => {
	it('should find the correct node question mark', () => {
		expect(getInterfaceProperties(example1).map((node) => getPropertyQuestion(node))).toEqual([]);

		expect(getInterfaceProperties(example2).map((node) => getPropertyQuestion(node))).toEqual([
			false,
			true,
			true,
			true,
			false
		]);

		expect(getInterfaceProperties(example3).map((node) => getPropertyQuestion(node))).toEqual([
			true,
			false,
			true,
			true,
			true,
			true
		]);

		expect(getInterfaceProperties(example4).map((node) => getPropertyQuestion(node))).toEqual([
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true
		]);
	});
});

describe('#getPropertyKind', () => {
	it('should find the correct node question mark', () => {
		expect(getInterfaceProperties(example1).map((node) => getPropertyKind(node))).toEqual([]);

		expect(getInterfaceProperties(example2).map((node) => getPropertyKind(node))).toEqual([
			'number',
			'string[]',
			'{[id:string]:string}',
			'string',
			'any[]'
		]);

		expect(getInterfaceProperties(example3).map((node) => getPropertyKind(node))).toEqual([
			'boolean',
			'string',
			'Field.FieldTypeEnum',
			'string',
			'string',
			'Field.SimilarityEnum'
		]);

		expect(getInterfaceProperties(example4).map((node) => getPropertyKind(node))).toEqual([
			'number',
			'number',
			'number',
			'number',
			'number',
			'boolean',
			'(accumulated:any,props:any)=>void',
			'()=>any',
			'(props:any)=>any'
		]);
	});
});

describe('#parseInterface', () => {
	it('should parse the interfaces correctly', () => {
		[example1, example2, example3, example4].forEach((example, idx) => {
			expect(parseInterface(example)).toMatchSnapshot(`example${idx + 1}`);
		});
	});
});
