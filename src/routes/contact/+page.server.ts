import { PUBLIC_MEDIA_URL } from "$env/static/public";
import { error, type ServerLoad } from "@sveltejs/kit";
import qs from "qs";

export const load: ServerLoad = async ({ fetch }) => {
	const query = qs.stringify({
		fields: ["greeting_text"],
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

	const response = await fetch(`/api/contact-page?${query}`);
	if (!response.ok) {
		error(response.status, `${response.statusText}`);
	}
	const { data: contactPageData } = await response.json();

	return {
		page_data: contactPageData,
		media_url: PUBLIC_MEDIA_URL,
	};
};
