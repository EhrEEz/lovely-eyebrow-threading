import { redirect } from "@sveltejs/kit";
import type { User } from "$lib/types/variables";
import { PUBLIC_MEDIA_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import qs from "qs";

export const load = async ({ cookies, fetch }) => {
	const token = cookies.get("token");
	if (!token) {
		return redirect(302, "/new-post");
	}
	try {
		const res = await fetch("/auth-api/users/me");
		if (res.ok) {
			const user: User = await res.json();
			if (!user || user.blocked) {
				return redirect(302, "/new-post");
			}
			const query = qs.stringify({
				fields: ["name", "text_color"],
				populate: {
					story_portrait: {
						fields: ["url", "alternativeText", "formats"],
						populate: "*",
					},
					background_portrait: {
						fields: ["url", "alternativeText", "formats"],
						populate: "*",
					},
					background_square: {
						fields: ["url", "alternativeText", "formats"],
						populate: "*",
					},
					background_landscape: {
						fields: ["url", "alternativeText", "formats"],
						populate: "*",
					},
				},
			});
			const response = await fetch(`/api/announcement-templates?${query}`);
			if (!response.ok) {
				error(response.status, `${response.statusText}`);
			}
			const { data: templates_data } = await response.json();
			if (templates_data.length > 0) {
				return {
					templates: templates_data,
					media_url: PUBLIC_MEDIA_URL,
					user,
				};
			}
			return {
				templates: [],
				media_url: PUBLIC_MEDIA_URL,
				user,
			};
		} else {
			error(res.status, {
				message: res.statusText || "Failed to fetch user data",
			});
		}
	} catch (err: any) {
		error(err.status, {
			message: err.message,
		});
	}
};
