import { error } from "@sveltejs/kit";
import type { Service } from "$lib/types/variables";

export const load = async ({ locals }) => {
	const asset_url = "http://127.0.0.1:8090/api/files/services";
	const request = await locals.pb
		.collection("services")
		.getList(1, 50, {
			sort: "-updated",
		})
		.then((res) => {
			if (res.items) {
				return { services: res.items as Service[] };
			}
		})
		.catch((err) => {
			error(err.status, err.response.message);
		});

	return {
		services: request?.services,
		asset_url,
	};
};
