<script lang="ts">
	import { navigating } from "$app/stores";
	import Header from "$lib/components/Header.svelte";
	import { setContext } from "svelte";
	import "../app.css";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { ScrollSmoother } from "gsap/ScrollSmoother";
	import { TextPlugin } from "gsap/TextPlugin";
	import Footer from "$lib/components/footer/Footer.svelte";
	const { children, data } = $props();

	import type { CTAItem, LinkType } from "$lib/types/variables";
	import { CTA_ITEMS, PRIMARY_LINK_ITEMS } from "$lib/types/constants";
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

	let loaded = $state(false);
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

		if ($navigating) {
			smoother.scrollTo(0);
		}

		return () => {
			smoother?.kill();
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link href="https://fonts.googleapis.com/css2?family=Akshar:wght@300..700&display=swap" rel="stylesheet" />
</svelte:head>
<div id="smooth-wrapper">
	<Header {navScroll} />
	<div id="smooth-content">
		{@render children()}
		<Footer />
	</div>
</div>
