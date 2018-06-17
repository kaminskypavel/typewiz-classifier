export interface Interfaces {
	githubId: string;
	declaration: {
		raw: string;
		json: any;
	};
	paths: string[];
}

export interface IParsedInterface {
	name: string;
	structure: [IParsedInterface | IParsedFeature];
}

export interface IParsedFeature {
	name: string;
	kind: string[];
	question: boolean;
	stem: string;
}
