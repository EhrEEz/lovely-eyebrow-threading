import { PUBLIC_MEDIA_URL as media_url } from "$env/static/public";
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
		const response = await fetch(`/api/announcement-page?${query}`);
		if (!response.ok) {
			error(response.status, `${response.statusText}`);
		}
		const { data: announcementPageData } = await response.json();
		const announcementsQuery = qs.stringify({
			fields: ["announcement_text"],
			populate: {
				announcement_media: {
					fields: ["url", "alternativeText", "formats", "caption"],
					populate: "*",
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

		const announcementResponse = await fetch(`/api/announcements?${announcementsQuery}`);

		if (!announcementResponse.ok) {
			error(announcementResponse.status, `${announcementResponse.statusText}`);
		}
		const { data: announcement_data, meta } = await announcementResponse.json();
		return {
			page_info: announcementPageData,
			announcements: announcement_data,
			meta,
			media_url,
		};
	} catch (err: any) {
		console.log(err);
		error(err.status, {
			message: err.message,
		});
	}
};
