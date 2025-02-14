import type { LinkType } from "./variables";

export const PRIMARY_LINK_ITEMS :LinkType[] = [
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
        name: "Blogs",
        href: "/blogs",
        slug: "blogs",
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
        slug: "contact-us",
    },

]

export const SECONDARY_LINK_ITEMS: LinkType[] = [
    {
        name: "Terms of Service",
        href: "/terms-of-service",
        slug:"terms-of-service",
    },
    {
        name: "Privacy Policy",
        href: "/privacy-policy",
        slug:"privacy-policy",
    }
]