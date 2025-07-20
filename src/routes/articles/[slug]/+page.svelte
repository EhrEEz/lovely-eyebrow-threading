<script lang="ts">
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { ScrollToPlugin } from "gsap/ScrollToPlugin";
	import { ScrollSmoother } from "gsap/ScrollSmoother";
	import { SplitText } from "gsap/SplitText";
	import Button from "$lib/components/buttons/Button.svelte";
	import * as Article from "$lib/components/cards/article";
	import Social from "$lib/components/social/Social.svelte";
	import { Tag } from "$lib/components/cards/article";
	import moment from "moment";
	import { marked, type RendererObject } from "marked";
	import { page } from "$app/state";
	import Swiper from "swiper";
	import { Autoplay, Navigation, Pagination } from "swiper/modules";
	import "$lib/scss/pages/_blogs.scss";
	import "swiper/swiper-bundle.css";
	import Seo from "$lib/components/seo/SEO.svelte";
	import { afterNavigate } from "$app/navigation";
	import { getContext } from "svelte";
	const { data } = $props();
	const article = $derived(data.article);
	const relatedArticles = $derived(article.related_articles.articles);
	const media_url = $derived(data.media_url);
	let relatedArticlesEmt = $state<HTMLElement>();
	let relatedArticlesNext = $state<HTMLButtonElement>();
	let relatedArticlesPrev = $state<HTMLButtonElement>();
	let relatedArticlesPagination = $state<HTMLDivElement>();
	let _relatedArticlesSlider: Swiper;

	const customRenderer: RendererObject = {
		heading({ tokens, depth }): string {
			const text = this.parser.parseInline(tokens);
			return `<h${depth === 1 ? 2 : depth}${depth === 1 ? ` class="heading-1 content-element"` : ' class="content-element"'}>${text}</h${depth === 1 ? 2 : depth}>`;
		},
		link({ tokens, href, title }): string {
			const text = this.parser.parseInline(tokens);
			return `<a href="${href}" title="${title ? title : href}" target="_blank" class="content-element">${text}</a>`;
		},

		paragraph({ tokens }): string {
			const text = this.parser.parseInline(tokens);
			return `<p class="content-element">${text}</p>`;
		},
		list({ ordered, items }): string {
			const tag = ordered ? "ol" : "ul";
			return `<${tag} class="content-element">${items}</${tag}>`;
		},
		listitem({ tokens }): string {
			const text = this.parser.parseInline(tokens);
			return `<li class="content-element">${text}</li>`;
		},
		blockquote({ tokens }): string {
			const text = this.parser.parse(tokens);
			return `<blockquote class="content-element">${text}</blockquote>`;
		},
		code({ text, lang }): string {
			return `<pre class="content-element"><code${lang ? ` class="language-${lang}"` : ""}>${text}</code></pre>`;
		},
		codespan({ text }): string {
			return `<code class="content-element">${text}</code>`;
		},
		image({ href, title, text }): string {
			return `<img src="${href}" alt="${text}" title="${title || ""}" class="content-element" />`;
		},
		table({ header, rows }): string {
			return `<table class="content-element"><thead>${header}</thead><tbody>${rows}</tbody></table>`;
		},
	};

	marked.use({ renderer: customRenderer });

	$effect(() => {
		gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText, ScrollSmoother);
		if (relatedArticlesEmt) {
			_relatedArticlesSlider = new Swiper(relatedArticlesEmt, {
				modules: [Navigation, Pagination, Autoplay],
				navigation: {
					nextEl: relatedArticlesNext,
					prevEl: relatedArticlesPrev,
				},
				pagination: {
					el: relatedArticlesPagination,
					clickable: true,
				},
			});
		}
		const smoother: ScrollSmoother = getContext("smoother");
		if (smoother) {
			smoother.scrollTo(0);
			smoother.scrollTrigger.refresh();
		}
	});

	afterNavigate(() => {
		if (window.innerWidth > 992) {
			const blogScrollTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: ".sidebar",
					start: "top top",
					toggleActions: "play none reverse none",
					pin: ".stick-top",
					end: "bottom top",
				},
			});
		}
		const titleSplit = SplitText.create(".article__title", { type: "words, chars" });
		const articleTimeline = gsap.timeline({
			delay: 1,
			scrollTrigger: {
				trigger: ".articles__section",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		});
		articleTimeline
			.addLabel("start")
			.from(
				titleSplit.chars,
				{
					translateY: "0.4em",
					// transformOrigin: "50% 50% -0.5rem",
					opacity: 0,
					duration: 0.8,
					ease: "power4.inOut",
					stagger: 0.015,
				},
				"start"
			)
			.from(
				".appear-top",
				{
					translateY: "1em",
					opacity: 0,
					stagger: 0.025,
					ease: "power1.inOut",
					duration: 1,
				},
				"start+=0.1"
			)
			.from(
				".appear-top--delayed",
				{
					translateY: "1em",
					opacity: 0,
					stagger: 0.025,
					ease: "power1.inOut",
					duration: 1,
				},
				"start+=0.3"
			)
			.from(
				".appear-bottom",
				{
					translateY: "1em",
					opacity: 0,
					stagger: 0.05,
					ease: "power1.inOut",
					duration: 0.6,
				},
				"start+=0.4"
			)
			.from(
				".appear-top--delayed-xl",
				{
					translateX: 20,
					opacity: 0,
					stagger: 0.05,
					ease: "power1.inOut",
					duration: 0.6,
				},
				"start+=0.6"
			);

		gsap.utils.toArray(".content-element").forEach((emt) => {
			gsap.from(emt as HTMLElement, {
				scrollTrigger: {
					trigger: emt as HTMLElement,
					start: "top 85%",
					toggleActions: "play none none none",
				},
				y: 20,
				opacity: 0,
				duration: 0.6,
				ease: "power1.out",
			});
		});
	});
	let copySuccess = $state(false);
	const copyCurrentLink = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			copySuccess = true;
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
		} catch (err) {
			// Fallback for older browsers
			const textArea = document.createElement("textarea");
			textArea.value = page.url.href;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			copySuccess = true;
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
		}
	};
