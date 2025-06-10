<script lang="ts">
	import { navigating } from "$app/stores";
	import Header from "$lib/components/Header.svelte";
	import { setContext } from "svelte";
	import "../app.css";
	import Lenis from "lenis";
	import Footer from "$lib/components/footer/Footer.svelte";
	const { children, data } = $props();

	const main = $state(data.siteSettings);
	let navScroll = $state<boolean>(false);
	setContext("site-settings", main);
	let lenis: Lenis;
	$effect(() => {
		lenis = new Lenis({
			autoRaf: true,
		});
		setContext("lenis", lenis);
		lenis.on("scroll", (e) => {
			const top = window.scrollY;
			if (top >= 100) {
				navScroll = true;
			} else {
				navScroll = false;
			}
		});

		if ($navigating) {
			lenis.scrollTo(0);
		}
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link href="https://fonts.googleapis.com/css2?family=Akshar:wght@300..700&display=swap" rel="stylesheet" />
</svelte:head>
<Header {navScroll} />
{@render children()}
<Footer />
