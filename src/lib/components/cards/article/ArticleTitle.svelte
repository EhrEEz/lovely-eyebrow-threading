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
		"xl:text-3xl lg:text-2xl text-lg md:text-xl uppercase md:group-[.lg-card]:text-3xl lg:group-[.lg-card]:text-4xl xl:group-[.lg-card]:text-5xl leading-snug md:leading-tight xl:leading-none article-card__title group-[.lg-card]:leading-snug md:group-[.lg-card]:leading-tight group-[.lg-card]:text-lg",
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

		@media screen and (max-width: 768px) {
			-webkit-line-clamp: 3;
		}
	}
</style>
