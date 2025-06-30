import { SECRET_TURNSTILE_KEY } from "$env/static/private";
import type { PageServerLoad } from "./$types";
import { PUBLIC_MEDIA_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import qs from "qs";
import { fail } from "@sveltejs/kit";
import type { User } from "$lib/types/variables";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get("token")) {
		redirect(302, "/new-post/create");
	}
	return {
		media_url: PUBLIC_MEDIA_URL,
	};
};

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

export const actions = {
	login: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const email = data.get("email") as string;
		const password = data.get("password") as string;
		const secret_key = SECRET_TURNSTILE_KEY;
		const token = data.get("cf-turnstile-response") as string;
		const { success, error } = await validateToken(token, secret_key);

		if (!email) {
			console.log("Email is missing");
			return fail(400, { email, missing: true });
		}
		if (!password) {
			console.log("Password is missing");
			return fail(400, { password, missing: true });
		}
		if (!success) {
			console.log("Invalid Captcha");
			return fail(400, { error: error || "Invalid Captcha", token_error: true });
		}

		const res = await fetch("/api/auth/local", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier: email,
				password,
			}),
		});
		if (res.ok) {
			const data: { user: User; jwt: string } = await res.json();

			if (data) {
				cookies.set("token", data.jwt, {
					path: "/",
					httpOnly: true,
					secure: true,
					sameSite: "strict",
					maxAge: 60 * 60 * 24 * 7 * 2, // 2 weeks
				});
				return redirect(302, "/new-post/create");
			}
		} else {
			const errorData = await res.json();
			console.log("Failed", errorData);
			return fail(res.status, { error: errorData.error.message });
		}
	},
};
