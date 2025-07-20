<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
	import { tv, type VariantProps } from "tailwind-variants";

	export const articleCardVariants = tv({
		base: "flex flex-col md:flex-row items-stretch gap-4 lg:gap-8 hover:border-primary border rounded-md border-transparent transition-['border'] duration-500 group",
		variants: {
			size: {
				lg: "lg-card xl:gap-20 lg:gap-10 md:gap-8",
				sm: "sm-card md:gap-8 items-start",
			},
		},
	});

	export type ArticleCardSize = VariantProps<typeof articleCardVariants>["size"];
	export type ArticleProps = {
		size?: ArticleCardSize;
		href?: HTMLAnchorAttributes["href"];
		children?: () => any;
		class?: string;
	} & HTMLAttributes<HTMLElement>;
</script>

<script lang="ts">
	import { cn } from "$lib/utils/utils";
	const { children, size, class: className, href = "", ...restProps }: ArticleProps = $props();
</script>

{#if href}
	<a {href} class={cn(articleCardVariants({ size }), "flex", className)} {...restProps} data-sveltekit-reload>
		{@render children?.()}
	</a>
{:else}
	<article class={cn(articleCardVariants({ size }), className)} {...restProps}>
		{@render children?.()}
	</article>
{/if}
