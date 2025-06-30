import { error } from "@sveltejs/kit";
import qs from "qs";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ fetch }) => {
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
		const response: Response = await fetch(`/api/terms-of-service?${query}`);
		if (response.ok) {
			const { data } = await response.json();
			if (data) {
				return {
					toc: data,
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
