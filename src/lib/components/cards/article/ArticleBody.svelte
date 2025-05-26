<script lang="ts" module>
	import { cn } from "$lib/utils/utils";
	import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements";
	import type { AriaAttributes } from "svelte/elements";

	export type ArticleBody = {
		ref?: SvelteHTMLElements["div"] | null;
	} & AriaAttributes &
		HTMLAttributes<HTMLDivElement>;
</script>

<script>
	const { children, class: className, ...restProps }: ArticleBody = $props();
</script>

<div class={cn("mb-4 article-card__body", className)} {...restProps}>
	{@render children?.()}
</div>

<style>
	.article-card__body {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
