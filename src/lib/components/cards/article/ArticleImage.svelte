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

<div class="image_wrapper shrink-0 w-2/5 group-[.lg-card]:w-1/2 rounded-md overflow-hidden aspect-square">
	<img
		loading="lazy"
		src={PUBLIC_MEDIA_URL + img.media.formats.thumbnail.url}
		title={img.media.name}
		srcset="
			{img.media.formats.thumbnail ? `${PUBLIC_MEDIA_URL + img.media.formats.thumbnail.url} 234w,` : ''}
			{img.media.formats.small ? `${PUBLIC_MEDIA_URL + img.media.formats.small.url} 500w,` : ''}
			{img.media.formats.medium ? `${PUBLIC_MEDIA_URL + img.media.formats.medium.url} 750w,` : ''}
			{img.media.formats.large ? `${PUBLIC_MEDIA_URL + img.media.formats.large.url} 1000w,` : ''}"
		class={cn("w-full h-full object-cover", className)}
		{...restProps}
		alt="Cover of {img.alt ?? img.media.alternativeText}"
	/>
	{@render children?.()}
</div>
