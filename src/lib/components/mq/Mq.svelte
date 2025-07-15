<script lang="ts">
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { horizontalLoop } from "$lib/utils/utils";
	const { children, separator = "-" } = $props();
	$effect(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Select marquee elements
		const marqueeElements: Element[] = gsap.utils.toArray(".mq__item");

		// Configuration
		const config = {
			speed: 1,
			repeat: 1,
			reversed: false,
		};

		// Function to create a horizontal loop

		// Initialize the marquee
		const marqueeTimeline = horizontalLoop(marqueeElements, config);

		// Optionally, trigger the animation with ScrollTrigger
		ScrollTrigger.create({
			trigger: ".mq__wrapper",
			start: "top bottom",
			end: "bottom top",

			onEnter: () => {
				marqueeTimeline.play();
			},
			onLeave: () => {
				marqueeTimeline.pause();
			},
			onEnterBack: () => {
				marqueeTimeline.play();
			},
			onLeaveBack: () => {
				marqueeTimeline.pause();
			},
			// markers: true // for debugging
		});
	});
</script>

<div class="mq__wrapper flex gap-[3rem] items-center relative overflow-x-clip">
	<h3 class="mq__item font-serif text-8xl md:text-9xl !leading-none whitespace-nowrap">
		{@render children?.()}
	</h3>
	<div class="mq__item font-serif text-8xl md:text-9xl !leading-[0.5] -mt-[0.05em]" aria-hidden={true}>
		{separator}
	</div>
	<div class="mq__item font-serif text-8xl md:text-9xl !leading-none whitespace-nowrap" aria-hidden={true}>
		{@render children?.()}
	</div>
	<div class="mq__item font-serif text-8xl md:text-9xl !leading-[0.5] -mt-[0.05em]" aria-hidden={true}>
		{separator}
	</div>

	<div class="mq__item font-serif text-8xl md:text-9xl !leading-none whitespace-nowrap" aria-hidden={true}>
		{@render children?.()}
	</div>
	<div class="mq__item font-serif text-8xl md:text-9xl !leading-[0.5] -mt-[0.05em]" aria-hidden={true}>
		{separator}
	</div>

	<div class="mq__item font-serif text-8xl md:text-9xl !leading-none whitespace-nowrap" aria-hidden={true}>
		{@render children?.()}
	</div>
	<div class="mq__item font-serif text-8xl md:text-9xl !leading-[0.5] -mt-[0.05em] pr-[3rem]" aria-hidden={true}>
		{separator}
	</div>
</div>

<style>
	.mq__wrapper * {
		white-space: nowrap;
	}
</style>
