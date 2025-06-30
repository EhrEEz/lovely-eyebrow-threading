<script lang="ts">
	import type { ButtonProps } from "$lib/components/buttons/Button.svelte";
	import Button from "$lib/components/buttons/Button.svelte";
	const { children, ...restProps }: ButtonProps = $props();
</script>

<Button
	{...restProps}
	size="lg"
	class="w-fit group-hover:bg-primary-90 group-hover:text-white duration-300 transition"
	variant="default"
>
	{@render children?.()}
</Button>
