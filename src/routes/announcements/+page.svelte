<script lang="ts">
	import Button from "$lib/components/buttons/Button.svelte";
	import Seo from "$lib/components/seo/SEO.svelte";
	import Zoom from "svelte-medium-image-zoom";

	import "svelte-medium-image-zoom/dist/styles.css";
	const { data } = $props();
	const announcements = $derived(data.announcements);
	const meta = $state(data.meta);
	const page_info = $derived(data.page_info.page_info);
	const media_url = $derived(data.media_url);
	$inspect(announcements);
	let page = $state(meta.pagination.page);
	let pageCount = $state(meta.pagination.pageCount);
	let announcements_large: typeof data.announcements = $state(data.announcements);
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
		const res = await fetch(`/ep/getMoreAnnouncements?${params.toString()}`);
		const json = await res.json();
		const olderAnnouncements: typeof announcements = json.data;

		announcements_large = [...announcements_large, ...olderAnnouncements];
		page = json.meta.pagination.page;
		pageCount = json.meta.pagination.pageCount;
		loading = false;
	};
</script>

<Seo siteSettings={data.siteSettings} {media_url} pageSettings={page_info} />
<main class="mt-48 lg:mt-64">
	<h2 class="text-center text-6xl md:text-7xl lg:text-9xl">Announcements</h2>

	<section class="compare__section py-16 md:py-20 lg:py-32" aria-describedby="GalleryDescription">
		{#await announcements then}
			<div class="container">
				{#if announcements_large.length === 0}
					<section class="pt-64 pb-48">
						<div class="text-5xl text-center text-text-light font-serif">No Announcements Yet</div>
					</section>
				{:else}
					<div class="grid lg:grid-cols-2 gap-4">
						{#each announcements_large as announcement}
							<div class="zoom__wrapper relative group/link overflow-hidden rounded-md bg-black aspect-square">
								<Zoom>
									<img
										loading="lazy"
										class="rounded-md group-hover/link:opacity-80 group-hover/link:transition transition w-full h-full object-cover"
										src={media_url + announcement.announcement_media.url}
										srcset="
			{announcement.announcement_media.formats.thumbnail
											? `${media_url + announcement.announcement_media.formats.thumbnail.url} 234w,`
											: ''}
			{announcement.announcement_media.formats.small
											? `${media_url + announcement.announcement_media.formats.small.url} 500w,`
											: ''}
			{announcement.announcement_media.formats.medium
											? `${media_url + announcement.announcement_media.formats.medium.url} 750w,`
											: ''}
			{announcement.announcement_media.formats.large
											? `${media_url + announcement.announcement_media.formats.large.url} 1000w,`
											: ''}"
										alt={announcement.announcement_text ?? announcement.announcement_media.alternativeText}
									/>
								</Zoom>
								<span
									class="aspect-square rounded-full w-8 bg-primary-20 flex items-center justify-center absolute bottom-4 right-4 z-10 opacity-0 group-hover/link:opacity-100 transition"
								>
									<svg width="14" height="14" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M4.04646 3.28602C3.84439 3.28602 3.65059 3.36629 3.50771 3.50917C3.36482 3.65206 3.28455 3.84585 3.28455 4.04792V5.57173C3.28455 5.99252 2.94344 6.33364 2.52265 6.33364C2.10186 6.33364 1.76074 5.99252 1.76074 5.57173V4.04792C1.76074 3.44171 2.00156 2.86033 2.43021 2.43168C2.85887 2.00302 3.44025 1.76221 4.04646 1.76221H5.57027C5.99105 1.76221 6.33217 2.10332 6.33217 2.52411C6.33217 2.9449 5.99105 3.28602 5.57027 3.28602H4.04646ZM12.4274 2.52411C12.4274 2.10332 12.7685 1.76221 13.1893 1.76221H14.7131C15.3193 1.76221 15.9007 2.00302 16.3294 2.43168C16.758 2.86033 16.9988 3.44171 16.9988 4.04792V5.57173C16.9988 5.99252 16.6577 6.33364 16.2369 6.33364C15.8161 6.33364 15.475 5.99252 15.475 5.57173V4.04792C15.475 3.84585 15.3948 3.65206 15.2519 3.50917C15.109 3.36629 14.9152 3.28602 14.7131 3.28602H13.1893C12.7685 3.28602 12.4274 2.9449 12.4274 2.52411ZM2.52265 12.4289C2.94344 12.4289 3.28455 12.77 3.28455 13.1908V14.7146C3.28455 14.9167 3.36482 15.1105 3.50771 15.2533C3.65059 15.3962 3.84439 15.4765 4.04646 15.4765H5.57027C5.99105 15.4765 6.33217 15.8176 6.33217 16.2384C6.33217 16.6592 5.99105 17.0003 5.57027 17.0003H4.04646C3.44025 17.0003 2.85887 16.7595 2.43021 16.3308C2.00156 15.9022 1.76074 15.3208 1.76074 14.7146V13.1908C1.76074 12.77 2.10186 12.4289 2.52265 12.4289ZM16.2369 12.4289C16.6577 12.4289 16.9988 12.77 16.9988 13.1908V14.7146C16.9988 15.3208 16.758 15.9022 16.3294 16.3308C15.9007 16.7595 15.3193 17.0003 14.7131 17.0003H13.1893C12.7685 17.0003 12.4274 16.6592 12.4274 16.2384C12.4274 15.8176 12.7685 15.4765 13.1893 15.4765H14.7131C14.9152 15.4765 15.109 15.3962 15.2519 15.2533C15.3948 15.1105 15.475 14.9167 15.475 14.7146V13.1908C15.475 12.77 15.8161 12.4289 16.2369 12.4289Z"
											fill="white"
										/>
									</svg>
								</span>
							</div>
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
			</div>
		{/await}
	</section>
</main>
