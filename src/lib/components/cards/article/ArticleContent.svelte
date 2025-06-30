<script lang="ts" module>
	import { cn } from "$lib/utils/utils";
	import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements";
	import type { AriaAttributes } from "svelte/elements";

	export type ArticleContent = {
		ref?: SvelteHTMLElements["div"] | null;
	} & AriaAttributes &
		HTMLAttributes<HTMLDivElement>;
</script>

<script>
	const { children, class: className, ...restProps }: ArticleContent = $props();
</script>

<div
	class={cn(
		"flex flex-col justify-center w-3/5 pe-8 pt-4 pb-8 group-[.lg-card]:w-1/2 xl:group-[.lg-card]:pe-8 xl:group-[.lg-card]:py-0 group-[.sm-card]:pe-4 group-[.sm-card]:py-4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
