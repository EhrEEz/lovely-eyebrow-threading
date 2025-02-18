<script lang="ts" module>
    import { cn } from "$lib/utils/utils";
    import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements";
    import type { AriaAttributes } from "svelte/elements";

    export type CardBodyProps = {
        ref?: SvelteHTMLElements["div"] | null;
    } & AriaAttributes &
        HTMLAttributes<HTMLDivElement>;
</script>

<script>
    const {
        children,
        class: className,
        ...restProps
    }: CardBodyProps = $props();
</script>

<div class={cn(className)} {...restProps}>
    {@render children?.()}
</div>
