<script lang="ts">
	import { marked } from "marked";
	import "$lib/scss/pages/_blogs.scss";
	import Seo from "$lib/components/seo/SEO.svelte";
	const { data } = $props();
	const tocContent = $derived(data.toc);
	const siteSettings = $state(data.siteSettings);
	const media_url = $derived(data.media_url);
</script>

<Seo pageSettings={tocContent.page_info} {siteSettings} {media_url} />
<main class="mt-56">
	<div class="container">
		<article>
			<h1 class="text-5xl md:text-7xl text-center mb-8">{tocContent.title}</h1>
			<div class="grid grid-cols-12 my-8 md:my-24">
				<div
					class="content-wrapper col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-7 xl:col-start-3"
					id="contentTop"
				>
					{@html marked(tocContent.content)}
				</div>
			</div>
		</article>
	</div>
</main>
