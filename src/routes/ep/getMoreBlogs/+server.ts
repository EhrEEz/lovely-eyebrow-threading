import qs from "qs";

export async function GET({ url, fetch }) {
	const queryString = url.searchParams.toString();
	const params = qs.parse(queryString);
	const pagination = params.pagination;
	if (typeof pagination === "object" && pagination !== null && "page" in pagination && "pageSize" in pagination) {
		const query = qs.stringify({
			fields: ["title", "slug", "description", "publishedAt"],
			populate: {
				cover: {
					fields: ["alt"],
					populate: {
						media: {
							fields: ["url", "alternativeText", "formats"],
							populate: "*",
						},
					},
				},
				article_tag: {
					populate: {
						fields: ["title"],
					},
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
		const res = await fetch(`/api/articles?${query}`);

		const data = await res.json();
		return new Response(JSON.stringify(data));
	}
}
