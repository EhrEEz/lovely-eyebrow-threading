<script lang="ts">
	import { Spring } from "svelte/motion";

	type CompareProps = {
		config: {
			after: BA;
			before: BA;
		};
		tags: Array<{
			documentID?: string;
			id?: number;
			name?: string;
			slug?: string;
		}>;
		media_url: string;
	};
	type FormatsType = {
		ext: string;
		url: string;
		hash: string;
		height: number;
		mime: string;
		name: string;
		path: string;
		size: number;
		sizeInBytes: number;
		width: number;
	};
	type MediaFormat = {
		url: string;
		alternativeText?: null | string;
		caption?: null | string;
		documentID: string;
		id: number;
		related?: Array<any>;
		formats: {
			thumbnail: FormatsType;
			small?: FormatsType;
			medium?: FormatsType;
			large?: FormatsType;
		};
	};

	type BA = {
		alt?: null | string;
		id: number;
		media: MediaFormat;
	};

	const { config, tags = [], media_url }: CompareProps = $props();
	const { before, after } = $derived(config);
	let width = $state(0);
	let height = $state(0);
	let paused = $state(false);

	const positionX = new Spring(0, {
		damping: 0.7,
	});

	// biome-ignore lint/style/useConst: <explanation>
	let divider = $state<HTMLElement | undefined>(undefined);
	let beforeOverlay: HTMLElement;

	const id = crypto.randomUUID();

	function initialize() {
		width = beforeOverlay.clientWidth;
		height = beforeOverlay.clientHeight;
		if (divider && width > 0 && height > 0) {
			positionX.target = Math.floor(width * 1);
		}
		divider?.classList.remove("opacity-0");
	}

	function handleMouseMove(event: MouseEvent) {
		if (divider && width > 0 && height > 0 && !paused) {
			positionX.target = event.offsetX;
		}
	}

	function handleDrag(event: TouchEvent) {
		event.preventDefault();
		if (divider && width > 0 && height > 0) {
			const offsetX = event.touches[0].clientX - divider.getBoundingClientRect().left;
			positionX.target = Math.min(Math.max(offsetX, 0), width);
		}
	}
	//
	function resetPositions() {
		if (divider && width > 0 && height > 0) {
			positionX.target = Math.floor(width * 1);
		}
	}

	function pauseMovement() {
		paused = true;
	}
	function resumeMovement() {
		paused = false;
	}

	$effect(() => {
		window.addEventListener("resize", initialize);
		return () => {
			window.removeEventListener("resize", initialize);
		};
	});
</script>

<div
	class="relative overflow-hidden rounded-md"
	data-ref-id={id}
	onmousemove={handleMouseMove}
	onmouseleave={resetPositions}
	role="figure"
	aria-label="Before After Comparison"
	style="--position-x:{positionX.current}px;"
>
	<div class="before-wrapper bg-black" bind:this={beforeOverlay}>
		<img
			src={media_url + before.media.url}
			class="opacity-80 aspect-square object-cover w-full"
			srcset="
			{before.media.formats.thumbnail ? `${media_url + before.media.formats.thumbnail.url} 234w,` : ''}
			{before.media.formats.small ? `${media_url + before.media.formats.small.url} 500w,` : ''}
			{before.media.formats.medium ? `${media_url + before.media.formats.medium.url} 750w,` : ''}
			{before.media.formats.large ? `${media_url + before.media.formats.large.url} 1000w,` : ''}"
			alt={before.alt ?? before.media.alternativeText ?? `Transformation Image before`}
		/>
	</div>
	<div
		class="after-wrapper absolute left-0 top-0 overflow-hidden z-20"
		style="width:var(--position-x);height:{height}px"
	>
		<div class="label__button absolute left-4 top-4 pointer-events-none z-30">
			<span class="btn__text">After</span>
		</div>
		<img
			loading="lazy"
			style="width: {width}px;height:{height}px;max-width:{width}px"
			src={media_url + after.media.url}
			srcset="
			{after.media.formats.thumbnail ? `${media_url + after.media.formats.thumbnail.url} 234w,` : ''}
			{after.media.formats.small ? `${media_url + after.media.formats.small.url} 500w,` : ''}
			{after.media.formats.medium ? `${media_url + after.media.formats.medium.url} 750w,` : ''}
			{after.media.formats.large ? `${media_url + after.media.formats.large.url} 1000w,` : ''}"
			alt={after.alt ?? after.media.alternativeText ?? `Transformation Image After`}
			onload={initialize}
		/>
	</div>
	<div
		class="indicator w-[2px] h-full absolute top-0 -translate-x-1/2 bg-white opacity-0 pointer-events-none z-40 after:content-[''] after:absolute after:top-0 after:left-0 after:w-[2em] after:h-full after:dragging:cursor-grabbing pointer-events-none *::dragging:cursor-grabbing"
		style="box-shadow:0 0 2em 1em var(--primary-color-20); left: var(--position-x);"
		bind:this={divider}
		ontouchmove={handleDrag}
		role="slider"
		aria-valuenow={Math.floor((positionX.current / width) * 100)}
		aria-label="Drag to compare images"
		tabindex="0"
	></div>
	<div class="label__button absolute right-4 top-4 pointer-events-none z-10">
		<span class="btn__text">Before</span>
	</div>

	{#if tags.length > 0}
		<div
			class="tags__wrapper absolute bottom-4 inset-x-0 gap-2 flex items-center px-3 z-50"
			onmouseover={pauseMovement}
			onfocus={pauseMovement}
			onmouseout={resumeMovement}
			onblur={resumeMovement}
			role="list"
		>
			{#each tags as tag}
				<a
					href={"/services/" + tag.slug}
					class="tag text-sm px-3 py-1 rounded-full bg-[#00000020] backdrop-blur-sm text-white backdrop-brightness-90"
				>
					{tag.name}
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.label__button {
		padding: 0.25em 1em;
		border-radius: 0.7em;
		background-color: hsl(0 0% 0% / 10%);
		backdrop-filter: blur(1rem);
	}

	.label__button .btn__text {
		margin-block-end: -4px;
		color: white;
		font-weight: 400;
		font-size: 0.9rem;
	}
</style>