</script>

<Seo
	{media_url}
	siteSettings={data.siteSettings}
	pageSettings={{
		page_seo: article.seo,
		page_title: article.title,
	}}
/>

<main>
	<section class="pt-36 lg:pt-64 xl:py-72 articles__section">
		<div class="container">
			<h1 class="text-6xl lg:text-8xl lg:max-w-[80%] article__title">{article.title}</h1>
			<div class="lg:grid lg:grid-cols-2 lg:gap-12">
				<div class="blog__summary">
					<div class="blog__details flex gap-4 items-center appear-top">
						<Tag class="mb-0">{article.article_tag?.title}</Tag>
						<div class="date-wrapper font-medium uppercase text-text-light appear-top">
							{moment(article.created).format("MMMM DD, YYYY | dddd")}
						</div>
					</div>
					<div class="socials__wrapper mt-4 lg:mt-12">
						<div class="uppercase text-lg mb-3 appear-top--delayed">Share this article</div>
						<div class="left-section flex gap-8 items-center justify-between md:justify-normal flex-grow basis-0">
							<button
								onclick={() => {
									const text = encodeURIComponent(article.title);
									const image = encodeURIComponent(media_url + article.cover.media.formats.thumbnail.url);
									const url = encodeURIComponent(page.url.href);
									return window.open(
										`https://pinterest.com/pin/create/link/?url=${url}&media=${image}&description=${text}`,
										"_blank",
										"width=500,height=500"
									);
								}}
								title="pin this article"
								class="hover:opacity-80 appear-top--delayed"
							>
								<span class="sr-only">Pin this Article</span>
								<Social name="pinterest" size={24} />
							</button>
							<button
								type="button"
								title="Share on X (fka Twitter)"
								onclick={() => {
									const text = encodeURIComponent(article.title);
									const url = encodeURIComponent(page.url.href);
									return window.open(
										`https://x.com/intent/tweet?text=${text}&url=${url}`,
										"_blank",
										"width=500,height=500"
									);
								}}
								class="hover:opacity-80 appear-top--delayed"
							>
								<span class="sr-only">Share on X (f.k.a Twitter)</span>
								<Social name="x" size={24} />
							</button>

							<button
								onclick={() => {
									return window.open(
										`https://www.facebook.com/sharer/sharer.php?u=${page.url.href}`,
										"_blank",
										"width=500,height=500"
									);
								}}
								class="hover:opacity-80 appear-top--delayed"
								title="Share on Facebook"
							>
								<span class="sr-only">Share on Facebook</span>

								<Social name="facebook" size={24} />
							</button>
							<button
								title="Share on Threads"
								onclick={() => {
									const text = encodeURIComponent(article.title);
									const url = encodeURIComponent(page.url.href);
									return window.open(
										`https://www.threads.net/intent/post?url=${url}&text=${text}`,
										"_blank",
										"width=500,height=500"
									);
								}}
								class="hover:opacity-80 appear-top--delayed"
							>
								<span class="sr-only">Share on Threads</span>
								<Social name="threads" size={24} />
							</button>
							<button
								class="hover:opacity-80 appear-top--delayed relative after:content-['Copied'] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:translate-y-2 {!copySuccess
									? 'after:opacity-0'
									: 'after:opacity-1'} after:transition after:duration-[300ms] after:bg-black after:px-2 after:py-1 after:rounded-sm after:text-white"
								title="Copy Link"
								onclick={copyCurrentLink}
							>
								<Social name="link" size={24} />
							</button>
						</div>
					</div>
					<div class="summary_wrapper mt-8 md:mt-12 md:me-24">
						<h2 class="text-primary font-sans uppercase mb-2 appear-bottom">Summary</h2>
						<p class="my-4 text-lg md:pe-16 appear-bottom">
							{article.description}
						</p>
						<div class="appear-bottom">
							<Button
								onclick={() => {
									gsap.to(window, {
										duration: 0.6,
										scrollTo: { y: "#contentTop", offsetY: 50 },
									});
								}}><span class="btn__text"> Jump to Content </span></Button
							>
						</div>
					</div>
				</div>
				<div class="blog__image overflow-hidden aspect-[4/3] rounded-lg mt-8 appear-top--delayed-xl">
					<img
						loading="lazy"
						src={media_url + article.cover.media.formats.thumbnail.url}
						title={article.cover.media.name}
						srcset="
				{article.cover.media.formats.thumbnail ? `${media_url + article.cover.media.formats.thumbnail.url} 234w,` : ''}
				{article.cover.media.formats.small ? `${media_url + article.cover.media.formats.small.url} 500w,` : ''}
				{article.cover.media.formats.medium ? `${media_url + article.cover.media.formats.medium.url} 750w,` : ''}
				{article.cover.media.formats.large ? `${media_url + article.cover.media.formats.large.url} 1000w,` : ''}"
						class="w-full h-full object-cover"
						alt="Cover of {article.cover.alt ?? article.cover.media.alternativeText ?? article?.title}"
					/>
				</div>
			</div>
			<div class="lg:grid lg:grid-cols-12 my-16 md:my-24 lg:gap-16">
				<article class="content-wrapper lg:col-span-8 xl:col-span-7" id="contentTop">
					{@html marked(article.content)}
				</article>
				<aside class="md:col-span-4 md:col-start-9 mt-16 md:mt-0 sidebar">
					<div class="sticky top-32 bottom-16 stick-top">
						<div class="socials__wrapper mb-16">
							<div class="uppercase text-lg mb-3 appear-top--delayed">Share this article</div>
							<div class="left-section flex gap-8 items-center justify-between md:justify-normal flex-grow basis-0">
								<button
									onclick={() => {
										const text = encodeURIComponent(article.title);
										const image = encodeURIComponent(media_url + article.cover.media.formats.thumbnail.url);
										const url = encodeURIComponent(page.url.href);
										return window.open(
											`https://pinterest.com/pin/create/link/?url=${url}&media=${image}&description=${text}`,
											"_blank",
											"width=500,height=500"
										);
									}}
									title="pin this article"
									class="hover:opacity-80 appear-top--delayed"
								>
									<span class="sr-only">Pin this Article</span>
									<Social name="pinterest" size={24} />
								</button>
								<button
									type="button"
									title="Share on X (fka Twitter)"
									onclick={() => {
										const text = encodeURIComponent(article.title);
										const url = encodeURIComponent(page.url.href);
										return window.open(
											`https://x.com/intent/tweet?text=${text}&url=${url}`,
											"_blank",
											"width=500,height=500"
										);
									}}
									class="hover:opacity-80 appear-top--delayed"
								>
									<span class="sr-only">Share on X (f.k.a Twitter)</span>
									<Social name="x" size={24} />
								</button>

								<button
									onclick={() => {
										return window.open(
											`https://www.facebook.com/sharer/sharer.php?u=${page.url.href}`,
											"_blank",
											"width=500,height=500"
										);
									}}
									class="hover:opacity-80 appear-top--delayed"
									title="Share on Facebook"
								>
									<span class="sr-only">Share on Facebook</span>

									<Social name="facebook" size={24} />
								</button>
								<button
									title="Share on Threads"
									onclick={() => {
										const text = encodeURIComponent(article.title);
										const url = encodeURIComponent(page.url.href);
										return window.open(
											`https://www.threads.net/intent/post?url=${url}&text=${text}`,
											"_blank",
											"width=500,height=500"
										);
									}}
									class="hover:opacity-80 appear-top--delayed"
								>
									<span class="sr-only">Share on Threads</span>
									<Social name="threads" size={24} />
								</button>
								<button
									class="hover:opacity-80 appear-top--delayed relative after:content-['Copied'] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:translate-y-2 {!copySuccess
										? 'after:opacity-0'
										: 'after:opacity-1'} after:transition after:duration-[300ms] after:bg-black after:px-2 after:py-1 after:rounded-sm after:text-white"
									title="Copy Link"
									onclick={copyCurrentLink}
								>
									<Social name="link" size={24} />
								</button>
							</div>
						</div>
						{#if relatedArticles && relatedArticles.length > 0}
							<div class="related-articles__wrapper relative pb-16">
								<div class="swiper" bind:this={relatedArticlesEmt}>
									<div class="swiper-wrapper">
										{#each relatedArticles as relatedArticle}
											<div class="swiper-slide">
												<Article.Card size="sm" href={"/articles/" + relatedArticle.slug}>
													<Article.Image img={relatedArticle.cover} />
													<Article.Content>
														<Article.Head>
															<Article.Tag>{relatedArticle.article_tag?.title}</Article.Tag>
															<Article.Title>{relatedArticle.title}</Article.Title>
															<div class="font-medium text-text-light uppercase">
																{moment(relatedArticle.created).format("MMMM DD, YYYY | dddd")}
															</div>
														</Article.Head>
														<Article.Body>
															<p class="leading-6">
																{relatedArticle.description}
															</p>
														</Article.Body>
														<Article.Link>Read Full Article</Article.Link>
													</Article.Content>
												</Article.Card>
											</div>
										{/each}
									</div>
								</div>
								<div class="button__wrapper absolute right-0 bottom-0 translate-y-1/2 z-20">
									<button
										class="arrow_button prev__button arrow--medium"
										bind:this={relatedArticlesPrev}
										aria-label="Previous Slide"
									>
										<svg fill="none" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"
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
										class="arrow_button next__button arrow--medium"
										bind:this={relatedArticlesNext}
										aria-label="Next Slide"
									>
										<svg width="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
								<div
									class="swiper-pagination !bottom-0 right-auto left-0 z-10 !text-left"
									bind:this={relatedArticlesPagination}
								></div>
							</div>
						{/if}
					</div>
				</aside>
			</div>
		</div>
	</section>
</main>
