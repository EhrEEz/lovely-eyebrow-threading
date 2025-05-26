<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import * as Article from "$lib/components/cards/article";
	import Button from "$lib/components/buttons/Button.svelte";
	import Social from "$lib/components/social/Social.svelte";
	import Generator from "$lib/components/canvas/Generator.svelte";
	import { ServiceSlider } from "$lib/components/slider";
	import { Marquee } from "@selemondev/svelte-marquee";
	import Swiper from "swiper";
	import { Pagination } from "swiper/modules";
	const { data } = $props();
	const home_data = $state(data.home_data);
	const siteSettings = $state(data.siteSettings);
	const header_section = $state(home_data.header_section);
	const gallery_section = $state(home_data.gallery_section);
	const services = $state(home_data.services_section.services);
	const contact_section = $state(home_data.contact_section);
	console.log(home_data);
	const articles = $state(home_data.articles);
	const media_url = $state(data.media_url);
	const testimonials = $state(home_data.testimonial_section.testimonials);

	let testimonialSlider = $state<HTMLElement>();
	let testimonialPagination = $state<HTMLElement>();
	let _testimonial_swiper: Swiper;

	let ready = $state(false);
	$effect(() => {
		if (testimonialSlider) {
			_testimonial_swiper = new Swiper(testimonialSlider, {
				slidesPerView: 1,
				modules: [Pagination],
				pagination: {
					el: testimonialPagination,
					clickable: true,
				},
			});
		}
		ready = true;
	});
</script>

