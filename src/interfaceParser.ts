import {tsquery} from '@phenomnomnominal/tsquery';
import {Identifier, PropertySignature} from 'typescript';
import * as _ from 'lodash';
import {TSQueryNode} from '@phenomnomnominal/tsquery/dist/src/tsquery-types';
import {IParsedInterface} from './models/Interfaces';
import stemmer = require('stemmer');

export const getInterfaceName = (delcaration: string) => {
	const ast = tsquery.ast(delcaration);
	const result = _.first(tsquery<Identifier>(ast, 'InterfaceDeclaration > Identifier')) as TSQueryNode<Identifier>;
	return result.name;
};

export const getInterfaceProperties = (delcaration: string) => {
	const ast = tsquery.ast(delcaration);
	return tsquery<PropertySignature>(ast, 'InterfaceDeclaration > PropertySignature') as Array<
		TSQueryNode<PropertySignature>
	>;
};

export const getPropertyName = (astNode: TSQueryNode<PropertySignature>) => {
	return astNode.name.getText();
};

export const getPropertyQuestion = (astNode: TSQueryNode<PropertySignature>) => {
	return !!astNode.questionToken;
};

export const getPropertyKind = (astNode: TSQueryNode<PropertySignature>) => {
	return astNode
		.type!.getText()
		.replace(/\s/g, '')
		.split('|')
		.map((kind) => {
			return kind.includes('=>') ? 'Function' : kind;
		});
};

export const parseInterface = (delcaration: string) => {
	return {
		name: getInterfaceName(delcaration),
		structure: getInterfaceProperties(delcaration).map((prop) => {
			const name = getPropertyName(prop);
			const kind = getPropertyKind(prop);
			const question = getPropertyQuestion(prop);
			const stem = stemmer(name);
			return {name, kind, question, stem};
		})
	} as IParsedInterface;
};
