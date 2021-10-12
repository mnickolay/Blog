export interface IPost {
	id: number;
	name: string;
	date: string;
	keywords: string[];
	body: string[];
	bodyQuotes: string[];
	image?: string;
	description: string;
}

export interface IPostMinified {
	id: number;
	name: string;
	date: string;
	keywords: string[];
	image?: string;
	description: string;
}
