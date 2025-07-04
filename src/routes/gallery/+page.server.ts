import { PUBLIC_MEDIA_URL as media_url } from "$env/static/public";
import { error } from "@sveltejs/kit";
import qs from "qs";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ fetch, params }) => {
	const query = qs.stringify({
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

	try {
		const response = await fetch(`/api/gallery-page?${query}`);
		if (!response.ok) {
			error(response.status, `${response.statusText}`);
		}
		const { data: galleryPageData } = await response.json();
		const galleryQuery = qs.stringify({
			populate: {
				before: {
					fields: ["alt"],
					populate: {
						media: {
							fields: ["url", "alternativeText", "formats", "caption"],
							populate: "*",
						},
					},
				},
				after: {
					fields: ["alt"],
					populate: {
						media: {
							fields: ["url", "alternativeText", "formats", "caption"],
							populate: "*",
						},
					},
				},
				services: {
					fields: ["name", "slug"],
				},
			},
			pagination: {
				page: 1,
				pageSize: 20,
			},
			sort: [
				{
					publishedAt: "desc",
				},
			],
		});

		const galleryResponse = await fetch(`/api/galleries?${galleryQuery}`);

		if (!galleryResponse.ok) {
			error(galleryResponse.status, `${galleryResponse.statusText}`);
		}
		const { data: galleryData, meta } = await galleryResponse.json();
		return {
			page_info: galleryPageData,
			gallery: galleryData,
			meta: meta,
			media_url,
		};
	} catch (err: any) {
		console.log(err);
		error(err.status, {
			message: err.message,
		});
	}
};
