<script lang="ts">
	import { cn } from "$lib/utils/utils";

	const { children, class: className = "" } = $props();
</script>

<div
	class={cn(
		"px-3 py-2 text-sm uppercase leading-tight text-primary border border-primary rounded-full w-fit mb-3 select-none group-[.sm-card]:leading-[0.9]",
		className
	)}
>
	{@render children?.()}
</div>
