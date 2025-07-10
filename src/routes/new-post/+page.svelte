<script lang="ts">
	import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
	import { Turnstile } from "svelte-turnstile";
	import "$lib/scss/components/_input.scss";
	import { z } from "zod";
	import Button from "$lib/components/buttons/Button.svelte";
	type ErrorType = {
		email?: string;
		password?: string;
	};

	let errors: ErrorType = $state({});

	let email = $state("");
	let password = $state("");
	let formLoading = $state(true);

	const formData = $derived({
		email: email,
		password: password,
	});

	const schema = z.object({
		email: z.string().min(1, "Email is required").email("Invalid Email"),
		password: z.string().min(1, "Password is required"),
	});
	let { form } = $props();

	$effect(() => {
		const result = schema.safeParse(formData);
		if (!result.success) {
			errors = result.error.flatten().fieldErrors as ErrorType;
			formLoading = true;
		} else {
			errors = {};
			formLoading = false;
		}
	});
</script>

<main class="mt-48 md:mt-36 lg:mt-48 xl:mt-64">
	<div class="container">
		<div class="max-w-full md:max-w-[600px] md:mx-auto">
			<h2 class="text-6xl text-center">You've Stumbled upon a protected page.</h2>
			<form method="post" action="?/login">
				<div class="form-group xl:my-10">
					<label for="email">
						<input
							type="email"
							placeholder="Type your Email Address"
							class="form-control"
							required
							bind:value={email}
							name="email"
							data-input-value={email}
							tabindex={0}
							class:error={errors.email}
						/>
						<div class="form-label required mb-2">Email Address</div>
						<div class="error-message">{errors.email}</div>
					</label>
				</div>
				<div class="form-group xl:my-10">
					<label for="password">
						<input
							type="password"
							placeholder="Type your password"
							class="form-control"
							name="password"
							required
							bind:value={password}
							class:error={errors.password}
							data-input-value={password.length ? password.length : ""}
						/>
						<div class="form-label required mb-2">Password</div>
						<div class="error-message">{errors.password}</div>
					</label>
				</div>
				{#if form?.status != 200}
					<div class="text-red-900 mb-3">
						{form?.error}
					</div>
				{/if}
				<div class="mb-3">
					<Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} theme="light" />
				</div>
				<div class="form-group">
					<Button disabled={formLoading} size="lg" type="submit">Send Message</Button>
				</div>
			</form>
		</div>
	</div>
</main>
