<script lang="ts">
	import type { User } from "$lib/types/variables";
	import { userState } from "$lib/user/user.svelte.js";
	import "$lib/scss/components/_input.scss";
	import Generator from "$lib/components/generator/Generator.svelte";
	const { data } = $props();
	const templates = $state(data.templates);
	const media_url = $derived(data.media_url);
	const user = $derived<User>(data.user);
	$effect(() => {
		if (user && user.username) {
			userState.user = user;
		}
	});
</script>

<main class="mt-24 md:mt-36 lg:mt-48 mb-36 md:mb-48">
	<div class="container">
		<Generator {templates} {media_url} />
	</div>
</main>
