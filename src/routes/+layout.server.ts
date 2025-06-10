import type { LayoutServerLoad } from "./$types";

import { PUBLIC_MEDIA_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import qs from "qs";

export const load: LayoutServerLoad = async ({ fetch }) => {
	const query = qs.stringify({
		fields: ["name", "description", "tagline", "booking_link"],
		populate: {
			contact: {
				populate: {
					address: {
						fields: ["street", "city", "state", "zip_code", "state_code", "map_link"],
					},
					phone_numbers: {
						fields: ["phone_number"],
					},
					emails: {
						fields: ["email"],
					},
				},
			},
			global_seo: {
				fields: ["site_name", "title_suffix", "default_title", "default_keywords"],
				populate: {
					default_og_image: {
						fields: ["formats"],
					},
				},
			},
			opening_hours: {
				fields: ["day_range", "opening_timing"],
			},
			social_media: {
				fields: ["instagram", "facebook", "linkedin", "x", "tiktok", "yelp", "youtube"],
			},
			cta: {
				fields: ["cta"],
			},
		},
	});

	const response = await fetch(`/api/site-setting?${query}`);
	if (response.ok) {
		const { data } = await response.json();
		return {
			media_url: PUBLIC_MEDIA_URL,
			siteSettings: data,
		};
	}
	error(response.status, {
		message: response.statusText,
	});
};
