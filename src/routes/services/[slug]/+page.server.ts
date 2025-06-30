import { PUBLIC_MEDIA_URL as media_url } from "$env/static/public";
import { error } from "@sveltejs/kit";
import qs from "qs";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ fetch, params }) => {
	const slug = params.slug;
	const query = qs.stringify({
		filters: {
			slug: {
				$eq: slug,
			},
		},
		fields: ["name", "slug", "description", "publishedAt", "cta_link", "tagline"],
		populate: {
			seo: {
				fields: ["meta_title", "meta_description", "prevent_indexing", "keywords"],
				populate: {
					meta_image: {
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
			cover: {
				fields: ["url", "alternativeText", "formats"],
				populate: "*",
			},
			transformations: {
				populate: {
					before: {
						fields: ["alt"],
						populate: {
							media: {
								fields: ["url", "alternativeText", "formats"],
								populate: "*",
							},
						},
					},
					after: {
						fields: ["alt"],
						populate: {
							media: {
								fields: ["url", "alternativeText", "formats"],
								populate: "*",
							},
						},
					},
					services: {
						fields: ["name", "slug"],
					},
				},
			},
			pictures: {
				fields: ["url", "alternativeText", "formats", "caption"],
				populate: "*",
			},
			service_inners: {
				fields: ["name", "description"],
				populate: {
					cover: {
						fields: ["url", "alternativeText", "formats", "caption"],
						populate: "*",
					},
				},
			},
		},
	});

	try {
		const response: Response = await fetch(`/api/services?${query}`);
		if (response.ok) {
			const { data } = await response.json();
			if (data.length > 0) {
				return {
					media_url: media_url,
					service: data[0],
				};
			}
		} else {
			error(response.status, {
				message: response.statusText,
			});
		}
	} catch (err: any) {
		console.error(err);
		error(err.status, {
			message: err.message,
		});
	}
};
