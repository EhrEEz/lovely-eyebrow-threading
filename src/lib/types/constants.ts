import type { CTAItem, LinkType } from "./variables";

export const PRIMARY_LINK_ITEMS: LinkType[] = [
	{
		name: "Home",
		href: "/",
		slug: "home",
	},
	{
		name: "Services",
		href: "/services",
		slug: "services",
	},
	{
		name: "About Us",
		href: "/about",
		slug: "about-us",
	},
	{
		name: "Articles",
		href: "/articles",
		slug: "articles",
	},
	{
		name: "Announcements",
		href: "/announcements",
		slug: "announcements",
	},
	{
		name: "Gallery",
		href: "/gallery",
		slug: "gallery",
	},
	{
		name: "Contact Us",
		href: "/contact",
		slug: "contact",
	},
];

export const CTA_ITEMS: CTAItem[] = [
	{
		id: "bookings",
		href: "/",
		name: "Book Now",
	},
	{
		id: "services",
		href: "/services",
		name: "View Services",
	},
	{
		id: "contact",
		href: "/contact",
		name: "Contact Us",
	},
];

export const SECONDARY_LINK_ITEMS: LinkType[] = [
	{
		name: "Terms of Service",
		href: "/terms-of-service",
		slug: "terms-of-service",
	},
	{
		name: "Privacy Policy",
		href: "/privacy-policy",
		slug: "privacy-policy",
	},
];
