<script lang="ts">
	import Button from "$lib/components/buttons/Button.svelte";
	import Compare from "$lib/components/compare/Compare.svelte";
	import Seo from "$lib/components/seo/SEO.svelte";
	const { data } = $props();
	const gallery = $derived(data.gallery);
	const meta = $state(data.meta);
	const page_info = $derived(data.page_info.page_info);
	const media_url = $derived(data.media_url);
	let page = $state(meta.pagination.page);
	let pageCount = $state(meta.pagination.pageCount);
	let galleries: typeof data.gallery = $state(data.gallery);
	let loading = $state(false);
	const morePages = $derived.by(() => {
		if (meta && pageCount > page) {
			return true;
		}
		return false;
	});
	const loadMore = async () => {
		if (page >= pageCount) return;
		loading = true;

		const params = new URLSearchParams({
			"pagination[page]": page + 1,
			"pagination[pageSize]": "20",
		});
		const res = await fetch(`/ep/getMoreGallery?${params.toString()}`);
		const json = await res.json();
		const additionalGallery: typeof gallery = json.data;

		galleries = [...galleries, ...additionalGallery];
		page = json.meta.pagination.page;
		pageCount = json.meta.pagination.pageCount;
		loading = false;
	};
</script>

<Seo siteSettings={data.siteSettings} {media_url} pageSettings={page_info} />
<main class="mt-48 lg:mt-64">
	<h2 class="text-center text-5xl break-words md:text-7xl lg:text-9xl">
		Transformation <div>Gallery</div>
	</h2>

	<section class="compare__section py-8 md:py-16 lg:py-32" aria-describedby="GalleryDescription">
		<div class="container mb-8">
			<p class="hidden md:block text-center uppercase text-xl" id="GalleryDescription">
				Move mouse left and right over image to compare before & after of the transformation.
			</p>
			<p class="md:hidden text-center uppercase text-xl">
				Tap on left and right (before & after) on the picture to compare before & after of the transformation.
			</p>
		</div>
		<div class="container">
			{#await gallery then}
				{#if galleries.length === 0}
					<section class="pt-64 pb-48">
						<div class="text-3xl md:text-5xl text-center text-text-light font-serif">No Content Yet</div>
					</section>
				{:else}
					<div class="grid lg:grid-cols-2 gap-4">
						{#each galleries as item (item.id)}
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
					{#if morePages}
						<div class="flex justify-center my-24">
							<Button variant="link" onclick={() => loadMore()} disabled={loading}
								>{loading ? "Loading..." : "Load More"}</Button
							>
						</div>
					{/if}
				{/if}
			{/await}
		</div>
	</section>
</main>
