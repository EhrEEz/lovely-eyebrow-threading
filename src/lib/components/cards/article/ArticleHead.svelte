<script lang="ts" module>
	import { cn } from "$lib/utils/utils";
	import type { HTMLAttributes, SvelteHTMLElements, AriaAttributes } from "svelte/elements";

	export type ArticleHead = {
		ref?: SvelteHTMLElements["div"] | null;
	} & AriaAttributes &
		HTMLAttributes<HTMLDivElement>;
</script>

<script>
	const { children, class: className, ...restProps }: ArticleHead = $props();
</script>

<div class={cn("md:mb-3", className)} {...restProps}>
	{@render children?.()}
</div>
