<script lang="ts">
	import { SplitText } from "gsap/SplitText";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import Swiper from "swiper";
	import "swiper/swiper-bundle.css";
	import "$lib/scss/components/_slider.scss";
	import { Navigation, Autoplay, Thumbs, EffectCreative, Controller, EffectFade } from "swiper/modules";
	import ServiceImage from "./ServiceImage.svelte";
	import Button from "$lib/components/buttons/Button.svelte";
	const { services, media_url } = $props();
	import gsap from "gsap";

	let serviceRefs: ServiceImage[] = $state([]);
	let currentSlideIndex = $state(0);
	let previousSlideIndex = $state(services.length - 1);
	let pictureSlider: HTMLElement;
	let navSlider: HTMLElement;
	let textSlider: HTMLElement;
	let swiper_nav: Swiper;
	let swiper_picture: Swiper;
	let swiper_text: Swiper;
	let nextSlide: HTMLButtonElement;
	let prevSlide: HTMLButtonElement;
	let nextNavSlide: HTMLButtonElement;
	let prevNavSlide: HTMLButtonElement;

	$effect(() => {
		gsap.registerPlugin(SplitText, ScrollTrigger);

		swiper_nav = new Swiper(navSlider, {
			modules: [Navigation],
			slidesPerView: "auto",
			spaceBetween: 40,
			grabCursor: true,
			navigation: {
				nextEl: nextNavSlide,
				prevEl: prevNavSlide,
			},
			breakpoints: {
				0: {
					spaceBetween: 15,
				},
				600: {
					spaceBetween: 25,
				},
				900: {
					spaceBetween: 40,
				},
			},
			on: {
				slideChange: (swp) => {
					const currentSlide = swp.slides[swp.activeIndex];
					currentSlide.querySelector(".service__tab")?.classList.add("active");
				},
			},
		});
		swiper_picture = new Swiper(pictureSlider, {
			modules: [Navigation, Thumbs, EffectCreative, Controller],
			watchSlidesProgress: true,
			slidesPerView: 1,
			effect: "creative",
			creativeEffect: {
				next: {
					translate: [0, 10, 10],
					rotate: [0, 0, 10],
					opacity: 0,
					scale: 0.8,
					shadow: false,
					origin: "center center",
				},
				prev: {
					translate: [0, 10, 0],
					rotate: [0, 0, -10],
					opacity: 0,
					scale: 0.8,
					shadow: false,
					origin: "center center",
				},
			},

			on: {
				slideChange: (swp) => {
					currentSlideIndex = swp.activeIndex;
					previousSlideIndex = swp.previousIndex;
					if (serviceRefs[currentSlideIndex]) {
						serviceRefs[currentSlideIndex].animateText();
					}
					if (serviceRefs[previousSlideIndex]) {
						serviceRefs[previousSlideIndex].reset();
					}
				},
			},
			grabCursor: true,
		});
		swiper_text = new Swiper(textSlider, {
			modules: [Navigation, Autoplay, Thumbs, Controller, EffectFade],
			slidesPerView: 1,
			watchSlidesProgress: true,
			autoplay: {
				delay: 5000,
			},
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			navigation: {
				nextEl: nextSlide,
				prevEl: prevSlide,
			},
			grabCursor: true,
			thumbs: {
				swiper: swiper_nav,
			},
			on: {
				slideChange: (swp) => {
					const currentSlide = swp.slides[swp.activeIndex];
					let split = SplitText.create(currentSlide.querySelector(".split"), { type: "lines" });
					let animation = gsap.from(split.lines, {
						// rotationX: -100,
						translateY: "1em",
						// transformOrigin: "50% 50% -0.5rem",
						opacity: 0,
						duration: 1,
						ease: "power4.inOut",
						stagger: 0.045,
					});
					animation.then(() => {
						animation.kill();
					});
				},
				afterInit: (swp) => {
					serviceRefs[swp.activeIndex].animateText();
					serviceRefs[swp.slides.length - 1].reset();
				},
			},
			controller: {
				control: swiper_picture,
			},
		});

		swiper_picture.controller.control = [swiper_text];
		swiper_text.controller.control = [swiper_picture];

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".homepage-service__slider",
				start: "top 70%",
				toggleActions: "play none none none",
			},
		});
		tl.fromTo(
			".homepage-service__slider",
			{
				opacity: 0,
				translateY: 100,
			},
			{
				opacity: 1,
				translateY: 0,
				onUpdate: () => {
					swiper_text.slideTo(0, 600, true);
					// serviceRefs[currentSlideIndex].animateText();
				},
			}
		);
	});
</script>

