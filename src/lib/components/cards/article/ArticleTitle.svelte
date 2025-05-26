<script lang="ts" module>
	import { cn } from "$lib/utils/utils";
	import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements";
	import type { AriaAttributes } from "svelte/elements";

	export type ArticleTitle = {
		ref?: SvelteHTMLElements["h3"] | null;
	} & AriaAttributes &
		HTMLAttributes<HTMLHeadingElement>;
</script>

<script>
	const { children, class: className, ...restProps }: ArticleTitle = $props();
</script>

<h3
	class={cn(
		"text-3xl uppercase group-[.lg-card]:text-5xl group-[.sm-card]:text-xl leading-none article-card__title",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</h3>

<style>
	.article-card__title {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
