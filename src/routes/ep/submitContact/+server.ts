import { SECRET_TURNSTILE_KEY } from "$env/static/private";
async function validateToken(token: string, secret: string) {
	const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			response: token,
			secret: secret,
		}),
	});

	const data = await response.json();

	return {
		// Return the status
		success: data.success,

		// Return the first error if it exists
		error: data["error-codes"]?.length ? data["error-codes"][0] : null,
	};
}
export async function POST({ request, fetch }) {
	const data = await request.json();
	const token = data.token;
	const secret_key = SECRET_TURNSTILE_KEY;
	const { success, error } = await validateToken(token, secret_key);

	if (!success) {
		return new Response(
			JSON.stringify({
				error: error || "Invalid Captcha",
				token_error: true,
			})
		);
	}
	delete data.token;
	const res = await fetch(`/api/contacts/`, {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-type": "application/json",
		},
		//tsignore
		// duplex: "half",
		body: JSON.stringify({
			data: {
				...data,
			},
		}),
	});

	if (!res.ok) {
		console.error(res);
		return res;
	}
	const json = await res.json();
	return new Response(JSON.stringify(json));
}
