import { SECRET_API_TOKEN, SECRET_API_URL } from "$env/static/private";
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
