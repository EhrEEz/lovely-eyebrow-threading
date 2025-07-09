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

export interface User {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	role: Role;
	created_at: string;
	updated_at: string;
}

export interface Role {
	id: number;
	name: string;
	description: string;
	type: string;
}

export type AnnouncementSizeType = {
	name: string;
	aspect_ratio: string;
	width: number;
	height: number;
	pointer: string;
};
export type AnnouncementErrorType = {
	announcement_text?: string;
	announcement_media?: string;
	announcement_template?: string;
};