<section class="homepage__service">
	<div class="container">
		<div class="homepage-service__slider grid grid-cols-12 content-center items-center gap-8">
			<div class="service__image-wrapper col-span-12 lg:col-span-6 content-start content-xl-end" data-speed={0.9}>
				<div class="swiper" id="pictureSlider" bind:this={pictureSlider}>
					<div class="swiper-wrapper">
						{#each services as service, ind}
							<div class="swiper-slide">
								<ServiceImage
									image={media_url + service.cover.url}
									text={service.name}
									{ind}
									bind:this={serviceRefs[ind]}
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div
				class="service__text-wrapper col-span-12 justify-self-center md:col-span-11 lg:col-span-6 xl:col-span-5 xl:col-start-8 grid content-end lg:justify-self-end md:pb-24 relative"
			>
				<div class="flex gap-2 items-center mb-4 md:mb-8">
					<div class="swiper w-full" id="navSlider" bind:this={navSlider}>
						<div class="swiper-wrapper">
							{#each services as service}
								<div class="swiper-slide cursor-pointer group grow-0 !w-fit">
									<div
										class="service__tab decoration-primary underline-offset-4 decoration-4 opacity-40 group-hover:opacity-100 group-[.swiper-slide-thumb-active]:opacity-100 !w-fit uppercase text-sm md:text-md lg:text-lg"
										data-text={service.name}
									>
										<span class="service__tab-text">
											{service.name}
										</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="flex items-center">
						<button class="arrow_button arrow--small" bind:this={prevNavSlide} aria-label="Next Slide Item">
							<svg fill="none" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"
								><g clip-rule="evenodd" fill="rgb(255,255,255)" fill-rule="evenodd"
									><path d="m3.24951 11.25h17.49979v1.5h-17.49979z"></path><path
										d="m3.99962 12.75c3.52755 0 6.41008-3.10214 6.41008-6.41005v-.75h-1.50003v.75c0 2.51158-2.24266 4.91005-4.91005 4.91005h-.75011v1.5z"
									></path><path
										d="m3.99962 11.25c3.52755 0 6.41008 3.1021 6.41008 6.41v.75h-1.50003v-.75c0-2.5115-2.24266-4.91-4.91005-4.91h-.75011v-1.5z"
									></path></g
								>
							</svg>
						</button>
						<button
							class="arrow_button arrow--small next__button"
							bind:this={nextNavSlide}
							aria-label="Next Slide Item"
						>
							<svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M20.7505 11.25H3.2507V12.75H20.7505V11.25Z"
									fill="white"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M20.0004 12.75C16.4728 12.75 13.5903 9.64788 13.5903 6.33997V5.58997H15.0903V6.33997C15.0903 8.85155 17.333 11.25 20.0004 11.25H20.7505V12.75H20.0004Z"
									fill="white"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M20.0004 11.25C16.4728 11.25 13.5903 14.3521 13.5903 17.66V18.41H15.0903V17.66C15.0903 15.1485 17.333 12.75 20.0004 12.75H20.7505V11.25H20.0004Z"
									fill="white"
								/>
							</svg>
						</button>
					</div>
				</div>
				<div class="swiper w-full" bind:this={textSlider} id="textSlider">
					<div class="swiper-wrapper">
						{#each services as service}
							<div class="swiper-slide">
								<p class="md:text-lg leading-loose md:leading-loose lg:leading-loose split">
									{service.description}
								</p>
								<div class="flex row gap-4 items-center mt-8 service__actions-wrapper">
									<Button variant="link" data-sveltekit-reload href="/services/{service.slug}">Check out More</Button>
									{#if service.cta_link}
										<Button href={service.cta_link}>Book Now</Button>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="button__wrapper absolute right-2 bottom-0 translate-y-1/2 z-10">
					<button class="arrow_button prev__button" bind:this={prevSlide} aria-label="Previous Slide" data-speed={1.05}>
						<svg fill="none" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg"
							><g clip-rule="evenodd" fill="rgb(255,255,255)" fill-rule="evenodd"
								><path d="m3.24951 11.25h17.49979v1.5h-17.49979z"></path><path
									d="m3.99962 12.75c3.52755 0 6.41008-3.10214 6.41008-6.41005v-.75h-1.50003v.75c0 2.51158-2.24266 4.91005-4.91005 4.91005h-.75011v1.5z"
								></path><path
									d="m3.99962 11.25c3.52755 0 6.41008 3.1021 6.41008 6.41v.75h-1.50003v-.75c0-2.5115-2.24266-4.91-4.91005-4.91h-.75011v-1.5z"
								></path></g
							>
						</svg>
					</button>
					<button class="arrow_button next__button" bind:this={nextSlide} aria-label="Next Slide">
						<svg width="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M20.7505 11.25H3.2507V12.75H20.7505V11.25Z"
								fill="white"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M20.0004 12.75C16.4728 12.75 13.5903 9.64788 13.5903 6.33997V5.58997H15.0903V6.33997C15.0903 8.85155 17.333 11.25 20.0004 11.25H20.7505V12.75H20.0004Z"
								fill="white"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M20.0004 11.25C16.4728 11.25 13.5903 14.3521 13.5903 17.66V18.41H15.0903V17.66C15.0903 15.1485 17.333 12.75 20.0004 12.75H20.7505V11.25H20.0004Z"
								fill="white"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
