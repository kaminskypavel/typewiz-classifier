import {
	getInterfaceName,
	getInterfaceProperties,
	getPropertyKind,
	getPropertyName,
	getPropertyQuestion,
	parseInterface
} from '../interfaceParser';
import {example1, example2, example3, example4, example5} from './fixtures/mockInterfaces';

describe('#getInterfaceName', () => {
	it('should return the interface name', () => {
		expect(getInterfaceName(example1)).toBe('IExample1');
		expect(getInterfaceName(example2)).toBe('IExample2');
		expect(getInterfaceName(example3)).toBe('IExample3');
		expect(getInterfaceName(example4)).toBe('IExample4');
		expect(getInterfaceName('interface example {}')).toBe('IExample');
		expect(getInterfaceName('interface Iexample {}')).toBe('IExample');
		expect(getInterfaceName('interface IExample {}')).toBe('IExample');
		expect(getInterfaceName('interface iExample {}')).toBe('IExample');
		expect(getInterfaceName('interface iexample {}')).toBe('IExample');
		expect(getInterfaceName('interface IReducerInterface {}')).toBe('IReducerInterface');
		expect(getInterfaceName('interface reducer_interface {}')).toBe('IReducerInterface');
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
			'requestid',
			'ordereddependencies',
			'dependencyurls',
			'javascript',
			'paramvalues'
		]);

		expect(getInterfaceProperties(example3).map((node) => getPropertyName(node))).toEqual([
			'allowsort',
			'fieldname',
			'fieldtype',
			'indexanalyzer',
			'searchanalyzer',
			'similarity'
		]);

		expect(getInterfaceProperties(example4).map((node) => getPropertyName(node))).toEqual([
			'minzoom',
			'maxzoom',
			'radius',
			'extent',
			'nodesize',
			'log',
			'reduce',
			'initial',
			'map'
		]);
	});

	expect(getInterfaceProperties(example5).map((node) => getPropertyName(node))).toEqual([
		"firstname",
		"lastname"
	]);

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
			['number', 'string[]', 'Pizza'],
			['string[]'],
			['{[id:string]:string}'],
			['string'],
			['any[]']
		]);

		expect(getInterfaceProperties(example3).map((node) => getPropertyKind(node))).toEqual([
			['boolean'],
			['string'],
			['Field.FieldTypeEnum'],
			['string'],
			['string'],
			['Field.SimilarityEnum']
		]);

		expect(getInterfaceProperties(example4).map((node) => getPropertyKind(node))).toEqual([
			['number'],
			['number'],
			['number'],
			['number'],
			['number'],
			['boolean'],
			['Function'],
			['Function'],
			['Function']
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
