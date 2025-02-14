<script lang="ts" module>
    import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements";
    import { tv, type VariantProps } from "tailwind-variants";

    export const articleCardVariants = tv({
        base: "flex items-stretch w-1/2 gap-12 hover:border-primary border rounded-md border-transparent transition-['border'] duration-500",
        variants: {
            size: {
                lg: "w-10/12 group lg-card gap-20",
            },
        },
    });

    export type ArticleCardSize = VariantProps<
        typeof articleCardVariants
    >["size"];
    export type ArticleProps = {
        size?: ArticleCardSize;
        ref?: SvelteHTMLElements["article"] | null;
    } & HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
    import { cn } from "$lib/utils/utils";
    const {
        children,
        size,
        class: className,
        ...restProps
    }: ArticleProps = $props();
</script>

<div class={cn(articleCardVariants({ size }), className)} {...restProps}>
    {@render children?.()}
</div>
