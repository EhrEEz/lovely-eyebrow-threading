import qs from "qs";

export async function GET({ url, fetch }) {
	const queryString = url.searchParams.toString();
	const params = qs.parse(queryString);
	const pagination = params.pagination;
	if (typeof pagination === "object" && pagination !== null && "page" in pagination && "pageSize" in pagination) {
		const query = qs.stringify({
			fields: ["announcement_text"],
			populate: {
				announcement_media: {
					fields: ["url", "alternativeText", "formats", "caption"],
					populate: "*",
				},
			},

			sort: [
				{
					publishedAt: "desc",
				},
			],
			pagination: {
				page: pagination.page,
				pageSize: pagination.pageSize,
			},
		});
		const res = await fetch(`/api/announcements?${query}`);

		const data = await res.json();
		return new Response(JSON.stringify(data));
	}
}
