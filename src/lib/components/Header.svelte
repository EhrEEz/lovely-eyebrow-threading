<script lang="ts">
	import Button from "./buttons/Button.svelte";
	import Logo from "$lib/assets/svg/logo.svg";
	import LogoDark from "$lib/assets/svg/logo-dark.svg";
	import MenuSlide from "$lib/components/menu/Menu.svelte";
	import Social from "./social/Social.svelte";
	import type { CTAItem, LinkType } from "$lib/types/variables";
	import { CTA_ITEMS, PRIMARY_LINK_ITEMS } from "$lib/types/constants";
	import MenuToggle from "./menu/MenuToggle.svelte";
	import { getContext } from "svelte";
	import { navigating } from "$app/stores";
	// biome-ignore lint/suspicious/noExplicitAny: will only change at the end of project completion taking into account every changes later made
	const data: any = getContext("site-settings");

	const { navScroll } = $props();
	const mini = $state(true);

	const ctaLinks = $state<CTAItem[]>(CTA_ITEMS);
	const headerLinks = $state<LinkType[]>(PRIMARY_LINK_ITEMS);

	let menuView = $state<boolean>(false);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function getHalf(arr: any[]): [any[], any[]] {
		const half = Math.floor((arr.length - 1) / 2);
		const first = arr.slice(0, half);
		const second = arr.slice(half);
		return [first, second];
	}
	const cta = $derived.by((): CTAItem => {
		const default_cta = {
			name: "Contact Us",
			href: "/contact",
			id: "contact",
		};
		if (!data.cta && !data.cta.cta) {
			return default_cta;
		}
		const ctaItem = ctaLinks.find((emt) => emt.id === data.cta.cta);
		if (!ctaItem) {
			return default_cta;
		}
		return ctaItem;
	});
	const splitlinks = getHalf(headerLinks);

	function toggleMenu() {
		menuView = !menuView;
	}

	$effect(() => {
		if ($navigating) {
			menuView = false;
		}
	});
</script>

<header
	id="topHeader"
	class="fixed left-0 top-0 right-0 z-[99] py-6 max-w-[100dvw]"
	class:nav__bg={navScroll && !menuView}
