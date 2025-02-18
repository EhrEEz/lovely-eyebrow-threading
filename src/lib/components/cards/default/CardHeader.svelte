<script lang="ts" module>
    import { cn } from "$lib/utils/utils";
    import type {
        HTMLAttributes,
        SvelteHTMLElements,
        AriaAttributes,
    } from "svelte/elements";

    export type CardHeaderProps = {
        ref?: SvelteHTMLElements["div"] | null;
    } & AriaAttributes &
        HTMLAttributes<HTMLDivElement>;
</script>

<script>
    const {
        children,
        class: className,
        ...restProps
    }: CardHeaderProps = $props();
</script>

<div class={cn(className)} {...restProps}>
    {@render children?.()}
</div>
