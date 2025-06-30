<script lang="ts">
	import Compare from "$lib/components/compare/Compare.svelte";
	import Seo from "$lib/components/seo/SEO.svelte";
	const { data } = $props();
	const gallery = $derived(data.gallery);
	const page_info = $derived(data.page_info.page_info);
	const media_url = $derived(data.media_url);
</script>

<Seo siteSettings={data.siteSettings} {media_url} pageSettings={page_info} />
<main class="mt-48 lg:mt-64">
	<h2 class="text-center text-6xl md:text-7xl lg:text-9xl">
		Transformation <div>Gallery</div>
	</h2>

	<section class="compare__section py-16 md:py-20 lg:py-32" aria-describedby="GalleryDescription">
		<div class="container mb-8">
			<p class="text-center uppercase text-xl" id="GalleryDescription">
				Move mouse left and right over image to compare before & after of transformations.
			</p>
		</div>
		<div class="container">
			<div class="grid lg:grid-cols-2 gap-4">
				{#each gallery as item (item.id)}
					<Compare
						config={{
							before: item.before,
							after: item.after,
						}}
						{media_url}
						tags={item.services}
					/>
				{/each}
			</div>
		</div>
	</section>
</main>
