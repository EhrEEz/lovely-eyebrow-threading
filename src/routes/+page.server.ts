import type { PageServerLoad } from "./$types";
import { PUBLIC_MEDIA_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import qs from "qs";

export const load: PageServerLoad = async ({ params, fetch }) => {
	const query = qs.stringify({
		// fields: ["name", "description", "tagline", "booking_link"],
		populate: {
			page_info: {
				fields: ["page_title"],
				populate: {
					page_seo: {
						fields: ["meta_title", "meta_description", "prevent_indexing", "keywords"],
						populate: {
							meta_image: {
								populate: {
									media: {
										fields: ["alternativeText", "caption", "url"],
										populate: "*",
									},
								},
							},
						},
					},
				},
			},
			header_section: {
				fields: ["large_text", "small_text", "display_address"],
				populate: {
					left_image: {
						fields: ["alternativeText", "caption", "url", "formats"],
						populate: "*",
					},
					right_image: {
						fields: ["alternativeText", "caption", "url", "formats"],
						populate: "*",
					},
				},
			},
			services_section: {
				fields: ["heading"],
				populate: {
					services: {
						fields: ["slug", "name", "cta_link", "description"],
						populate: {
							cover: {
								fields: ["alternativeText", "url"],
							},
						},
					},
				},
			},
			gallery_section: {
				fields: ["pre_title", "title", "description"],
				populate: {
					image_top_left: {
						fields: "*",
					},
					image_top_right: {
						fields: "*",
					},
					image_bottom_left: {
						fields: "*",
					},
					image_bottom_right: {
						fields: "*",
					},
				},
			},
			testimonial_section: {
				populate: {
					testimonials: {
						fields: "*",
						populate: {
							author_avatar: {
								fields: ["alternativeText", "caption", "url", "formats"],
								populate: "*",
							},
						},
					},
				},
			},
			contact_section: {
				fields: ["main_text"],
				populate: {
					main_image: {
						fields: "*",
					},
				},
			},
			about_section: {
				fields: ["title", "description", "hook"],
				populate: {
					cover: {
						fields: ["alt"],
						populate: {
							media: {
								fields: ["url", "alternativeText", "formats"],
								populate: "*",
							},
						},
					},
				},
			},
		},
	});

	const articleQuery = qs.stringify({
		fields: ["title", "slug", "description", "publishedAt"],
		populate: {
			cover: {
				fields: ["alt"],
				populate: {
					media: {
						fields: ["url", "alternativeText", "formats"],
						populate: "*",
					},
				},
			},
			article_tag: {
				populate: {
					fields: ["title"],
				},
			},
		},
		pagination: {
			page: 1,
			pageSize: 3,
		},
		sort: [
			{
				publishedAt: "desc",
			},
		],
	});
	const response = await fetch(`/api/home-page?${query}`);
	if (response.ok) {
		const { data } = await response.json();

		const article_response = await fetch(`/api/articles?${articleQuery}`);

		if (article_response.ok) {
			const { data: articleData } = await article_response.json();
			return {
				media_url: PUBLIC_MEDIA_URL,
				home_data: { ...data, articles: articleData ?? [] },
			};
		} else {
			return {
				media_url: PUBLIC_MEDIA_URL,
				home_data: { ...data, articles: [] },
			};
		}
	}
	error(response.status, {
		message: response.statusText,
	});
	// return {
	// 	status: 200,
	// 	page: {
	// 		name: "Lovely Eyebrow Threading",
	// 		address: {
	// 			address_1: "1260 Woodforest Blvd Ste 110",
	// 			address_2: "Houston, TX 77015",
	// 		},
	// 		title: "Brows Flawless",
	// 		subtitle: "Confidence Oozing",
	// 		description:
	// 			"We specialize in threading, waxing, and henna. We also offer eyelash extensions and facials. We are located in the Woodforest Shopping Center.",
	// 		hero_image1: "header-1.png",
	// 		hero_image2: "header-2.png",
	// 	},
	// 	services: {
	// 		title: "Services beyond your expectations",
	// 		items: [
	// 			{
	// 				name: "Eyebrow Threading",
	// 				image: "eyebrow-threading.png",
	// 				slug: "eyebrow-threading",
	// 				description:
	// 					"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
	// 			},
	// 			{
	// 				name: "Henna Tattoo",
	// 				image: "henna-tattoo.png",
	// 				slug: "henna-tattoo",
	// 				description:
	// 					"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
	// 			},
	// 			{
	// 				name: "Facial Therapy",
	// 				image: "facial-therapy.png",
	// 				slug: "Facial Therapy",
	// 				description:
	// 					"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
	// 			},
	// 			{
	// 				name: "Eyelash Extensions",
	// 				image: "eyelash-extensions.png",
	// 				slug: "eyelash-extensions",
	// 				description:
	// 					"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
	// 			},
	// 		],
	// 	},
	// 	testimonials: {
	// 		title: "Our client’s words",
	// 		items: [
	// 			{
	// 				author: "Sarah M.",
	// 				description:
	// 					"I’ve never trusted anyone with my brows until I found this place! The attention to detail is amazing, and I always leave with perfect arches. Highly recommend!",
	// 			},
	// 			{
	// 				author: "Cynthia L.",
	// 				description:
	// 					"I had single lashes done for a wedding, and I’ve never felt more beautiful! They looked so natural yet added the perfect touch of glam. Amazing work!",
	// 			},
	// 			{
	// 				author: "James H.",
	// 				description:
	// 					"As a guy, I was nervous about getting my brows done, but the team here made it so easy. My brows look clean and natural—not overdone. I’ll be back for sure.",
	// 			},
	// 			{
	// 				author: "Emily R.",
	// 				description:
	// 					"Quick, professional, and painless! Their waxing services are fantastic, and the results last longer than anywhere else I’ve been.",
	// 			},
	// 			{
	// 				author: "Jessica T.",
	// 				description:
	// 					"This was the most relaxing facial I’ve ever had! My skin feels so refreshed and glowing. The staff made me feel so comfortable throughout the process.",
	// 			},
	// 			{
	// 				author: "Aisha K.",
	// 				description:
	// 					"The henna designs here are absolutely stunning! I came in for a special event, and the artist created a beautiful custom design that got so many compliments. I'll definitely be back.",
	// 			},
	// 		],
	// 	},
	// 	blogs: {
	// 		title: "Latest Articles",
	// 		articles: [
	// 			{
	// 				title: "Do Something beautiful this holi",
	// 				date: "December 01, 2025 | Monday",
	// 				tag: "Festive",
	// 				short_description:
	// 					"I had single lashes done for a wedding, and I’ve never felt more beautiful! They looked so natural yet added the perfect touch of glam. Amazing work!",
	// 				slug: "article-1",
	// 				image: "/images/blogs/article-1.png",
	// 			},
	// 			{
	// 				title: "Daily eyebrow makeup",
	// 				date: "November 28, 2025 | Thursday",
	// 				tag: "Tutorial",
	// 				short_description:
	// 					"I had single lashes done for a wedding, and I’ve never felt more beautiful! They looked so natural yet added the perfect touch of glam. Amazing work!",
	// 				slug: "article-3",
	// 				image: "/images/blogs/article-3.png",
	// 			},
	// 			{
	// 				title: "Facial health with makeup",
	// 				date: "November 24, 2025 | Sunday",
	// 				tag: "Informational",
	// 				short_description:
	// 					"I had single lashes done for a wedding, and I’ve never felt more beautiful! They looked so natural yet added the perfect touch of glam. Amazing work!",
	// 				slug: "article-2",
	// 				image: "/images/blogs/article-2.png",
	// 			},
	// 		],
	// 	},
	// 	message: {
	// 		text: "Have Questions? Ready to Book an Appointment?",
	// 		image: "message.png",
	// 		link: {
	// 			text: "Leave a message",
	// 			slug: "/contact",
	// 		},
	// 	},
	// };
};
