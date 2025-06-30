import { error } from "@sveltejs/kit";
import { PUBLIC_MEDIA_URL } from "$env/static/public";
import type { PageServerLoad } from "./$types";
import qs from "qs";

export const load: PageServerLoad = async ({ fetch }) => {
	const media_url = PUBLIC_MEDIA_URL;
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

	const response = await fetch(`/api/service-page?${query}`);
	if (!response.ok) {
		error(response.status, `${response.statusText}`);
	}
	const { data: servicePageData } = await response.json();

	const servicesQuery = qs.stringify({
		fields: ["slug", "name", "cta_link", "description"],
		populate: {
			cover: {
				fields: ["alternativeText", "url"],
			},
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
		},
	});

	const servicesResponse = await fetch(`/api/services?${servicesQuery}`);

	if (!servicesResponse.ok) {
		error(servicesResponse.status, `${servicesResponse.statusText}`);
	}
	const { data: servicesData } = await servicesResponse.json();

	return {
		page_info: servicePageData,
		services: servicesData,
		media_url,
	};
};
