<script lang="ts">
	import { cn } from "$lib/utils/utils";

	const { children, class: className = "" } = $props();
</script>

<div
	class={cn(
		"px-2 py-1 md:py-2 md:px-3 text-xs md:text-sm uppercase leading-tight text-primary border border-primary rounded-full w-fit mb-3 select-none group-[.sm-card]:leading-[0.75]",
		className
	)}
>
	{@render children?.()}
</div>
