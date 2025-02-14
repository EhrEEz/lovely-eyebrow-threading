<script lang="ts" module>
    import { cn } from "$lib/utils/utils";
    import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements";
    import type { AriaAttributes } from "svelte/elements";

    export type ArticleTitle = {
        ref?: SvelteHTMLElements["h3"] | null;
    } & AriaAttributes &
        HTMLAttributes<HTMLHeadingElement>;
</script>

<script>
    const { children, class: className, ...restProps }: ArticleTitle = $props();
</script>

<h3
    class={cn("text-2xl uppercase group-[.lg-card]:text-5xl", className)}
    {...restProps}
>
    {@render children?.()}
</h3>
