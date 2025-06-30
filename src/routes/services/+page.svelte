<script lang="ts">
	import { Marquee } from "@selemondev/svelte-marquee";
	import ServiceImage from "$lib/components/slider/service/ServiceImage.svelte";
	import Seo from "$lib/components/seo/SEO.svelte";
	const { data } = $props();
	const services = $state(data.services);
	const page_info = $state(data.page_info);

	const media_url = $state(data.media_url);

	let serviceRefs: ServiceImage[] = $state([]);

	$effect(() => {
		serviceRefs.map((serviceRef, index) => {
			setTimeout(
				() => {
					if (serviceRef) {
						serviceRef.animateText();
					}
				},
				+((index + 1) * 0.15 * 1000).toFixed(2)
			);
		});
	});
</script>

<Seo {media_url} siteSettings={data.siteSettings} pageSettings={page_info.page_info} />
<main>
	<section class="mt-24 lg:mt-48 py-16 lg:py-24">
		<Marquee
			class="gap-[3rem] [--duration:20s] [--gap:3rem] "
			innerClassName="gap-[3rem] motion-reduce:animate-none motion-reduce:first:hidden"
		>
			<h3 class="text-7xl lg:text-9xl !leading-none">{page_info.page_info.page_title}</h3>
			<div class="text-7xl lg:text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
			<h3 class="text-7xl lg:text-9xl !leading-none">{page_info.page_info.page_title}</h3>
			<div class="text-7xl lg:text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
			<h3 class="text-7xl lg:text-9xl !leading-none">{page_info.page_info.page_title}</h3>
			<div class="text-7xl lg:text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
			<h3 class="text-7xl lg:text-9xl !leading-none">{page_info.page_info.page_title}</h3>
			<div class="text-7xl lg:text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
		</Marquee>
	</section>
	<section class="service__section pb-24 lg:pb-64">
		<div class="container">
			{#if services && services.length > 0}
				<div class="w-full">
					<ul class="grid md:grid-cols-2 service__list md:gap-8 lg:w-10/12 mx-auto">
						{#each services as service, index}
							<li class="service__item">
								<a
									href="/services/{service.slug}"
									data-sveltekit-reload
									class="block {(index + 1) % 2 === 0
										? 'md:-translate-x-4 lg:translate-x-0 md:translate-y-24 lg:translate-y-36 xl:translate-y-48 2xl:translate-y-64'
										: 'md:translate-x-4 lg:translate-x-0'}"
								>
									<ServiceImage
										image={media_url + service.cover.url}
										text={service.name}
										ind={index}
										bind:this={serviceRefs[index]}
									/>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{:else}
				<p class="text-center text-2xl pt-64 pb-48">No services available at the moment.</p>
			{/if}
		</div>
	</section>
</main>
