export const sanitizeDeclaration = (delcaration: string) => {
	let res = delcaration;

	// remove export keyword
	if (delcaration.indexOf('export') === 0) {
		res = delcaration.substring(7, delcaration.length);
	}

	// remove comments
	res = res.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');

	return res;
};
