import { SECRET_API_TOKEN, SECRET_API_URL } from "$env/static/private";
import { PUBLIC_MEDIA_URL } from "$env/static/public";
export const handleFetch = async ({ request, event, fetch }) => {
	const token = SECRET_API_TOKEN;
	let url = request.url;
	const isLocal = url.startsWith(event.url.origin);
	const { pathname, search } = new URL(url);
	const newPathName = isLocal ? pathname : url;
	if (newPathName.startsWith("/api/")) {
		const newURL = newPathName.replace("/api/", SECRET_API_URL);
		const modifiedRequest: Request = new Request(`${newURL}${search}`, {
			method: request.method,
			headers: new Headers({
				...Object.fromEntries(request.headers),
				Authorization: `Bearer ${token}`,
				"Access-Control-Allow-Origin": PUBLIC_MEDIA_URL,
			}),
			body: request.body,
			signal: request.signal,
			//@ts-expect-error
			duplex: request.duplex,
		});
		return fetch(modifiedRequest);
	}

	if (newPathName.startsWith("/auth-api/")) {
		const userToken = event.cookies.get("token");
		if (!userToken) {
			return new Response("Unauthorized", { status: 401 });
		}
		const newURL = newPathName.replace("/auth-api/", SECRET_API_URL);
		const modifiedRequest: Request = new Request(`${newURL}${search}`, {
			method: request.method,
			headers: new Headers({
				...Object.fromEntries(request.headers),
				Authorization: `Bearer ${userToken}`,
				"Access-Control-Allow-Origin": "*",
			}),
			body: request.body,
			signal: request.signal,
			//@ts-expect-error
			duplex: request.duplex,
		});
		return fetch(modifiedRequest);
	}
	return fetch(request);
};
