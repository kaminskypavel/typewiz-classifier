import {sanitizeDeclaration} from './../interfaceParser';

describe('#sanitizeDeclaration', () => {
	it('should remove the word "export"', () => {
		expect(sanitizeDeclaration('export interface A {}')).toEqual('interface A {}');
	});

	it('should should remove comments', () => {
		const example = `interface Field {
        /**
         * Enable sorting for the field
         */
        allowSort?: boolean;
        /**
         * Name of the field
         */
        fieldName: string;
        /**
         * Type of the field
         */
        fieldType?: Field.FieldTypeEnum;
        /**
         * Analyzer to be used during indexing
         */
        indexAnalyzer?: string;
        /**
         * Analyzer to be used during searching
         */
        searchAnalyzer?: string;
        /**
         * Similarity defines the components of scoring. Similarity determines how \\r\\nengine weights terms. FlexSearch interacts with Similarity at both index-time \\r\\nand query-time.
         */
        similarity?: Field.SimilarityEnum;
    }`;

		expect(sanitizeDeclaration(example)).toMatchSnapshot();
	});
});
