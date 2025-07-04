<script lang="ts">
	import Logo from "$lib/assets/svg/logo.svg";
	import { PRIMARY_LINK_ITEMS } from "$lib/types/constants";
	import { getContext } from "svelte";
	import Social from "../social/Social.svelte";
	import type { LinkType } from "$lib/types/variables";

	const currentYear = new Date().getFullYear();

	const headerLinks = $state<LinkType[]>(PRIMARY_LINK_ITEMS);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const data: any = getContext("site-settings");

	const addresses = $derived(data.contact.address);
	const phoneNumbers = $derived(data.contact.phone_numbers);
	const emails = $derived(data.contact.emails);
</script>

<footer class="py-4 mt-4">
	<div class="container">
		{#if data.social_media}
			<div class="socials__wrapper flex flex-col items-center gap-3 lg:mb-28 mb-16">
				<div class="uppercase mb-2">Find us on Social Media</div>
				<div class="flex gap-12 items-center flex-grow basis-0">
					{#if data.social_media.instagram}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.instagram}
							title={`${data.name}'s Instagram Page`}
							target="_blank"
						>
							<Social name={"instagram"} height={24} width={24} color="hsl(316, 89%, 83%)" />
						</a>
					{/if}
					{#if data.social_media.facebook}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.facebook}
							title={`${data.name}'s facebook Page`}
							target="_blank"
						>
							<Social name={"facebook"} height={24} width={24} color="hsl(316, 89%, 83%)" />
						</a>
					{/if}
					{#if data.social_media.yelp}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.yelp}
							title={`${data.name}'s yelp Page`}
							target="_blank"
						>
							<Social name={"yelp"} height={24} width={24} color="hsl(316, 89%, 83%)" />
						</a>
					{/if}
					{#if data.social_media.youtube}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.youtube}
							title={`${data.name}'s youtube Page`}
							target="_blank"
						>
							<Social name={"youtube"} height={24} width={24} color="hsl(316, 89%, 83%)" />
						</a>
					{/if}
					{#if data.social_media.x}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.x}
							title={`${data.name}'s x Page`}
							target="_blank"
						>
							<Social name={"x"} height={24} width={24} color="hsl(316, 89%, 83%)" />
						</a>
					{/if}
					{#if data.social_media.tiktok}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.tiktok}
							title={`${data.name}'s tiktok Page`}
							target="_blank"
						>
							<Social name={"tiktok"} height={24} width={24} color="hsl(316, 89%, 83%)" />
						</a>
					{/if}
					{#if data.social_media.linkedin}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.linkedin}
							title={`${data.name}'s linkedin Page`}
							target="_blank"
						>
							<Social name={"linkedin"} height={24} width={24} color="hsl(316, 89%, 83%)" />
						</a>
					{/if}
					{#if data.social_media.pinterest}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.pinterest}
							title={`${data.name}'s pinterest Page`}
							target="_blank"
						>
							<Social name={"pinterest"} height={24} width={24} color="hsl(316, 89%, 83%)" />
						</a>
					{/if}
					{#if data.social_media.threads}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.threads}
							title={`${data.name}'s threads Page`}
							target="_blank"
						>
							<Social name={"threads"} height={24} width={24} color="hsl(316, 89%, 83%)" />
						</a>
					{/if}
				</div>
			</div>
		{/if}
		<div class="main__line flex items-center gap-16 md:gap-24">
			<div class="flex flex-col items-center mb-8 lg:mb-0 w-2/5">
				<a href="/" title="Home Page">
					<div class="logo__wrapper w-42 lg:w-72">
						<img src={Logo} alt="Lovely Eyebrow Threading Logo" class="mb-3 w-full" />
					</div>
				</a>
				{#if addresses && addresses.length > 0}
					{#each addresses as address}
						<address class="uppercase not-italic mt-4 text-center">
							{#if address.map_link}
								<a href={address.map_link} class="md:text-lg text-center uppercase">
									{address.street}
									{address.city},
									{address.state_code}
									{address.zip_code}
								</a>
							{:else}
								<div class="md:text-lg text-center uppercase">
									{address.street}
									{address.city},
									{address.state_code}
									{address.zip_code}
								</div>
							{/if}
						</address>
					{/each}
				{/if}
			</div>
			<ul class="links__wrapper flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-8 justify-center md:justify-normal">
				{#each headerLinks as link}
					{#if link.slug}
						<li class="footer__link">
							<a
								href={link.href}
								class="uppercase underline hover:decoration-primary decoration-2 underline-width-8 decoration-transparent underline-offset-4 transition-[all] duration-300"
								title={link.name}
							>
								{link.name}
							</a>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
		<div class="sr-only">Beauty services that define you and Results that make you smile</div>
		<div
			class="legal__links flex items-center justify-center gap-8 mt-32 md:mt-24 lg:mt-48 xl:mt-64"
			aria-label="Legal Items"
		>
			<a
				href="/privacy-policy"
				class="uppercase text-text-light hover:text-text underline transition flex-shrink-0 text-sm"
				title="Privacy Policy">Privacy Policy</a
			>
			<div class="uppercase text-text-light text-center text-sm">
				Lovely Eyebrow Threading © {currentYear}
			</div>
			<a
				href="/terms-of-service"
				class="uppercase text-text-light hover:text-text transition underline flex-shrink-0 text-sm"
				title="Terms of Service">Terms of Service</a
			>
		</div>
	</div>
</footer>

<style>
	footer {
		background-image: url("./footer-slogan.svg");
		background-size: auto;
		background-repeat: no-repeat;
		background-position: 60% 110%;

		@media screen and (max-width: 1440px) {
			background-size: 100%;
			background-position: 60% 130%;
		}

		@media screen and (max-width: 1200px) {
			background-size: 100%;
			background-position: 60% 135%;
		}
		@media screen and (max-width: 1024px) {
			background-size: 120%;
			background-position: 60% 140%;
		}

		@media screen and (max-width: 768px) {
			background-size: 160%;
			background-position: 30% 130%;
		}
		@media screen and (max-width: 640px) {
			background-size: 200%;
			background-position: 30% 115%;
		}
	}
</style>
