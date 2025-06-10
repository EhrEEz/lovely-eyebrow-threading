import { PUBLIC_MEDIA_URL as media_url } from "$env/static/public";
import { error } from "@sveltejs/kit";
import qs from "qs";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ params }) => {
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
				fields: ["alt"],
				populate: {
					media: {
						fields: ["url", "alternativeText", "formats"],
						populate: "*",
					},
				},
			},
			galleries: {
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
		},
	});

	try {
		const response: Response = await fetch(`/api/services?${query}`);
		if (response.ok) {
			const { data } = await response.json();
			if (data.length > 0) {
				return {
					media_url: media_url,
					article: data[0],
				};
			}
		} else {
			error(response.status, {
				message: response.statusText,
			});
		}
	} catch (err: any) {
		error(err.status, {
			message: err.message,
		});
	}
	// const request = await locals.pb
	// 	.collection("services")
	// 	.getFirstListItem(`slug='${slug}'`)
	// 	.then((res) => {
	// 		if (res) {
	// 			return { service: res as Service };
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.error(err.originalError);
	// 		error(err.status, err.response.message);
	// 	});

	// const gallery_request = await locals.pb
	// 	.collection("gallery")
	// 	.getList(1, 4, {
	// 		filter: `service~'${request?.service.id}' && is_enabled=true`,
	// 	})
	// 	.then((res) => {
	// 		if (res) {
	// 			console.log(res);
	// 			return { gallery: res.items as Gallery[] };
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.error(err.originalError);
	// 		error(err.status, err.response.message);
	// 	});
};
