<script lang="ts" module>
    import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements";
    import { tv, type VariantProps } from "tailwind-variants";

    export const CardVariants = tv({
        base: "flex flex-col rounded-md",
        variants: {
            variant: {
                default: "bg-gray-100",
            },
            size: {
                default: "gap-2 px-8 pt-12 pb-10",
                lg: "group lg-card gap-6",
            },
        },
    });

    export type CardSize = VariantProps<typeof CardVariants>["size"];
    export type CardVariant = VariantProps<typeof CardVariants>["variant"];
    export type CardProps = {
        size?: CardSize;
        variant?: CardVariant;
        ref?: SvelteHTMLElements["div"] | null;
    } & HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
    import { cn } from "$lib/utils/utils";
    const {
        children,
        size = "default",
        variant = "default",
        class: className,
        ...restProps
    }: CardProps = $props();
</script>

<div class={cn(CardVariants({ size, variant }), className)} {...restProps}>
    {@render children?.()}
</div>
