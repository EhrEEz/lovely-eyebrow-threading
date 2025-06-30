import { PUBLIC_MEDIA_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import qs from "qs";
import type { PageServerLoad } from "./$types.js";
export const load: PageServerLoad = async ({ fetch, params }) => {
	const query = qs.stringify({
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
			pageSize: 11,
		},
		sort: [
			{
				publishedAt: "desc",
			},
		],
	});
	const response = await fetch(`/api/articles?${query}`);
	if (response.ok) {
		const { data, meta } = await response.json();
		const page_query = qs.stringify({
			populate: {
				page_info: {
					fields: ["page_title"],
					populate: {
						page_seo: {
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
					},
				},
			},
		});
		const pageResponse = await fetch(`/api/blogs-list-page?${page_query}`);
		if (!pageResponse.ok) {
			error(pageResponse.status, `${pageResponse.statusText}`);
		}
		const { data: pageData } = await pageResponse.json();
		return {
			media_url: PUBLIC_MEDIA_URL,
			meta: meta,
			articles: data,
			page_info: pageData,
		};
	}
	error(response.status, {
		message: response.statusText,
	});
};
