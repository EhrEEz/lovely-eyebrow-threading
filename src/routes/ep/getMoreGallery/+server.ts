import qs from "qs";

export async function GET({ url, fetch }) {
	const queryString = url.searchParams.toString();
	const params = qs.parse(queryString);
	const pagination = params.pagination;
	if (typeof pagination === "object" && pagination !== null && "page" in pagination && "pageSize" in pagination) {
		const query = qs.stringify({
			populate: {
				before: {
					fields: ["alt"],
					populate: {
						media: {
							fields: ["url", "alternativeText", "formats", "caption"],
							populate: "*",
						},
					},
				},
				after: {
					fields: ["alt"],
					populate: {
						media: {
							fields: ["url", "alternativeText", "formats", "caption"],
							populate: "*",
						},
					},
				},
				services: {
					fields: ["name", "slug"],
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
		const res = await fetch(`/api/	?${query}`);

		const data = await res.json();
		return new Response(JSON.stringify(data));
	}
}
