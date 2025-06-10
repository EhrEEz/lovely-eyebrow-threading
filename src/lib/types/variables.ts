export type LinkType = {
	name: string;
	href: string;
	slug: string;
	secondary?: boolean;
};

export interface CollectionInterface {
	collectionId: string;
	collectionName: string;
	created: string; // Or Date if you want to parse it
	updated: string; // Or Date if you want to parse it
}

export type Gallery = {
	id: string;
	before: string;
	after: string;
	service: string[];
	is_enabled: boolean;
	label: string;
} & CollectionInterface;

export type CTAItem = {
	id: string;
	name: string;
	href: string;
};
