<script lang="ts">
	import Button from "$lib/components/buttons/Button.svelte";
	import * as Article from "$lib/components/cards/article";

	import { page as sv_page } from "$app/stores";

	const { data } = $props();
	let articles: typeof data.articles = $state(data.articles);
	const meta = $state(data.meta);
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
</script>

<main>
	{#await articles then}
		{#if articles.length === 0}
			<section class="pt-64 pb-48">
				<div class="text-5xl text-center text-text-light font-serif">No Content Yet</div>
			</section>
		{:else}
			<section class="articles__section pt-64 pb-48">
				<div class="container">
					<h2 class="text-8xl text-center mb-24">Latest articles</h2>
					<div class="w-10/12 mx-auto">
						<Article.Card size="lg">
							<Article.Image img={articles[0].cover} />
							<Article.Content>
								<Article.Head>
									<Article.Tag>{articles[0]?.article_tag.title}</Article.Tag>
									<Article.Title>{articles[0].title}</Article.Title>
									<div class="font-medium text-text-light uppercase">
										{articles[0].date}
									</div>
								</Article.Head>
								<Article.Body>
									<p class="leading-6">
										{articles[0].description}
									</p>
								</Article.Body>
								<Article.Link href={`/blogs/` + articles[0].slug}>Read Full Article</Article.Link>
							</Article.Content>
						</Article.Card>
					</div>
					{#if articles.length > 1}
						<div class="grid grid-cols-2 mt-16 justify-center items-stretch gap-16">
							{#each articles as article, index}
								{#if index !== 0}
									<Article.Card>
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
												<p class="leading-6">
													{article.description}
												</p>
											</Article.Body>
											<Article.Link href={"/blogs/" + article.slug}>Read Full Article</Article.Link>
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
