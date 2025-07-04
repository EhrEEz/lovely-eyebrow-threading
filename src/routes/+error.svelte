<script>
	// @ts-nocheck

	import { page } from "$app/state";
	import { browser } from "$app/environment";

	//functions
	function nav_back() {
		if (browser) window.history.back();
	}
	import Button from "$lib/components/buttons/Button.svelte";
	const errorCodes = {
		100: "Continue – Request received, please continue.",
		200: "OK – Request succeeded.",
		201: "Created – Resource created successfully.",
		400: "Bad Request – The request was malformed or invalid.",
		401: "Unauthorized – Authentication is needed or failed.",
		403: "Forbidden – You don’t have permission to access this.",
		404: "Not Found – The requested resource doesn’t exist.",
		408: "Request Timeout – The server timed out waiting for the request.",
		409: "Conflict – There was a conflict with the current state of the resource.",
		429: "Too Many Requests – You have sent too many requests in a given time.",
		500: "Internal Server Error – Something went wrong on the server.",
		502: "Bad Gateway – Invalid response from an upstream server.",
		503: "Service Unavailable – The server is overloaded or down for maintenance.",
		504: "Gateway Timeout – The upstream server didn’t respond in time.",
	};
	$inspect(errorCodes[404]);
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
	<meta name="googlebot" content="noindex" />
</svelte:head>
<section class="my-48" data-header-gap="true">
	<div class="container">
		<h1 class="text-9xl">{page.status}</h1>
		<h2 class="heading-2 mb-5">{page?.error?.message}</h2>

		<p class="text-lg md:text-xl lg:text-2xl mb-4">{errorCodes[`${page.status}`]}</p>
		<div class="flex gap-4">
			<Button onclick={nav_back} size="lg" variant="secondary">
				<span class="btn__wrapper">
					<span class="btn__text"> Go Back </span>
				</span>
			</Button>
			<Button href="/" size="lg">
				<span class="btn__wrapper">
					<span class="btn__text"> Go Home </span>
				</span>
			</Button>
		</div>
	</div>
</section>
