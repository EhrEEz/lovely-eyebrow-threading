import { error } from "@sveltejs/kit";
import { PUBLIC_MEDIA_URL } from "$env/static/public";
import type { PageServerLoad } from "./$types";
import qs from "qs";

export const load: PageServerLoad = async ({ fetch }) => {
	const media_url = PUBLIC_MEDIA_URL;
	const query = qs.stringify({
		fields: ["hook_line", "end_line"],
		populate: {
			image_1: {
				populate: "*",
				fields: ["alternativeText", "url", "formats"],
			},
			image_2: {
				populate: "*",
				fields: ["alternativeText", "url", "formats"],
			},
			image_3: {
				populate: "*",
				fields: ["alternativeText", "url", "formats"],
			},
			image_4: {
				populate: "*",
				fields: ["alternativeText", "url", "formats"],
			},
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
			content_blocks: {
				fields: ["heading_text", "description_text"],
				populate: {
					link: {
						fields: ["text", "url"],
					},
					image: {
						fields: ["alternativeText", "url", "formats"],
						populate: "*",
					},
				},
			},
			end_image: {
				populate: "*",
				fields: ["alternativeText", "url", "formats"],
			},
		},
	});

	const response = await fetch(`/api/about-us-page?${query}`);
	if (!response.ok) {
		error(response.status, `${response.statusText}`);
	}
	const { data } = await response.json();
	return {
		page_data: data,
		media_url,
	};
};
