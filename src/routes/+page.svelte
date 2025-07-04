<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import * as Article from "$lib/components/cards/article";
	import Button from "$lib/components/buttons/Button.svelte";
	import Generator from "$lib/components/canvas/Generator.svelte";
	import { ServiceSlider } from "$lib/components/slider";
	import { Marquee } from "@selemondev/svelte-marquee";
	import Swiper from "swiper";
	import { Pagination, Autoplay, EffectCreative } from "swiper/modules";
	import Seo from "$lib/components/seo/SEO.svelte";
	import { getContext } from "svelte";
	import type { CTAItem } from "$lib/types/variables.js";
	const { data } = $props();
	const home_data = $state(data.home_data);
	const siteSettings = $state(data.siteSettings);
	const header_section = $state(home_data.header_section);
	const gallery_section = $state(home_data.gallery_section);
	const services = $state(home_data.services_section.services);
	const contact_section = $state(home_data.contact_section);
	const about_section = $state(home_data.about_section);
	const articles = $state(home_data.articles);
	const media_url = $state(data.media_url);
	const testimonials = $state(home_data.testimonial_section.testimonials);

	let testimonialSlider = $state<HTMLElement>();
	let testimonialPagination = $state<HTMLElement>();
	let _testimonial_swiper: Swiper;

	const cta = $state<CTAItem>(getContext("cta"));

	$effect(() => {
		if (testimonialSlider) {
			_testimonial_swiper = new Swiper(testimonialSlider, {
				slidesPerView: 1,
				spaceBetween: 30,
				modules: [Pagination, Autoplay, EffectCreative],
				effect: "creative",
				creativeEffect: {
					prev: {
						shadow: false,
						translate: [0, 0, -400],
					},
					next: {
						translate: ["100%", 0, 0],
					},
				},
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				pagination: {
					el: testimonialPagination,
					clickable: true,
				},
			});
		}
	});
</script>

<Seo pageSettings={home_data.page_info} {siteSettings} {media_url} />

