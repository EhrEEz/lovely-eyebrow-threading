<script lang="ts">
	import { gsap } from "gsap";
	import { Marquee } from "$lib/components/mq";
	import ServiceImage from "$lib/components/slider/service/ServiceImage.svelte";
	import Seo from "$lib/components/seo/SEO.svelte";
	import { afterNavigate } from "$app/navigation";
	const { data } = $props();
	const services = $state(data.services);
	const page_info = $state(data.page_info);

	const media_url = $state(data.media_url);

	let serviceRefs: ServiceImage[] = $state([]);
	afterNavigate(() => {
		gsap.utils.toArray(".service__item").forEach((emt) => {
			gsap
				.timeline()
				.addLabel("start")
				.from(emt as HTMLElement, {
					scrollTrigger: {
						trigger: emt as HTMLElement,
						start: "top 90%",
						toggleActions: "play none none none",
						onEnter: (sct) => {
							setTimeout(() => {
								const ind = [...sct.trigger!.parentNode!.children].indexOf(sct.trigger!);
								serviceRefs[ind].animateText();
							}, 400);
						},
					},
					y: 20,
					opacity: 0,
					duration: 0.4,
					ease: "power1.out",
					stagger: 0.5,
				});
		});
	});
</script>

<Seo {media_url} siteSettings={data.siteSettings} pageSettings={page_info.page_info} />
<main>
	<section class="mt-24 lg:mt-48 py-16 lg:py-24">
		<Marquee separator="-">
			{page_info.page_info.page_title}
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
