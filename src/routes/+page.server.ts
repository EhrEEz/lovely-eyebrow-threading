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
				home_data: { ...data, streamed: { articles: articleData ?? [] } },
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
};
