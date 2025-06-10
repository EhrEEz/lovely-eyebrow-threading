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
		return {
			media_url: PUBLIC_MEDIA_URL,
			meta: meta,
			articles: data,
		};
	}
	error(response.status, {
		message: response.statusText,
	});
};