<main>
	<section class="relative header__section overflow-x-clip">
		<div class="container">
			<div class="flex-col flex items-center justify-center min-h-dvh py-64">
				{#if header_section.display_address && siteSettings.contact.address && siteSettings.contact.address.length > 0}
					<div class="flex justify-center gap-4">
						{#each siteSettings.contact.address as address}
							<address
								class="flex items-center justify-center gap-4 not-italic mb-5"
								in:fade={{ duration: 700, delay: 400 }}
							>
								<span class="uppercase">{address.street} </span>
								<span class="uppercase">{address.city}, {address.state_code} {address.zip_code}</span>
							</address>
						{/each}
					</div>
				{/if}
				<h2 class="text-7xl md:text-9xl text-center" id="title-1" in:fly={{ y: 20, duration: 1000, delay: 100 }}>
					{header_section.large_text}
				</h2>
				<h2 class="text-4xl md:text-7xl text-center" id="title-2" in:fly={{ y: -15, duration: 1000, delay: 200 }}>
					{header_section.small_text}
				</h2>
				<div class="flex items-center justify-center gap-6 mt-8" in:fade={{ duration: 300, delay: 600 }}>
					<Button variant="default" size="lg"><span class="btn__text">Book Now</span></Button>
					<Button variant="link" size="lg"><span class="btn__text">Contact Us</span></Button>
				</div>
			</div>
			<div class="floating__image image--1" in:fly={{ y: 25, x: -25, duration: 1000, delay: 400 }}>
				<img
					loading="lazy"
					src={media_url + header_section.left_image.formats.thumbnail.url}
					title={header_section.left_image.name}
					srcset="
			{header_section.left_image.formats.thumbnail
						? `${media_url + header_section.left_image.formats.thumbnail.url} 234w,`
						: ''}
			{header_section.left_image.formats.small ? `${media_url + header_section.left_image.formats.small.url} 500w,` : ''}
			{header_section.left_image.formats.medium ? `${media_url + header_section.left_image.formats.medium.url} 750w,` : ''}
			{header_section.left_image.formats.large ? `${media_url + header_section.left_image.formats.large.url} 1000w,` : ''}"
					alt={header_section.left_image.alternativeText ?? "Header Image 1"}
				/>
			</div>

			<div class="floating__image image--2" in:fly={{ y: 25, x: 25, duration: 1000, delay: 450 }}>
				<img
					loading="lazy"
					src={media_url + header_section.right_image.formats.thumbnail.url}
					title={header_section.right_image.name}
					srcset="
			{header_section.right_image.formats.thumbnail
						? `${media_url + header_section.right_image.formats.thumbnail.url} 234w,`
						: ''}
			{header_section.right_image.formats.small ? `${media_url + header_section.right_image.formats.small.url} 500w,` : ''}
			{header_section.right_image.formats.medium ? `${media_url + header_section.right_image.formats.medium.url} 750w,` : ''}
			{header_section.right_image.formats.large ? `${media_url + header_section.right_image.formats.large.url} 1000w,` : ''}"
					alt={header_section.right_image.alternativeText ?? "Header Image 1"}
				/>
			</div>
		</div>
	</section>
	<ServiceSlider {services} {media_url} />
	<section class="mb-24 mt-36 md:my-36">
		<Marquee
			class="gap-[3rem] [--duration:20s] [--gap:3rem] "
			innerClassName="gap-[3rem] motion-reduce:animate-none motion-reduce:first:hidden"
		>
			<h3 class="text-8xl md:text-9xl !leading-none">{siteSettings.tagline}</h3>
			<div class="text-8xl md:text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
			<h3 class="text-8xl md:text-9xl !leading-none">{siteSettings.tagline}</h3>
			<div class="text-8xl md:text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
			<h3 class="text-8xl md:text-9xl !leading-none">{siteSettings.tagline}</h3>
			<div class="text-8xl md:text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
			<h3 class="text-8xl md:text-9xl !leading-none">{siteSettings.tagline}</h3>
			<div class="text-8xl md:text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
		</Marquee>
	</section>
	{#if about_section}
		<section class="featured-service__section my-24">
			<div class="container lg:flex gap-8 items-center">
				<div class="lg:w-1/2 order-1 mb-10">
					<div class="rounded-lg md:rounded-xxl overflow-hidden relative">
						<h4
							class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white md:px-3 md:py-3 w-full text-4xl md:text-5xl !leading-[1em] px-8"
						>
							{about_section.hook}
						</h4>
						<img
							loading="lazy"
							src={media_url + about_section.cover.media.url}
							srcset="
			{about_section.cover.media.formats.thumbnail
								? `${media_url + about_section.cover.media.formats.thumbnail.url} 234w,`
								: ''}
			{about_section.cover.media.formats.small ? `${media_url + about_section.cover.media.formats.small.url} 500w,` : ''}
			{about_section.cover.media.formats.medium ? `${media_url + about_section.cover.media.formats.medium.url} 750w,` : ''}
			{about_section.cover.media.formats.large ? `${media_url + about_section.cover.media.formats.large.url} 1000w,` : ''}"
							style="width: 100%; height: auto;"
							class="object-cover aspect-[5/6]"
							alt={about_section.cover.alt ?? about_section.cover.media.alternativeText ?? `About Section`}
						/>
					</div>
				</div>
				<div class="lg:w-1/2 lg:pe-20 order-0">
					{#if about_section.title}
						<h2 class="font-sans font-normal text-2xl mb-6 uppercase">{about_section?.title}</h2>
					{/if}
					{#if about_section.description}
						<p class="text-lg leading-9">
							Thanks to modern innovation, achieving full, beautiful brows—even if you weren’t genetically blessed with
							them—is now very attainable: From high-performance brow pencils to brow-growing serums that yield
							impressive results, there are plenty of options for getting thicker brows in just a few swipes or strokes.
							However, if you prefer a fix that doesn’t involve using numerous brow products or filling them in on a
							daily basis, consider giving eyebrow tinting a try.
						</p>
					{/if}
				</div>
			</div>
		</section>
	{/if}
	{#if gallery_section}
		<section class="gallery__section relative w-full flex justify-center lg:py-96 py-48 md:py-72 overflow-x-clip">
			<div class="gallery__text-wrapper w-fit relative flex flex-col items-center">
				<h3 class="text-center">
					<div class="text-5xl lg:text-8xl">Your Eyebrows</div>
					<div class="text-[4.5rem] md:text-[8rem] lg:text-[14rem]">Your Way</div>
				</h3>
				<p class="text-center px-16 lg:px-0 lg:max-w-[50%] my-4 md:text-xl mx-auto">
					View a collection of our best work, we’ve ever done at our eyebrow threading shop and compare the before &
					after pictures of our work.
				</p>
				<div class="flex row justify-center my-6">
					<Button variant="link" href="/gallery">
						<span class="btn__wrappepr"><span class="btn__text"> View Gallery </span></span>
					</Button>
				</div>
				<Generator />
			</div>
			{#if gallery_section.image_bottom_right}
				<div class="gen__image-wrapper">
					<img
						loading="lazy"
						src={media_url + gallery_section.image_bottom_right.url}
						srcset="
			{gallery_section.image_bottom_right.formats.thumbnail
							? `${media_url + gallery_section.image_bottom_right.formats.thumbnail.url} 234w,`
							: ''}
			{gallery_section.image_bottom_right.formats.small
							? `${media_url + gallery_section.image_bottom_right.formats.small.url} 500w,`
							: ''}
			{gallery_section.image_bottom_right.formats.medium
							? `${media_url + gallery_section.image_bottom_right.formats.medium.url} 750w,`
							: ''}
			{gallery_section.image_bottom_right.formats.large
							? `${media_url + gallery_section.image_bottom_right.formats.large.url} 1000w,`
							: ''}"
						alt={gallery_section.image_bottom_right.alternativeText ?? `Example of Service 1`}
					/>
				</div>
			{/if}
			{#if gallery_section.image_top_left}
				<div class="gen__image-wrapper">
					<img
						loading="lazy"
						src={media_url + gallery_section.image_top_left.url}
						srcset="
			{gallery_section.image_top_left.formats.thumbnail
							? `${media_url + gallery_section.image_top_left.formats.thumbnail.url} 234w,`
							: ''}
			{gallery_section.image_top_left.formats.small
							? `${media_url + gallery_section.image_top_left.formats.small.url} 500w,`
							: ''}
			{gallery_section.image_top_left.formats.medium
							? `${media_url + gallery_section.image_top_left.formats.medium.url} 750w,`
							: ''}
			{gallery_section.image_top_left.formats.large
							? `${media_url + gallery_section.image_top_left.formats.large.url} 1000w,`
							: ''}"
						alt={gallery_section.image_top_left.alternativeText ?? `Example of Service 1`}
					/>
				</div>
			{/if}
			{#if gallery_section.image_bottom_left}
				<div class="gen__image-wrapper">
					<img
						loading="lazy"
						src={media_url + gallery_section.image_bottom_left.url}
						srcset="
			{gallery_section.image_bottom_left.formats.thumbnail
							? `${media_url + gallery_section.image_bottom_left.formats.thumbnail.url} 234w,`
							: ''}
			{gallery_section.image_bottom_left.formats.small
							? `${media_url + gallery_section.image_bottom_left.formats.small.url} 500w,`
							: ''}
			{gallery_section.image_bottom_left.formats.medium
							? `${media_url + gallery_section.image_bottom_left.formats.medium.url} 750w,`
							: ''}
			{gallery_section.image_bottom_left.formats.large
							? `${media_url + gallery_section.image_bottom_left.formats.large.url} 1000w,`
							: ''}"
						alt={gallery_section.image_bottom_left.alternativeText ?? `Example of Service 1`}
					/>
				</div>
			{/if}
			{#if gallery_section.image_top_right}
				<div class="gen__image-wrapper">
					<img
						loading="lazy"
						src={media_url + gallery_section.image_top_right.url}
						srcset="
			{gallery_section.image_top_right.formats.thumbnail
							? `${media_url + gallery_section.image_top_right.formats.thumbnail.url} 234w,`
							: ''}
			{gallery_section.image_top_right.formats.small
							? `${media_url + gallery_section.image_top_right.formats.small.url} 500w,`
							: ''}
			{gallery_section.image_top_right.formats.medium
							? `${media_url + gallery_section.image_top_right.formats.medium.url} 750w,`
							: ''}
			{gallery_section.image_top_right.formats.large
							? `${media_url + gallery_section.image_top_right.formats.large.url} 1000w,`
							: ''}"
						alt={gallery_section.image_top_right.alternativeText ?? `Example of Service 1`}
					/>
				</div>
			{/if}
		</section>
	{/if}
	{#if testimonials && testimonials.length > 0}
		<section class="testimonials__section py-24 md:py-48 bg-gray-100">
			<div class="container">
				<h2 class="text-center text-6xl sr-only">Testimonials</h2>
				<div class="relative">
					<div class="swiper rounded-md md:rounded-lg" bind:this={testimonialSlider}>
						<div class="swiper-wrapper items-stretch">
							{#each testimonials as testimonial}
								<div class="swiper-slide !h-auto">
									<div class="wrapper !h-full bg-white rounded-md md:rounded-lg p-8 md:p-12 lg:p-16 shadow-sm">
										<p class="text-lg md:text-2xl leading-loose lg:pe-64">
											{testimonial.testimonial_content}
										</p>
										<div class="flex gap-4 items-center mt-8 md:mt-12">
											<div class="avatar aspect-square w-24 rounded-sm overflow-hidden">
												<img
													loading="lazy"
													src={media_url + testimonial.author_avatar.formats.thumbnail.url}
													title={testimonial.author_avatar.name}
													srcset="
				{testimonial.author_avatar.formats.thumbnail
														? `${media_url + testimonial.author_avatar.formats.thumbnail.url} 234w,`
														: ''}
				{testimonial.author_avatar.formats.small ? `${media_url + testimonial.author_avatar.formats.small.url} 500w,` : ''}
				{testimonial.author_avatar.formats.medium ? `${media_url + testimonial.author_avatar.formats.medium.url} 750w,` : ''}
				{testimonial.author_avatar.formats.large ? `${media_url + testimonial.author_avatar.formats.large.url} 1000w,` : ''}"
													alt="Cover of {testimonial.author_avatar.alternativeText ?? testimonial.author_name}"
												/>
											</div>
											<div class="author__name text-xl uppercase font-medium">
												{testimonial.author_name}
											</div>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div
						class="swiper-pagination !bottom-2 md:!bottom-4 lg:!bottom-16 right-16 left-auto"
						bind:this={testimonialPagination}
					></div>
				</div>
			</div>
		</section>
	{/if}
	{#if articles && articles.length > 0}
		<section class="articles__section pt-36 md:pt-48">
			<div class="container">
				<h2 class="text-6xl md:text-8xl break-words text-center mb-8 md:mb-24">Latest articles</h2>
				<div class="grid grid-cols-12 xl:mt-16 mt-4 md:mt-8 lg:mt-16 justify-center items-stretch xl:gap-16 gap-4">
					{#each articles as article, index}
						{#if index == 0}
							<Article.Card
								size="lg"
								href={`/blogs/` + article.slug}
								class="md:col-span-10 col-span-12 !flex-row md:col-start-2"
							>
								<Article.Image img={article.cover} class="w-1/2" />
								<Article.Content class="w-1/2">
									<Article.Head>
										<Article.Tag>{article?.article_tag.title}</Article.Tag>
										<Article.Title>{article.title}</Article.Title>
										<div class="font-medium text-text-light uppercase">
											{article.date}
										</div>
									</Article.Head>
									<Article.Body>
										<p class="md:text-lg leading-6 hidden md:block">
											{article.description}
										</p>
									</Article.Body>
									<Article.Link href={`/blogs/` + article.slug}>Read Article</Article.Link>
								</Article.Content>
							</Article.Card>
						{:else}
							<Article.Card href={`/blogs/` + article.slug} class="col-span-6">
								<Article.Image img={article.cover} />
								<Article.Content>
									<Article.Head>
										<Article.Tag>{article.article_tag?.title}</Article.Tag>
										<Article.Title>{article.title}</Article.Title>
										<div class="font-medium text-text-light uppercase">
											{article.date}
										</div>
									</Article.Head>
									<Article.Body>
										<p class="leading-6 md:text-lg hidden md:block">
											{article.description}
										</p>
									</Article.Body>
									<Article.Link href={"/blogs/" + article.slug}>Read Article</Article.Link>
								</Article.Content>
							</Article.Card>
						{/if}
					{/each}
				</div>
				<div class="flex justify-center mt-16 md:mt-24">
					<Button variant="link" href="/blogs">View All BLogs</Button>
				</div>
			</div>
		</section>
	{/if}
	{#if contact_section}
		<section class="contact__section pt-24 md:pt-48 pb-24">
			<div class="container">
				<div class="flex items-center flex-col gap-20">
					<div class="contact__wrapper relative w-full md:w-3/4 flex justify-center">
						<div
							class="contact__image relative !overflow-hidden rounded-lg xl:rounded-xxl after:absolute after:w-full after:block after:left-0 after:top-0 after:h-full lg:w-2/3 w-full md:w-auto"
						>
							<img
								loading="lazy"
								class="w-full"
								src={media_url + contact_section.main_image.formats.thumbnail.url}
								title={contact_section.main_image.name}
								srcset="
			{contact_section.main_image.formats.thumbnail
									? `${media_url + contact_section.main_image.formats.thumbnail.url} 234w,`
									: ''}
			{contact_section.main_image.formats.small ? `${media_url + contact_section.main_image.formats.small.url} 500w,` : ''}
			{contact_section.main_image.formats.medium ? `${media_url + contact_section.main_image.formats.medium.url} 750w,` : ''}
			{contact_section.main_image.formats.large ? `${media_url + contact_section.main_image.formats.large.url} 1000w,` : ''}"
								alt="Cover of {contact_section.main_image.alternativeText ?? `Store Chair`}"
							/>
						</div>
						<div
							class="flex flex-col justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
						>
							<h2 class="text-5xl md:text-7xl xl:text-8xl text-primary text-center">
								{contact_section.main_text}
							</h2>
							{#await cta then}
								<Button href={cta.href} size="lg">{cta.name}</Button>
							{/await}
						</div>
					</div>
				</div>
			</div>
		</section>
	{/if}
</main>

<style>
	.contact__image::after {
		background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
	}
	.floating__image {
		position: absolute;
		aspect-ratio: 15 /10;
		border-radius: 50%;
		overflow: hidden;
		z-index: 2;
		inline-size: clamp(18rem, 25vw, 25rem);

		@media screen and (max-width: 768px) {
			inline-size: clamp(12rem, 25vh, 18rem);
		}
	}

	.floating__image img {
		block-size: 100%;
		inline-size: 100%;
		object-fit: cover;
		object-position: center center;
		rotate: -10deg;
	}
	.floating__image.image--1 {
		top: 15%;
		left: 0;
		/* top: 25%;
        left: -25%; */
		transform: translate(-35%, 0);
		rotate: 20deg;
		animation: float--1 14s ease-out infinite alternate;
	}

	.floating__image.image--2 {
		bottom: 0;
		right: 0;
		rotate: -12deg;
		scale: 1.2;
		animation: float--2 12s ease-out 1s infinite alternate;

		@media screen and (max-width: 1400px) {
			bottom: 10%;
		}
	}

	@keyframes float--1 {
		100% {
			translate: 0.5rem 0.5rem;
			rotate: 10deg;
		}
	}
	@keyframes float--2 {
		100% {
			translate: 1rem 0.5rem;
			rotate: -18deg;
		}
	}
</style>
