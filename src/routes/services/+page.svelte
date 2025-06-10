<script lang="ts">
	import { Marquee } from "@selemondev/svelte-marquee";
	import ServiceImage from "$lib/components/slider/service/ServiceImage.svelte";
	const { data } = $props();
	const services = $state(data.services);
	const page_info = $state(data.page_info);

	const media_url = $state(data.media_url);
	let ready = $state(false);

	let serviceRefs: ServiceImage[] = $state([]);

	$effect(() => {
		ready = true;

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

{#if ready}
	<main>
		<section class="mt-48 py-24">
			<Marquee
				class="gap-[3rem] [--duration:20s] [--gap:3rem] "
				innerClassName="gap-[3rem] motion-reduce:animate-none motion-reduce:first:hidden"
			>
				<h3 class="text-9xl !leading-none">{page_info.page_info.page_title}</h3>
				<div class="text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
				<h3 class="text-9xl !leading-none">{page_info.page_info.page_title}</h3>
				<div class="text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
				<h3 class="text-9xl !leading-none">{page_info.page_info.page_title}</h3>
				<div class="text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
				<h3 class="text-9xl !leading-none">{page_info.page_info.page_title}</h3>
				<div class="text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
			</Marquee>
		</section>
		<section class="service__section pb-64">
			<div class="container">
				{#if services && services.length > 0}
					<ul class="grid grid-cols-2 service__list gap-12 w-10/12 mx-auto">
						{#each services as service, index}
							<li class="service__item">
								<a href="/services/{service.slug}" class="block {(index + 1) % 2 === 0 ? 'translate-y-64' : ''}">
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
				{:else}
					<p class="text-center text-2xl pt-64 pb-48">No services available at the moment.</p>
				{/if}
			</div>
		</section>
	</main>
{/if}
