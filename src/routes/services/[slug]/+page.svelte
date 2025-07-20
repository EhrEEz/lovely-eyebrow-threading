<script lang="ts">
	import { gsap } from "gsap";
	import { Marquee } from "$lib/components/mq";
	import Zoom from "svelte-medium-image-zoom";
	import "svelte-medium-image-zoom/dist/styles.css";
	import Button from "$lib/components/buttons/Button.svelte";
	import Compare from "$lib/components/compare/Compare.svelte";
	import Swiper from "swiper";
	import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
	import { afterNavigate } from "$app/navigation";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { SplitText } from "gsap/SplitText";

	import "swiper/swiper-bundle.css";
	import Seo from "$lib/components/seo/SEO.svelte";
	const { data } = $props();
	const service = $derived(data.service);
	const gallery = $derived(service.transformations);
	const service_inners = $derived(service.service_inners);
	const media_url = $derived<string>(data.media_url ?? "/");
	let _swiper_service_inners: Swiper;
	let serviceInnerSlider: HTMLElement;
	let nextServiceInnerSlide: HTMLButtonElement;
	let prevServiceInnerSlide: HTMLButtonElement;
	$effect(() => {
		gsap.registerPlugin(ScrollTrigger, SplitText);
		_swiper_service_inners = new Swiper(serviceInnerSlider, {
			modules: [Navigation, Autoplay, EffectCoverflow],
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			slidesPerView: "auto",
			spaceBetween: 40,
			grabCursor: true,
			navigation: {
				nextEl: nextServiceInnerSlide,
				prevEl: prevServiceInnerSlide,
			},
			effect: "coverflow",
			coverflowEffect: {
				rotate: 100,
				stretch: 0,
				depth: 150,
				modifier: 1,
				slideShadows: false,
			},
		});
		_swiper_service_inners;
		if (service.pictures && service.pictures.length > 0) {
			const servicePicturesTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: ".sevice__pictures-section",
					toggleActions: "play none none none",
					start: "top 75%",
				},
			});
			const serviceTitleSplit = SplitText.create(".service__pictures-title", { type: "chars" });
			servicePicturesTimeline
				.addLabel("start")
				.from(
					serviceTitleSplit.chars,
					{
						opacity: 0,
						translateY: "1em",
						duration: 0.8,
						stagger: 0.015,
					},
					"start"
				)
				.from(
					".service__picture",
					{
						opacity: 0,
						translateY: -20,
						duration: 0.8,
						stagger: 0.15,
					},
					"start+=0.2"
				);
		}
	});

	afterNavigate(() => {
		const titleSplit = SplitText.create(".service__title", { type: "words" });
		const articleTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: ".main__section",
				start: "top 80%",
				toggleActions: "play none none none",
			},
			delay: 0.6,
		});
		articleTimeline
			.addLabel("start")
			.from(titleSplit.words, {
				opacity: 0,
				translateY: "0.4em",
				skewY: 3,
				duration: 0.8,
				stagger: 0.15,
			})
			.from(
				".service__image",
				{
					opacity: 0,
					duration: 1,
					stagger: 0.015,
				},
				"start"
			)
			.from(
				".service__description",
				{
					opacity: 0,
					duration: 0.8,
					stagger: 0.015,
				},
				"start+=0.4"
			);
		if (gallery && gallery.length > 0) {
			const transformationsTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: ".gallery__section",
					start: "top 90%",
					toggleActions: "play none none none",
				},
				delay: 1.2,
			});
			transformationsTimeline
				.addLabel("start")
				.from(
					".transformation__title",
					{
						opacity: 0,
						translateY: "0.4em",
						duration: 0.6,
						stagger: 0.07,
					},
					"start"
				)
				.from(
					".compare__wrapper",
					{
						opacity: 0,
						translateY: -20,
						duration: 0.4,
						stagger: 0.2,
					},
					"start+=0.2"
				);
		}
	});
</script>

<Seo
	{media_url}
	siteSettings={data.siteSettings}
	pageSettings={{
		page_seo: service.seo,
		page_title: service.name,
	}}
