import PocketBase from "pocketbase";

export const handle = async ({ event, resolve }) => {
	const url = "http://127.0.0.1:8090";
	event.locals.pb = new PocketBase(url);

	const response = await resolve(event);

	return response;
};
