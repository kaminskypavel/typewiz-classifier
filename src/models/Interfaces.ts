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
	structure: {
		[key: string]: IParsedInterface | IParsedFeature;
	};
}

export interface IParsedFeature {
	name: string;
	stem: string;
	optional: boolean;
}
