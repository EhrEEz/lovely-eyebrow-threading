<script lang="ts">
    const { children } = $props();
</script>

<div
    class="px-3 py-2 text-sm uppercase leading-tight text-primary border border-primary rounded-full w-fit mb-3 select-none"
>
    {@render children?.()}
</div>