{#if ready}
	<main>
		<section class="relative">
			<div class="container">
				<div class="flex-col flex items-center justify-center min-h-dvh">
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
					<h2 class="text-9xl" id="title-1" in:fly={{ y: 20, duration: 1000, delay: 100 }}>
						{header_section.large_text}
					</h2>
					<h2 class="text-7xl" id="title-2" in:fly={{ y: -15, duration: 1000, delay: 200 }}>
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
		<section class="pt-36 pb-36">
			<Marquee
				class="gap-[3rem] [--duration:20s] [--gap:3rem] "
				innerClassName="gap-[3rem] motion-reduce:animate-none motion-reduce:first:hidden"
			>
				<h3 class="text-9xl !leading-none">{siteSettings.tagline}</h3>
				<div class="text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
				<h3 class="text-9xl !leading-none">{siteSettings.tagline}</h3>
				<div class="text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
				<h3 class="text-9xl !leading-none">{siteSettings.tagline}</h3>
				<div class="text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
				<h3 class="text-9xl !leading-none">{siteSettings.tagline}</h3>
				<div class="text-9xl font-serif !leading-[0.5] mt-[0.25em]">-</div>
			</Marquee>
		</section>
		<section class="featured-service__section py-24">
			<div class="container flex gap-8 items-center">
				<div class="w-1/2 pe-20">
					<h2 class="font-sans font-normal text-2xl mb-6 uppercase">Tinted Eyebrows</h2>
					<p class="text-lg leading-9">
						Thanks to modern innovation, achieving full, beautiful brows—even if you weren’t genetically blessed with
						them—is now very attainable: From high-performance brow pencils to brow-growing serums that yield impressive
						results, there are plenty of options for getting thicker brows in just a few swipes or strokes. However, if
						you prefer a fix that doesn’t involve using numerous brow products or filling them in on a daily basis,
						consider giving eyebrow tinting a try.
					</p>
				</div>
				<div class="w-1/2">
					<div class="rounded-xxl overflow-hidden relative">
						<h4
							class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white px-3 py-3 w-full text-5xl !leading-[1em]"
						>
							Whatever type your eyebrows are, We got you covered
						</h4>
						<img
							src="/images/eyebrow.png"
							class="w-full"
							alt="Whatever type your eyebrows are,
We got you covered"
						/>
					</div>
				</div>
			</div>
		</section>
		<section class="gallery__section relative w-full flex justify-center py-96 overflow-hidden">
			<div class="gallery__text-wrapper w-fit relative flex flex-col items-center">
				<h3 class="text-center">
					<div class="text-8xl">Your Eyebrows</div>
					<div class="text-[14rem]">Your Way</div>
				</h3>
				<p class="text-center max-w-[50%] my-4 text-xl mx-auto">
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
						style="width: 100%; height: auto;"
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
						style="width: 100%; height: auto;"
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
						style="width: 100%; height: auto;"
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
						style="width: 100%; height: auto;"
						alt={gallery_section.image_top_right.alternativeText ?? `Example of Service 1`}
					/>
				</div>
			{/if}
		</section>

		<section class="testimonials__section py-48 bg-gray-100">
			<div class="container">
				<h2 class="text-center text-6xl sr-only">Testimonials</h2>
				<div class="bg-white rounded-lg p-16 relative">
					<div class="swiper" bind:this={testimonialSlider}>
						<div class="swiper-wrapper">
							{#each testimonials as testimonial}
								<div class="swiper-slide">
									<p class="text-2xl leading-loose pe-64">
										{testimonial.testimonial_content}
									</p>
									<div class="flex gap-4 items-center mt-12">
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
												style="width: 100%; height: auto;"
												alt="Cover of {testimonial.author_avatar.alternativeText ?? testimonial.author_name}"
											/>
										</div>
										<div class="author__name text-xl uppercase font-medium">
											{testimonial.author_name}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="swiper-pagination !bottom-16 right-16 left-auto" bind:this={testimonialPagination}></div>
				</div>
			</div>
		</section>
		<section class="articles__section pt-48">
			<div class="container">
				<h2 class="text-8xl text-center mb-24">Latest articles</h2>
				<div class="w-10/12 mx-auto">
					<Article.Card size="lg">
						<Article.Image img={articles[0].cover} />
						<Article.Content>
							<Article.Head>
								<Article.Tag>{articles[0]?.article_tag.title}</Article.Tag>
								<Article.Title>{articles[0].title}</Article.Title>
								<div class="font-medium text-text-light uppercase">
									{articles[0].date}
								</div>
							</Article.Head>
							<Article.Body>
								<p class="leading-6">
									{articles[0].description}
								</p>
							</Article.Body>
							<Article.Link href={`/blogs/` + articles[0].slug}>Read Full Article</Article.Link>
						</Article.Content>
					</Article.Card>
				</div>
				<div class="grid grid-cols-2 mt-16 justify-center items-stretch gap-16">
					{#each articles as article, index}
						{#if index !== 0}
							<Article.Card>
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
										<p class="leading-6">
											{article.description}
										</p>
									</Article.Body>
									<Article.Link href={"/blogs/" + article.slug}>Read Full Article</Article.Link>
								</Article.Content>
							</Article.Card>
						{/if}
					{/each}
				</div>
				<div class="flex justify-center mt-24">
					<Button variant="link" href="/blogs">View All BLogs</Button>
				</div>
			</div>
		</section>

		<section class="contact__section pt-48 pb-24">
			<div class="container">
				<div class="flex items-center flex-col gap-20">
					<div class="contact__wrapper relative w-3/4 flex justify-center">
						<div
							class="contact__image relative !overflow-hidden rounded-xxl after:absolute after:w-full after:block after:left-0 after:top-0 after:h-full w-2/3"
						>
							<img
								loading="lazy"
								src={media_url + contact_section.main_image.formats.thumbnail.url}
								title={contact_section.main_image.name}
								srcset="
			{contact_section.main_image.formats.thumbnail
									? `${media_url + contact_section.main_image.formats.thumbnail.url} 234w,`
									: ''}
			{contact_section.main_image.formats.small ? `${media_url + contact_section.main_image.formats.small.url} 500w,` : ''}
			{contact_section.main_image.formats.medium ? `${media_url + contact_section.main_image.formats.medium.url} 750w,` : ''}
			{contact_section.main_image.formats.large ? `${media_url + contact_section.main_image.formats.large.url} 1000w,` : ''}"
								style="width: 100%; height: auto;"
								alt="Cover of {contact_section.main_image.alternativeText ?? `Store Chair`}"
							/>
						</div>
						<div
							class="flex flex-col justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
						>
							<h2 class="text-8xl text-primary text-center">{contact_section.main_text}</h2>
							<Button href="/contact" size="lg">Lets Talk</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
{/if}

<style>
	.swiper-pagination {
		--swiper-pagination-bullet-width: 2rem;
		--swiper-pagination-bullet-border-radius: 100vmax;
		--swiper-pagination-bullet-inactive-color: var(--secondary-color);
		--swiper-pagination-bullet-inactive-opacity: 1;
		--swiper-pagination-bottom: 2rem;
		--swiper-pagination-color: var(--primary-color);
		left: unset;
		text-align: right;
		inline-size: fit-content;
	}
	.contact__image::after {
		background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
	}
	.floating__image {
		position: absolute;
		inline-size: 25vw;
		aspect-ratio: 15 /10;
		border-radius: 50%;
		overflow: hidden;
		z-index: -1;
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
	}

	.card__bg::before {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
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
