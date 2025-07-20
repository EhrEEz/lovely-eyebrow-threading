import { PUBLIC_MEDIA_URL } from "$env/static/public";
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
		fields: ["title", "slug", "description", "publishedAt", "content"],
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
			article_tag: {
				fields: ["title"],
			},
			related_articles: {
				populate: {
					articles: {
						fields: ["title", "slug", "description", "publishedAt"],
						populate: {
							article_tag: {
								fields: ["title"],
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
						},
					},
				},
			},
		},
	});
	try {
		const response: Response = await fetch(`/api/articles?${query}`);
		if (response.ok) {
			const { data } = await response.json();
			if (data.length > 0) {
				return {
					media_url: PUBLIC_MEDIA_URL,
					article: data[0],
				};
			}
			error(404, {
				message: "Page Not Found",
			});
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
};
