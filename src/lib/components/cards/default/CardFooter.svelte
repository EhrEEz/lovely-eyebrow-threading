<script lang="ts" module>
    import { cn } from "$lib/utils/utils";
    import type {
        HTMLAttributes,
        SvelteHTMLElements,
        AriaAttributes,
    } from "svelte/elements";

    export type CardFooterProps = {
        ref?: SvelteHTMLElements["div"] | null;
    } & AriaAttributes &
        HTMLAttributes<HTMLDivElement>;
</script>

<script>
    const {
        children,
        class: className,
        ...restProps
    }: CardFooterProps = $props();
</script>

<div class={cn(className)} {...restProps}>
    {@render children?.()}
</div>
