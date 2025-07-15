<script lang="ts">
	import { PRIMARY_LINK_ITEMS, SECONDARY_LINK_ITEMS } from "$lib/types/constants";
	import type { LinkType } from "$lib/types/variables";
	import { getContext } from "svelte";
	import Social from "../social/Social.svelte";
	import Button from "../buttons/Button.svelte";
	import type { ScrollSmoother } from "gsap/ScrollSmoother";
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const data: any = getContext("site-settings");
	const links: LinkType[] = $derived(PRIMARY_LINK_ITEMS);
	const secondary_links: LinkType[] = $derived(SECONDARY_LINK_ITEMS);
	const cta: string = data.cta;
	const { view } = $props();

	const addresses = $derived(data.contact.address);
	const phoneNumbers = $derived(data.contact.phone_numbers);
	const emails = $derived(data.contact.emails);
	const smoother: ScrollSmoother = $derived(getContext("smoother"));
	$effect(() => {
		document.body.style.overflow = view ? "hidden" : "auto";
	});
</script>

<nav class="nav__card pt-36" class:active={view} data-lenis-prevent="true">
	<div class="container h-full">
		<div
			class="flex flex-col md:flex-row flex-grow items-start md:justify-stretch md:items-center w-full h-full h-100 order-1 md:order-0"
		>
			<div
				class="hidden md:flex md:flex-wrap md:flex-col items-stretch md:items-stretch flex-grow basis-0 md:gap-16 gap-x-8 mb-16 md:mb-4"
			>
				{#if addresses && addresses.length > 0}
					<div class="group nav__contacts flex-1" style="--delay:{0.4}s;">
						<h3 class="mb-2 underline decoration-2 decoration-primary underline-offset-4">Find us at</h3>
						{#each addresses as address}
							<address class="not-italic">
								{#if address.map_link}
									<a href={address.map_link} class="text-lg md:text-2xl uppercase">
										{address.street}, <br />{address.city},
										{address.zip_code}
										{address.state_code}
									</a>
								{:else}
									<div class="text-2xl uppercase">
										{address.street}, <br />{address.city},
										{address.zip_code}
										{address.state_code}
									</div>
								{/if}
							</address>
						{/each}
					</div>
				{/if}

				<div class="group nav__contacts order-1 md:order-0 flex-1" style="--delay:{0.45}s;">
					<h3 class="mb-2 underline decoration-2 decoration-primary underline-offset-4">Contact Us</h3>
					{#if phoneNumbers && phoneNumbers.length > 0}
						{#each phoneNumbers as phoneNumber}
							<div>
								<a
									href={`tel:${phoneNumber.phone_number}`}
									class="text-lg md:text-2xl uppercase inline-flex items-center gap-4"
								>
									📞 {phoneNumber.phone_number}
								</a>
							</div>
						{/each}
					{/if}
					{#if emails && emails.length > 0}
						{#each emails as email}
							<div>
								<a href={`mailto:${email.email}`} class="text-lg md:text-2xl uppercase inline-flex items-center gap-4">
									📧 {email.email}
								</a>
							</div>
						{/each}
					{/if}
					{#if !emails.length || !phoneNumbers.length || !addresses.length}
						<Button href="/contact">Contact Us</Button>
					{/if}
				</div>
				{#if data.opening_hours && data.opening_hours.length > 0}
					<div class="group nav__contacts flex-0" style="--delay:{0.45}s;">
						<h3 class="mb-2 underline decoration-2 decoration-primary underline-offset-4">Our Hours</h3>
						<ul class="flex flex-col gap-2">
							{#each data.opening_hours as openingHour}
								<li class="uppercase mb-0">
									<div class="md:text-lg">
										{openingHour.day_range}
									</div>
									<div class="text-lg md:text-2xl">
										{openingHour.opening_timing}
									</div>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
			<div class="w-full md:w-auto flex-grow md:basis-0">
				<ul
					class="flex flex-col justify-start items-end md:items-start gap-4 md:gap-6 flex-grow basis-0 lg:ps-44 md:ps-8 mb-4"
				>
					{#each links as link, index}
						{#if link.slug !== data.cta}
							<li
								class="nav__item"
								style="--delay:{((index + 1) * 0.08).toFixed(2)}s;--duration:{(
									(links.length - index / 0.75 + 1) *
									0.15
								).toFixed(2)}s"
							>
								<a
									href={link.href}
									class="text-4xl md:text-5xl font-serif hover:underline underline-offset-8 decoration-primary"
								>
									{link.name}
								</a>
							</li>
						{/if}
					{/each}
				</ul>
				<ul
					class="flex flex-col justify-start items-end md:items-start gap-2 md:gap-2 mt-2 md:mt-7 text-gray-700 flex-grow basis-0 lg:ps-44 md:ps-8 mb-4"
				>
					{#each secondary_links as link, index}
						{#if link.slug !== data.cta}
							<li
								class="nav__item"
								style="--delay:{(index + 5) * 0.1}s;--duration:{(secondary_links.length - index + 1) * 0.2}s"
							>
								<a
									href={link.href}
									class="text-lg text-lg md:text-2xl uppercase hover:underline underline-offset-8 decoration-primary"
								>
									{link.name}
								</a>
							</li>
						{/if}
					{/each}
				</ul>
				{#if data.social_media}
					<div class="flex md:hidden gap-8 mt-16 items-center justify-center flex-grow w-full">
						{#if data.social_media.instagram}
							<a
								class="social__link hover:opacity-80"
								href={data.social_media.instagram}
								title={`${data.name}'s Instagram Page`}
								target="_blank"
							>
								<Social name={"instagram"} height={20} width={20} color="#000000" />
							</a>
						{/if}
						{#if data.social_media.facebook}
							<a
								class="social__link hover:opacity-80"
								href={data.social_media.facebook}
								title={`${data.name}'s facebook Page`}
								target="_blank"
							>
								<Social name={"facebook"} height={20} width={20} color="#000000" />
							</a>
						{/if}
						{#if data.social_media.yelp}
							<a
								class="social__link hover:opacity-80"
								href={data.social_media.yelp}
								title={`${data.name}'s yelp Page`}
								target="_blank"
							>
								<Social name={"yelp"} height={20} width={20} color="#000000" />
							</a>
						{/if}
						{#if data.social_media.youtube}
							<a
								class="social__link hover:opacity-80"
								href={data.social_media.youtube}
								title={`${data.name}'s youtube Page`}
								target="_blank"
							>
								<Social name={"youtube"} height={20} width={20} color="#000000" />
							</a>
						{/if}
						{#if data.social_media.x}
							<a
								class="social__link hover:opacity-80"
								href={data.social_media.x}
								title={`${data.name}'s x Page`}
								target="_blank"
							>
								<Social name={"x"} height={20} width={20} color="#000000" />
							</a>
						{/if}
						{#if data.social_media.tiktok}
							<a
								class="social__link hover:opacity-80"
								href={data.social_media.tiktok}
								title={`${data.name}'s tiktok Page`}
								target="_blank"
							>
								<Social name={"tiktok"} height={20} width={20} color="#000000" />
							</a>
						{/if}
						{#if data.social_media.linkedin}
							<a
								class="social__link hover:opacity-80"
								href={data.social_media.linkedin}
								title={`${data.name}'s linkedin Page`}
								target="_blank"
							>
								<Social name={"linkedin"} height={20} width={20} color="#000000" />
							</a>
						{/if}
						{#if data.social_media.pinterest}
							<a
								class="social__link hover:opacity-80"
								href={data.social_media.pinterest}
								title={`${data.name}'s pinterest Page`}
								target="_blank"
							>
								<Social name={"pinterest"} height={20} width={20} color="#000000" />
							</a>
						{/if}
						{#if data.social_media.threads}
							<a
								class="social__link hover:opacity-80"
								href={data.social_media.threads}
								title={`${data.name}'s threads Page`}
								target="_blank"
							>
								<Social name={"threads"} height={20} width={20} color="#000000" />
							</a>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>

<style>
	.nav__card {
		position: fixed;
		left: 0;
		top: 0;
		translate: 0 -100%;
		block-size: 100dvh;
		inline-size: 100dvw;
		z-index: 98;
		transition: translate 0.25s ease-in 0.15s;
		background-color: hsl(0 0% 100% /80%);
		backdrop-filter: blur(1rem) saturate(1.7);
		overflow-y: scroll;
	}

	.nav__card.active {
		translate: 0 0;
		transition: translate 0.3s ease-out;
	}

	.nav__card .nav__item,
	.nav__card .nav__contacts {
		animation: fade-out 0.3s cubic-bezier(0.25, 0.1, 0, 0.93) forwards;
	}

	.nav__card.active .nav__item {
		opacity: 0;
		translate: 0 -33%;
		scale: 0.96;
		transform-origin: center;
		animation: top-opacity-in var(--duration) cubic-bezier(0.25, 0.1, 0, 0.93) var(--delay) forwards;
	}

	.nav__card.active .nav__contacts {
		opacity: 0;
		animation: top-opacity-in 0.6s ease var(--delay) forwards;
	}

	@keyframes fade-in {
		to {
			opacity: 1;
		}
	}

	@keyframes top-opacity-in {
		90% {
			scale: 1;
		}
		to {
			opacity: 1;
			scale: 1;
			translate: 0 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}
</style>
