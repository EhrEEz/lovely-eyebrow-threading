<script lang="ts" module>
    import { cn } from "$lib/utils/utils";
    import type {
        HTMLImgAttributes,
        SvelteHTMLElements,
    } from "svelte/elements";
    import type { AriaAttributes } from "svelte/elements";

    export type ArticleImageSRC = HTMLImgAttributes["src"];
    export type ArticleImageALT = HTMLImgAttributes["alt"];

    export type ArticleImage = {
        ref?: SvelteHTMLElements["img"] | null;
        alt: ArticleImageSRC;
        src: ArticleImageALT;
    } & AriaAttributes &
        HTMLImgAttributes;
</script>

<script>
    const {
        children,
        class: className,
        alt,
        src,
        ...restProps
    }: ArticleImage = $props();
</script>

<div
    class="image_wrapper shrink-0 w-2/5 group-[.lg-card]:w-1/2 rounded-md overflow-hidden aspect-square"
>
    <img
        class={cn("w-full h-full object-cover", className)}
        {alt}
        {src}
        {...restProps}
    />
    {@render children?.()}
</div>
