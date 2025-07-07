<script lang="ts" module>
	import { cn } from "$lib/utils/utils";
	import { PUBLIC_MEDIA_URL } from "$env/static/public";
	import type { HTMLImgAttributes, SvelteHTMLElements } from "svelte/elements";
	import type { AriaAttributes } from "svelte/elements";

	export type ArticleImageSRC = HTMLImgAttributes["src"];
	export type ArticleImageALT = HTMLImgAttributes["alt"];

	export type ArticleImage = {
		ref?: SvelteHTMLElements["img"] | null;
		img: any;
	} & AriaAttributes &
		HTMLImgAttributes;
</script>

<script>
	const { children, class: className = "", img, ...restProps }: ArticleImage = $props();
</script>

<div
	class={cn(
		"bg-black image_wrapper shrink-0 w-full md:w-2/5 md:group-[.lg-card]:w-1/2 rounded-md overflow-hidden aspect-square",
		className
	)}
>
	<img
		loading="lazy"
		src={PUBLIC_MEDIA_URL + img.media.formats.thumbnail.url}
		title={img.media.name}
		srcset="
			{img.media.formats.thumbnail ? `${PUBLIC_MEDIA_URL + img.media.formats.thumbnail.url} 234w,` : ''}
			{img.media.formats.small ? `${PUBLIC_MEDIA_URL + img.media.formats.small.url} 500w,` : ''}"
		class="w-full h-full object-cover group-hover:opacity-80 transition"
		{...restProps}
		alt="Cover of {img.alt ?? img.media.alternativeText}"
	/>
	{@render children?.()}
</div>