/>
<main class="mt-32 lg:mt-56">
	<section class="main__section my-24 lg:my-36 xl:my-48">
		<div class="container">
			<div class="grid grid-cols-12 items-center md:gap-12">
				<div class="col-span-12 md:col-span-6 lg:pe-16 xl:pe-24 xl:px-24 mb-12 lg:mb-0">
					<div class="overflow-hidden ellipse-image rotate-12 service__image" data-lag="0.15">
						<img
							loading="lazy"
							class="w-full"
							src={media_url + service.cover.formats.thumbnail.url}
							srcset="
			{service.cover.formats.thumbnail ? `${media_url + service.cover.formats.thumbnail.url} 234w,` : ''}
			{service.cover.formats.small ? `${media_url + service.cover.formats.small.url} 500w,` : ''}
			{service.cover.formats.medium ? `${media_url + service.cover.formats.medium.url} 750w,` : ''}
			{service.cover.formats.large ? `${media_url + service.cover.formats.large.url} 1000w,` : ''}"
							alt={service.cover.alternativeText ?? `Cover of ${service.name}`}
						/>
					</div>
				</div>
				<div class="col-span-12 md:col-span-6" data-lag="0.2">
					<h1 class="text-6xl break-words md:break-normal lg:text-8xl mb-4 service__title">{service.name}</h1>
					<p class="lg:pe-24 leading-8 service__description">
						{service.description}
					</p>
					{#if service.booking_link}
						<Button href={service.booking_link} class="service__link">Book Now</Button>
					{/if}
				</div>
			</div>
		</div>
	</section>
	{#if gallery && gallery.length > 0}
		<section class="gallery__section my-24 lg:my-36 xl:my-48">
			<div class="container">
				<h2 class="text-4xl lg:text-6xl mb-8 break-words transformation__title">
					Transformations Including {service?.name}
				</h2>
				<div class="grid md:grid-cols-2 gap-6 lg:gap-12">
					{#each gallery as item (item.id)}
						<div class="compare__wrapper">
							<Compare
								config={{
									before: item.before,
									after: item.after,
								}}
								{media_url}
								tags={item.services}
							/>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<section class="my-24 md:my-36 lg:my-36 xl:my-48">
		<Marquee separator="-">
			{service.tagline}
		</Marquee>
	</section>
	{#if service_inners && service_inners.length > 0}
		<section class="mt-24 lg:mt-36 xl:mt-48 mb-36 lg:mb-48 xl:mb-64 service__inners relative">
			<div class="container">
				<div class="swiper" bind:this={serviceInnerSlider}>
					<div class="swiper-wrapper">
						{#each service_inners as service_inner, ind}
							<div class="swiper-slide" id="service-inner-{ind}">
								<div class="inner__slide flex flex-col md:flex-row items-center gap-8 md:gap-12">
									<div class="md:w-1/2 lg:pe-20">
										<h2 class="font-sans font-normal text-2xl mb-6 uppercase">{service_inner.name}</h2>
										<p class="lg:text-lg leading-7 lg:leading-9">
											{service_inner.description}
										</p>
									</div>
									<div class="md:w-1/2">
										<div class="rounded-md md:rounded-lg lg:rounded-xxl overflow-hidden relative">
											<img
												loading="lazy"
												class="aspect-[3/2] w-full object-cover"
												src={media_url + service_inner.cover.url}
												srcset="
						{service_inner.cover.formats.thumbnail ? `${media_url + service_inner.cover.formats.thumbnail.url} 234w,` : ''}
						{service_inner.cover.formats.small ? `${media_url + service_inner.cover.formats.small.url} 500w,` : ''}
						{service_inner.cover.formats.medium ? `${media_url + service_inner.cover.formats.medium.url} 750w,` : ''}
						{service_inner.cover.formats.large ? `${media_url + service_inner.cover.formats.large.url} 1000w,` : ''}"
												alt={service_inner.cover.alt ?? service_inner.cover.alternativeText ?? `About Section`}
											/>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="button__wrapper absolute left-1/2 bottom-0 translate-y-1/2 z-10">
				<button class="arrow_button prev__button" bind:this={prevServiceInnerSlide} aria-label="Previous Slide">
					<svg fill="none" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg"
						><g clip-rule="evenodd" fill="rgb(255,255,255)" fill-rule="evenodd"
							><path d="m3.24951 11.25h17.49979v1.5h-17.49979z"></path><path
								d="m3.99962 12.75c3.52755 0 6.41008-3.10214 6.41008-6.41005v-.75h-1.50003v.75c0 2.51158-2.24266 4.91005-4.91005 4.91005h-.75011v1.5z"
							></path><path
								d="m3.99962 11.25c3.52755 0 6.41008 3.1021 6.41008 6.41v.75h-1.50003v-.75c0-2.5115-2.24266-4.91-4.91005-4.91h-.75011v-1.5z"
							></path></g
						>
					</svg>
				</button>
				<button class="arrow_button next__button" bind:this={nextServiceInnerSlide} aria-label="Next Slide">
					<svg width="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7505 11.25H3.2507V12.75H20.7505V11.25Z" fill="white" />
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M20.0004 12.75C16.4728 12.75 13.5903 9.64788 13.5903 6.33997V5.58997H15.0903V6.33997C15.0903 8.85155 17.333 11.25 20.0004 11.25H20.7505V12.75H20.0004Z"
							fill="white"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M20.0004 11.25C16.4728 11.25 13.5903 14.3521 13.5903 17.66V18.41H15.0903V17.66C15.0903 15.1485 17.333 12.75 20.0004 12.75H20.7505V11.25H20.0004Z"
							fill="white"
						/>
					</svg>
				</button>
			</div>
		</section>
	{/if}
	{#if service.pictures && service.pictures.length > 0}
		<section class="mb-24 lg:mb-36 xl:mb-48 sevice__pictures-section">
			<div class="container">
				<h2 class="break-words text-4xl md:text-6xl text-center mb-8 md:mb-16 service__pictures-title">
					Some more Samples
				</h2>
				<div class="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
					{#each service.pictures as picture, ind}
						<div class="zoom__wrapper relative group/link overflow-hidden rounded-md bg-black service__picture">
							<Zoom>
								<img
									loading="lazy"
									class="rounded-md group-hover/link:opacity-80 group-hover/link:transition transition"
									src={media_url + picture.formats.thumbnail.url}
									srcset="
			{picture.formats.thumbnail ? `${media_url + picture.formats.thumbnail.url} 234w,` : ''}
			{picture.formats.small ? `${media_url + picture.formats.small.url} 500w,` : ''}"
									alt={picture.alternativeText ?? `Picture ${ind} of ${service.name}`}
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
			</div>
		</section>
	{/if}
</main>

<style>
	.ellipse-image {
		border-radius: 100%;
	}

	.ellipse-image img {
		aspect-ratio: 4 / 3;
		inline-size: 100%;
		object-fit: cover;
	}
</style>
