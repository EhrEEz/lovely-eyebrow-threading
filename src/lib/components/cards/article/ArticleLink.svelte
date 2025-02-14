<script lang="ts">
    import type { ButtonProps } from "$lib/components/buttons/Button.svelte";
    import Button from "$lib/components/buttons/Button.svelte";
    const { children, href, ...restProps }: ButtonProps = $props();
</script>

<Button {href} size="lg" class="w-fit">
    {@render children?.()}
</Button>
