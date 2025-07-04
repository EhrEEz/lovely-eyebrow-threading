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
	const originalForm = await request.formData();

	// Parse and validate CAPTCHA
	const rawData = JSON.parse(originalForm.get("data") as string);

	const secret_key = SECRET_TURNSTILE_KEY;
	const { success, error } = await validateToken(rawData.token, secret_key);

	if (!success) {
		return new Response(JSON.stringify({ error: error || "Invalid Captcha", token_error: true }), { status: 400 });
	}
	const file = originalForm.get("files.announcement_media");

	const fileFormData = new FormData();
	if (file instanceof File) {
		fileFormData.append("files", file);
	}

	const fileRes = await fetch("/auth-api/upload", {
		method: "post",
		body: fileFormData,
	});
	if (!fileRes.ok) {
		console.error(await fileRes.text());
		return new Response("Strapi upload file failed", { status: 500 });
	}
	const fileJson = await fileRes.json();
	const formData = new FormData();
	// Re-append the corrected JSON structure
	formData.append("data[announcement_text]", rawData.announcement_text);
	formData.append("data[announcement_template]", rawData.announcement_template);
	formData.append("data[announcement_media]", fileJson[0].id);
	const res = await fetch(`/auth-api/announcements`, {
		method: "post",
		body: formData,
	});

	if (!res.ok) {
		console.error(await res.text());
		return new Response("Strapi upload failed", { status: 500 });
	}

	const json = await res.json();
	return new Response(JSON.stringify(json));
}
