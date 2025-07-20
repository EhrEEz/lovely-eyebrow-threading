<script lang="ts">
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { SplitText } from "gsap/SplitText";
	import { afterNavigate } from "$app/navigation";
	import Button from "$lib/components/buttons/Button.svelte";
	import * as Article from "$lib/components/cards/article";
	import Seo from "$lib/components/seo/SEO.svelte";

	const { data } = $props();
	let articles: typeof data.articles = $state(data.articles);
	const meta = $state(data.meta);
	const page_info = $derived(data.page_info);
	const media_url = $derived(data.media_url);
	let page = $state(meta.pagination.page);
	let pageCount = $state(meta.pagination.pageCount);
	let loading = $state(false);

	const loadMore = async () => {
		if (page >= pageCount) return;
		loading = true;

		const params = new URLSearchParams({
			"pagination[page]": page + 1,
			"pagination[pageSize]": "11",
		});
		const res = await fetch(`/ep/getMoreBlogs?${params.toString()}`);
		const json = await res.json();
		const additionalArticles: typeof articles = json.data;
		articles = [...articles, ...additionalArticles];
		page = json.meta.pagination.page;
		pageCount = json.meta.pagination.pageCount;
		loading = false;
	};

	const morePages = $derived.by(() => {
		if (meta && pageCount > page) {
			return true;
		}
		return false;
	});

	$effect(() => {
		gsap.registerPlugin(ScrollTrigger, SplitText);
	});
	afterNavigate(() => {
		{
			const titleSplit = SplitText.create(".blog__title", { type: "words, chars" });
			const articleTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: ".blog__section",
					start: "top 70%",
					toggleActions: "play none none none",
				},
				delay: 0.6,
			});
			articleTimeline.addLabel("start").from(titleSplit.chars, {
				opacity: 0,
				translateY: "-0.4em",
				skewY: 3,
				duration: 0.6,
				stagger: 0.015,
				ease: "power4.inOut",
			});
			let emtCount = -1;
			gsap.utils.toArray(".article__card").forEach((emt) => {
				emtCount++;
				gsap.from(emt as HTMLElement, {
					scrollTrigger: {
						trigger: emt as HTMLElement,
						start: "top bottom",
						toggleActions: "play none none none",
					},
					y: 30,
					opacity: 0,
					duration: 1,
					ease: "power4.in",
				});
			});
		}
	});
</script>

<Seo {media_url} siteSettings={data.siteSettings} pageSettings={page_info.page_info} />
<main>
	{#await articles then}
		{#if articles.length === 0}
			<section class="pt-64 pb-48 blog__section">
				<div class="text-5xl text-center text-text-light font-serif blog__title">No Content Yet</div>
			</section>
		{:else}
			<section class="articles__section pt-40 md:pt-48 lg:pt-64 pb-24 md:pb-48 blog__section">
				<div class="container">
					<h2 class="text-6xl md:text-8xl break-words text-center mb-8 md:mb-24 blog__title">Latest articles</h2>
					{#if articles.length > 1}
						<div class="grid grid-cols-12 xl:mt-16 mt-4 md:mt-8 lg:mt-16 justify-center items-stretch xl:gap-16 gap-4">
							{#each articles as article, index}
								{#if index === 0}
									<Article.Card
										size="lg"
										href={`/articles/` + article.slug}
										class="md:col-span-10 col-span-12 !flex-row md:col-start-2 article__card"
									>
										<Article.Image img={article.cover} class="w-1/2" />
										<Article.Content class="w-1/2">
											<Article.Head>
												<Article.Tag>{article?.article_tag.title}</Article.Tag>
												<Article.Title>{article.title}</Article.Title>
												<div class="font-medium text-text-light uppercase">
													{article.date}
												</div>
											</Article.Head>
											<Article.Body>
												<p class="leading-6 hidden md:block">
													{article.description}
												</p>
											</Article.Body>
											<Article.Link href={`/articles/` + article.slug}>Read Article</Article.Link>
										</Article.Content>
									</Article.Card>
								{:else}
									<Article.Card href={`/articles/` + article.slug} class="col-span-6 article__card">
										<Article.Image img={article.cover} />
										<Article.Content>
											<Article.Head>
												<Article.Tag>{article.article_tag?.title}</Article.Tag>
												<Article.Title>{article.title}</Article.Title>
												<div class="font-medium text-text-light uppercase">
													{article.date}
												</div>
											</Article.Head>
											<Article.Body>
												<p class="leading-6 hidden md:block">
													{article.description}
												</p>
											</Article.Body>
											<Article.Link href={"/articles/" + article.slug}>Read Article</Article.Link>
										</Article.Content>
									</Article.Card>
								{/if}
							{/each}
						</div>
						{#if morePages}
							<div class="flex justify-center my-24">
								<Button onclick={() => loadMore()} disabled={loading}>{loading ? "Loading..." : "Load More"}</Button>
							</div>
						{/if}
					{/if}
				</div>
			</section>
		{/if}
	{/await}
</main>
