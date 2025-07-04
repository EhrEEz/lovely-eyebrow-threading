<script lang="ts">
	import { page } from "$app/state";
	import Button from "$lib/components/buttons/Button.svelte";
	import Seo from "$lib/components/seo/SEO.svelte";
	import type { CTAItem } from "$lib/types/variables.js";
	import { getContext } from "svelte";
	const { data } = $props();
	const siteSettings = $derived(data.siteSettings);
	const media_url = $derived(data.media_url);
	const page_data = $derived(data.page_data);
	const cta = $state<CTAItem>(getContext("cta"));
</script>

<Seo pageSettings={page_data.page_info} {siteSettings} {media_url} />

<main>
	<h1 class="sr-only">{page_data.page_info.page_title ?? "About Us Lovely Eyebrow Threading"}</h1>
	<section class="mt-48 lg:mt-64 lg:mb-24">
		<div class="container">
			<h2 class="text-5xl md:text-7xl lg:mb-16 lg:w-2/3 xl:max-w-1/2 break-words">
				{page_data.hook_line}
			</h2>
		</div>
	</section>
	<section class="my-8 md:my-36 lg:my-48 four_image-section">
		<div class="container">
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-16">
				<div class="image--1">
					<img
						loading="lazy"
						class="w-full rounded-md"
						src={media_url + page_data.image_1.formats.thumbnail.url}
						srcset="
				{page_data.image_1.formats.thumbnail ? `${media_url + page_data.image_1.formats.thumbnail.url} 234w,` : ''}
				{page_data.image_1.formats.small ? `${media_url + page_data.image_1.formats.small.url} 500w,` : ''}
				{page_data.image_1.formats.medium ? `${media_url + page_data.image_1.formats.medium.url} 750w,` : ''}
				{page_data.image_1.formats.large ? `${media_url + page_data.image_1.formats.large.url} 1000w,` : ''}"
						alt={page_data.image_1.alternativeText ?? `About Us Image of a person`}
					/>
				</div>
				<div class="image--2 mt-16">
					<img
						loading="lazy"
						class="w-full rounded-md"
						src={media_url + page_data.image_2.formats.thumbnail.url}
						srcset="
				{page_data.image_2.formats.thumbnail ? `${media_url + page_data.image_2.formats.thumbnail.url} 234w,` : ''}
				{page_data.image_2.formats.small ? `${media_url + page_data.image_2.formats.small.url} 500w,` : ''}
				{page_data.image_2.formats.medium ? `${media_url + page_data.image_2.formats.medium.url} 750w,` : ''}
				{page_data.image_2.formats.large ? `${media_url + page_data.image_2.formats.large.url} 1000w,` : ''}"
						alt={page_data.image_2.alternativeText ?? `About Us Image of a person`}
					/>
				</div>
				<div class="image--3 -mt-16">
					<img
						loading="lazy"
						class="w-full rounded-md"
						src={media_url + page_data.image_3.formats.thumbnail.url}
						srcset="
				{page_data.image_3.formats.thumbnail ? `${media_url + page_data.image_3.formats.thumbnail.url} 234w,` : ''}
				{page_data.image_3.formats.small ? `${media_url + page_data.image_3.formats.small.url} 500w,` : ''}
				{page_data.image_3.formats.medium ? `${media_url + page_data.image_3.formats.medium.url} 750w,` : ''}
				{page_data.image_3.formats.large ? `${media_url + page_data.image_3.formats.large.url} 1000w,` : ''}"
						alt={page_data.image_3.alternativeText ?? `About Us Image of a person`}
					/>
				</div>
				<div class="image--4">
					<img
						loading="lazy"
						class="w-full rounded-md"
						src={media_url + page_data.image_4.formats.thumbnail.url}
						srcset="
				{page_data.image_4.formats.thumbnail ? `${media_url + page_data.image_4.formats.thumbnail.url} 234w,` : ''}
				{page_data.image_4.formats.small ? `${media_url + page_data.image_4.formats.small.url} 500w,` : ''}
				{page_data.image_4.formats.medium ? `${media_url + page_data.image_4.formats.medium.url} 750w,` : ''}
				{page_data.image_4.formats.large ? `${media_url + page_data.image_4.formats.large.url} 1000w,` : ''}"
						alt={page_data.image_4.alternativeText ?? `About Us Image of a person`}
					/>
				</div>
			</div>
		</div>
	</section>

	{#each page_data.content_blocks as block, ind}
		{#if (ind + 1) % 2 !== 0}
			<section class="my-24 md:my-36 lg:my-48">
				<div class="container">
					<div class="md:grid md:grid-cols-12 md:items-center w-full md:gap-16">
						{#if block.image}
							<div
								class="content__image max-w-full w-full md:col-span-12 lg:col-span-6 xl:col-span-5 xl:col-start-2 mb-8 md:mb-0"
							>
								<img
									loading="lazy"
									class="w-full rounded-md aspect-square object-cover md:aspect-auto md:object-auto"
									src={media_url + block.image.formats.thumbnail.url}
									srcset="
					{block.image.formats.thumbnail ? `${media_url + block.image.formats.thumbnail.url} 234w,` : ''}
					{block.image.formats.small ? `${media_url + block.image.formats.small.url} 500w,` : ''}
					{block.image.formats.medium ? `${media_url + block.image.formats.medium.url} 750w,` : ''}
					{block.image.formats.large ? `${media_url + block.image.formats.large.url} 1000w,` : ''}"
									alt={block.image.alternativeText ?? `About Us Image of a person`}
								/>
							</div>
						{/if}
						<div class="content__text col-span-12 lg:col-span-6 lg:gap-24 xl:col-span-5 xl:col-start-7">
							{#if block.heading_text}
								<h3 class="text-4xl md:text-5xl lg:text-6xl mb-8">{block.heading_text}</h3>
							{/if}
							<p class="text-lg leading-[2]">{block.description_text}</p>
							{#if block.link}
								<Button
									href={block.link.url}
									target={block.link.target ?? "_self"}
									class="mt-8"
									rel={block.link.target === "_blank" ? "noopener noreferrer" : ""}>{block.link.text}</Button
								>
							{/if}
						</div>
					</div>
				</div>
			</section>
		{:else}
			<section class="my-24 md:my-36 lg:my-48">
				<div class="container">
					<div class="md:grid md:grid-cols-12 md:items-center gap-16 w-full">
						<div class="content__text col-span-12 lg:col-span-6 xl-col-start-2 xl:col-span-5 w-full mb-8 md:mb-0">
							{#if block.heading_text}
								<h3 class="text-4xl md:text-5xl lg:text-6xl mb-8">{block.heading_text}</h3>
							{/if}
							<p class="text-lg leading-[2]">{block.description_text}</p>
							{#if block.link}
								<Button
									href={block.link.url}
									target={block.link.target ?? "_self"}
									class="mt-8"
									rel={block.link.target === "_blank" ? "noopener noreferrer" : ""}>{block.link.text}</Button
								>
							{/if}
						</div>
						{#if block.image}
							<div
								class="content__image md:col-span-12 lg:col-span-6 lg:gap-24 xl:col-span-5 xl:col-start-7 w-full max-w-full"
							>
								<img
									loading="lazy"
									class="w-full rounded-md max-w-full"
									src={media_url + block.image.formats.thumbnail.url}
									srcset="
					{block.image.formats.thumbnail ? `${media_url + block.image.formats.thumbnail.url} 234w,` : ''}
					{block.image.formats.small ? `${media_url + block.image.formats.small.url} 500w,` : ''}
					{block.image.formats.medium ? `${media_url + block.image.formats.medium.url} 750w,` : ''}
					{block.image.formats.large ? `${media_url + block.image.formats.large.url} 1000w,` : ''}"
									alt={block.image.alternativeText ?? `About Us Image of a person`}
								/>
							</div>
						{/if}
					</div>
				</div>
			</section>
		{/if}
	{/each}
	<section
		class="picture__section relative aspect-[16/6] after:absolute after:w-full after:block after:left-0 after:top-0 after:h-full after:z-2 after:bg-[#00000060]"
	>
		<div class="grid absolute z-10 top-12 md:top-40 left-8 md:left-20 lg:w-2/3 2xl:w-1/2">
			<h2 class="text-5xl md:text-7xl xl:text-8xl text-white mb-4">
				{page_data.end_line}
			</h2>
			<Button href={cta.href} size="lg" class="w-fit">{cta.name}</Button>
		</div>
		<img
			loading="lazy"
			class="w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/9] object-cover"
			src={media_url + page_data.end_image.url}
			srcset="
				{page_data.end_image.formats.thumbnail ? `${media_url + page_data.end_image.formats.thumbnail.url} 234w,` : ''}
				{page_data.end_image.formats.small ? `${media_url + page_data.end_image.formats.small.url} 500w,` : ''}
				{page_data.end_image.formats.medium ? `${media_url + page_data.end_image.formats.medium.url} 750w,` : ''}
				{page_data.end_image.formats.large ? `${media_url + page_data.end_image.formats.large.url} 1000w,` : ''}"
			alt={page_data.end_image.alternativeText ?? `Store Image of Lovely Eyebrow Threading`}
		/>
	</section>
</main>
