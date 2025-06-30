<script lang="ts">
	import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
	import { Turnstile } from "svelte-turnstile";
	import Modal from "$lib/components/modal/Modal.svelte";
	import { z } from "zod";
	import "$lib/scss/components/_input.scss";
	import Button from "$lib/components/buttons/Button.svelte";

	let email = $state("");
	let password = $state("");
	let formLoading = $state(false);

	let showSuccessModal = $state(false);
	let showErrorModal = $state(false);
	// const handleSubmit = async (event: SubmitEvent) => {
	// 	event.preventDefault();
	// 	const form = event.target as HTMLFormElement | null;
	// };
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
							bind:value={email}
							name="email"
							data-input-value={email}
							tabindex={0}
						/>
						<div class="form-label required mb-2">Email Address</div>
					</label>
				</div>
				<div class="form-group xl:my-10">
					<label for="password">
						<input
							type="password"
							placeholder="Type your password"
							class="form-control"
							name="password"
							bind:value={password}
							data-input-value={password.length ? password.length : ""}
						/>
						<div class="form-label required mb-2">Password</div>
					</label>
				</div>
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