>
	<div class="container">
		<div class="flex justify-between items-center gap-4">
			<div class="left-section hidden md:flex gap-4 items-center flex-grow basis-0">
				{#if data.social_media}
					{#if data.social_media.instagram}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.instagram}
							title={`${data.name}'s Instagram Page`}
							target="_blank"
						>
							<Social
								name={"instagram"}
								height={15}
								width={14}
								color={navScroll && !menuView ? "#FFFFFF" : "#000000"}
							/>
						</a>
					{/if}
					{#if data.social_media.facebook}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.facebook}
							title={`${data.name}'s facebook Page`}
							target="_blank"
						>
							<Social name={"facebook"} height={15} width={14} color={navScroll && !menuView ? "#FFFFFF" : "#000000"} />
						</a>
					{/if}
					{#if data.social_media.yelp}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.yelp}
							title={`${data.name}'s yelp Page`}
							target="_blank"
						>
							<Social name={"yelp"} height={15} width={14} color={navScroll && !menuView ? "#FFFFFF" : "#000000"} />
						</a>
					{/if}
					{#if data.social_media.youtube}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.youtube}
							title={`${data.name}'s youtube Page`}
							target="_blank"
						>
							<Social name={"youtube"} height={15} width={14} color={navScroll && !menuView ? "#FFFFFF" : "#000000"} />
						</a>
					{/if}
					{#if data.social_media.x}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.x}
							title={`${data.name}'s x Page`}
							target="_blank"
						>
							<Social name={"x"} height={15} width={14} color={navScroll && !menuView ? "#FFFFFF" : "#000000"} />
						</a>
					{/if}
					{#if data.social_media.tiktok}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.tiktok}
							title={`${data.name}'s tiktok Page`}
							target="_blank"
						>
							<Social name={"tiktok"} height={15} width={14} color={navScroll && !menuView ? "#FFFFFF" : "#000000"} />
						</a>
					{/if}
					{#if data.social_media.linkedin}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.linkedin}
							title={`${data.name}'s linkedin Page`}
							target="_blank"
						>
							<Social name={"linkedin"} height={15} width={14} color={navScroll && !menuView ? "#FFFFFF" : "#000000"} />
						</a>
					{/if}
					{#if data.social_media.pinterest}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.pinterest}
							title={`${data.name}'s pinterest Page`}
							target="_blank"
						>
							<Social
								name={"pinterest"}
								height={15}
								width={14}
								color={navScroll && !menuView ? "#FFFFFF" : "#000000"}
							/>
						</a>
					{/if}
					{#if data.social_media.threads}
						<a
							class="social__link hover:opacity-80"
							href={data.social_media.threads}
							title={`${data.name}'s threads Page`}
							target="_blank"
						>
							<Social name={"threads"} height={15} width={14} color={navScroll && !menuView ? "#FFFFFF" : "#000000"} />
						</a>
					{/if}
				{/if}
			</div>
			<nav class="middle-section flex gap-8 md:items-center md:justify-center md:flex-grow">
				{#if !mini}
					<ul class="list-none hidden lg:flex gap-4 items-center justify-end flex-grow basis-0">
						{#each splitlinks[0] as link}
							{#if link.name !== cta.name}
								<li>
									<a
										class="uppercase text-sm text-primary-foreground hover:underline decoration-primary decoration-2 underline-offset-4"
										href={link.href}
									>
										{link.name}
									</a>
								</li>
							{/if}
						{/each}
					</ul>
				{/if}
				<a href="/" title="Home">
					<h1 class="flex logo-modifier">
						<span class="sr-only">Lovely Eyebrow Threading</span>
						<img src={navScroll && !menuView ? LogoDark : Logo} alt="Lovely Eyebrow Threading" />
					</h1>
				</a>
				{#if !mini}
					<ul class="list-none flex items-center justify-start gap-4 flex-grow basis-0">
						{#each splitlinks[1] as link}
							{#if link.name !== cta.name}
								<li>
									<a
										class="uppercase text-sm text-primary-foreground hover:underline decoration-primary decoration-2 underline-offset-4 nav__items"
										href={link.href}
									>
										{link.name}
									</a>
								</li>
							{/if}
						{/each}
					</ul>
				{/if}
			</nav>
			<div class="right-section flex gap-4 md:gap-6 items-center md:items-end justify-end flex-grow basis-0">
				<Button variant="default" size="lg" href={cta.href} class="hidden md:flex">
					<span class="btn__text">{cta.name} </span>
				</Button>
				<Button variant="default" size="icon" href={cta.href} class="flex md:hidden w-12 h-12">
					<span class="btn__icon"
						><svg fill="none" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg" id="fi_9446889"
							><g fill="rgb(0,0,0)"
								><path
									d="m7.25 8c0-.41421.33579-.75.75-.75h4c.4142 0 .75.33579.75.75s-.3358.75-.75.75h-4c-.41421 0-.75-.33579-.75-.75z"
								></path><path
									d="m7.25 12c0-.4142.33579-.75.75-.75h8c.4142 0 .75.3358.75.75s-.3358.75-.75.75h-8c-.41421 0-.75-.3358-.75-.75z"
								></path><path
									clip-rule="evenodd"
									d="m9.96644 1.25h4.06716c1.3717 0 2.4471-.00001 3.3115.07061.8801.07191 1.6072.22077 2.2653.5561 1.082.55127 1.9616 1.43091 2.5129 2.51284.3353.65814.4842 1.38524.5561 2.26539.0706.86434.0706 1.93977.0706 3.31148v1.21778.1469c.0002 1.5486.0004 2.4933-.2323 3.2868-.551 1.8792-2.0206 3.3488-3.8998 3.8998-.7935.2327-1.7382.2325-3.2868.2323-.0484 0-.0973 0-.1469 0h-.5488l-.0603.0001c-.8672.0055-1.7119.2763-2.4208.7758l-.0492.035-2.61069 1.8648c-1.50451 1.0746-3.48153-.4773-2.79487-2.194.09229-.2307-.07763-.4817-.32613-.4817h-.60175c-2.49725 0-4.52166-2.0244-4.52166-4.5217v-4.26186c0-1.37172-.00001-2.44715.07061-3.3115.07191-.88015.22077-1.60725.5561-2.26539.55127-1.08193 1.43091-1.96157 2.51284-2.51284.65814-.33533 1.38524-.48419 2.26539-.5561.86435-.07062 1.93978-.07061 3.3115-.07061zm-3.18936 1.56563c-.78738.06433-1.29511.18796-1.70654.39759-.79969.40746-1.44986 1.05763-1.85732 1.85732-.20963.41143-.33326.91916-.39759 1.70654-.06505.79614-.06563 1.81041-.06563 3.22292v4.2283c0 1.6689 1.35284 3.0217 3.02166 3.0217h.60175c1.3097 0 2.20526 1.3228 1.71885 2.5388-.13029.3257.24483.6202.53029.4163l2.66765-1.9054c.9591-.6758 2.102-1.0421 3.2753-1.0496l.0699-.0001h.5488c1.7419 0 2.4521-.0076 3.0116-.1717 1.389-.4073 2.4752-1.4935 2.8825-2.8825.1641-.5595.1717-1.2697.1717-3.0116v-1.1842c0-1.41251-.0006-2.42678-.0656-3.22292-.0644-.78738-.188-1.29511-.3976-1.70654-.4075-.79969-1.0577-1.44986-1.8573-1.85732-.4115-.20963-.9192-.33326-1.7066-.39759-.7961-.06505-1.8104-.06563-3.2229-.06563h-4c-1.41251 0-2.42678.00058-3.22292.06563z"
									fill-rule="evenodd"
								></path></g
							></svg
						></span
					>
				</Button>
				{#if mini}
					<MenuToggle onClick={toggleMenu} {menuView} color={navScroll && !menuView ? "#FFFFFF" : "#000000"} />
				{/if}
			</div>
		</div>
	</div>
</header>
{#if mini}
	<MenuSlide view={menuView} />
{/if}

<style>
	header {
		--logo-width: clamp(8rem, 12dvw, 12rem);
		will-change: background-color;
		background-color: transparent;
		transition: background-color 0.3 cubic-bezier(0.25, 0.1, 0, 0.93);
	}

	.logo-modifier {
		width: var(--logo-width);
		height: max-content;
		will-change: height, width;
		transition: 0.3s cubic-bezier(0.25, 0.1, 0, 0.93);
	}

	.nav__bg {
		background-color: black;
		--logo-width: clamp(7rem, 7dvw, 12rem);
		transition: 0.3 cubic-bezier(0.25, 0.1, 0, 0.93);
		padding-block: 1em;

		@media screen and (max-width: 768px) {
			padding-block: 2em;
		}
	}
</style>
