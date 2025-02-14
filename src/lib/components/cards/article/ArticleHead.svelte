<script lang="ts" module>
    import { cn } from "$lib/utils/utils";
    import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements";
    import type { AriaAttributes } from "svelte/elements";

    export type ArticleHead = {
        ref?: SvelteHTMLElements["div"] | null;
    } & AriaAttributes &
        HTMLAttributes<HTMLDivElement>;
</script>

<script>
    const { children, class: className, ...restProps }: ArticleHead = $props();
</script>

<div class={cn("mb-3", className)} {...restProps}>
    {@render children?.()}
</div>
