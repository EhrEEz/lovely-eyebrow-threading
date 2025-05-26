import { error } from "@sveltejs/kit";
import type { Service, Gallery } from "$lib/types/variables";

export const load = async ({ params, locals }) => {
	const slug = params.slug;
	const asset_url = "http://127.0.0.1:8090/api/files/services";
	const gallery_url = "http://127.0.0.1:8090/api/files/gallery";
	const request = await locals.pb
		.collection("services")
		.getFirstListItem(`slug='${slug}'`)
		.then((res) => {
			if (res) {
				return { service: res as Service };
			}
		})
		.catch((err) => {
			console.error(err.originalError);
			error(err.status, err.response.message);
		});

	const gallery_request = await locals.pb
		.collection("gallery")
		.getList(1, 4, {
			filter: `service~'${request?.service.id}' && is_enabled=true`,
		})
		.then((res) => {
			if (res) {
				console.log(res);
				return { gallery: res.items as Gallery[] };
			}
		})
		.catch((err) => {
			console.error(err.originalError);
			error(err.status, err.response.message);
		});
	return {
		service: request?.service,
		gallery: gallery_request?.gallery,
		gallery_url,
		asset_url,
	};
};
