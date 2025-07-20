<script lang="ts">
	import { navigating } from "$app/state";
	import Header from "$lib/components/Header.svelte";
	import { setContext } from "svelte";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { ScrollSmoother } from "gsap/ScrollSmoother";
	import { TextPlugin } from "gsap/TextPlugin";
	import Logo from "$lib/assets/svg/logo-loading.svg";
	import Footer from "$lib/components/footer/Footer.svelte";
	import "../app.css";
	const { children, data } = $props();

	import type { CTAItem, LinkType } from "$lib/types/variables";
	import { CTA_ITEMS, PRIMARY_LINK_ITEMS } from "$lib/types/constants";
	import { fly, slide } from "svelte/transition";
	import { expoInOut } from "svelte/easing";
	import { afterNavigate, beforeNavigate, goto, onNavigate } from "$app/navigation";
	const main = $state(data.siteSettings);

	let navScroll = $state<boolean>(false);
	const ctaLinks = $state<CTAItem[]>(CTA_ITEMS);
	const default_cta = {
		name: "Contact Us",
		href: "/contact",
		id: "contact",
	};
	let cta = $state<CTAItem>(default_cta);
	$effect(() => {
		if (!main.cta && !main.cta.cta) {
			cta = default_cta;
		} else {
			const ctaItem = ctaLinks.find((emt) => emt.id === main.cta.cta);
			if (!ctaItem) {
				cta = default_cta;
			} else {
				cta = ctaItem;
			}
		}
	});
	setContext("cta", cta);
	setContext("site-settings", main);
	let smoother: ScrollSmoother;
	let pendingNavigation: string | null = null;
	let showLoading = $state(true);
	let loadingTimeout: number;
	$effect(() => {
		// console.clear();
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TextPlugin);
		smoother = ScrollSmoother.create({
			wrapper: "#smooth-wrapper",
			content: "#smooth-content",
			smooth: 1.2,
			effects: true,
			smoothTouch: 0.1,
			onUpdate: (self) => {
				const top = self.scrollTop();
				if (top >= 100) {
					navScroll = true;
				} else {
					navScroll = false;
				}
			},
		});
		smoother.effects("[data-speed], [data-lag]");

		setContext("smoother", smoother);

		if (navigating) {
			smoother.scrollTo(0);
		}

		return () => {
			if (loadingTimeout) clearTimeout(loadingTimeout);
			smoother?.kill();
		};
	});
	async function handleLoadingComplete() {
		if (pendingNavigation) {
			const target = pendingNavigation;
			pendingNavigation = null;
			showLoading = false;

			// Use setTimeout to ensure the loading screen transition completes
			setTimeout(async () => {
				await goto(target);
			}, 100);
		}
	}

	beforeNavigate((navigation) => {
		if (!showLoading && navigation.to) {
			showLoading = true;
			pendingNavigation = navigation.to.url.pathname;
			navigation.cancel();

			loadingTimeout = setTimeout(async () => {
				if (pendingNavigation) {
					const target = pendingNavigation;
					pendingNavigation = null;
					await goto(target);
				}
			}, 1000);
		}
	});

	afterNavigate(() => {
		showLoading = false;
		smoother?.scrollTo(0);
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link href="https://fonts.googleapis.com/css2?family=Akshar:wght@300..700&display=swap" rel="stylesheet" />
</svelte:head>
{#if showLoading}
	<div
		class="loading__overlay"
		in:fly={{ duration: 1000, y: "100%", opacity: 1, easing: expoInOut }}
		out:fly={{ duration: 1000, y: "-100%", opacity: 1, easing: expoInOut }}
	>
		<img src={Logo} class="loading__logo" alt="Lovely Eyebrow Threading Loading" />
	</div>
{/if}

<div id="smooth-wrapper">
	<Header {navScroll} />
	<div id="smooth-content">
		{@render children()}
		<Footer />
	</div>
</div>

<style>
	.loading__overlay {
		position: fixed;
		inset: 0;
		background-color: hsl(316 89% 83% / 60%);
		backdrop-filter: blur(4rem) saturate(3.5) invert(0.8) hue-rotate(-88deg) brightness(4);
		inline-size: 100dvw;
		block-size: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.loading__logo {
		inline-size: clamp(10rem, 25dvh, 25rem);
	}
</style>
