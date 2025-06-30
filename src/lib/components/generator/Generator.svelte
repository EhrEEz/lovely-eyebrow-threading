<script lang="ts">
	type SizeType = {
		name: string;
		aspect_ratio: string;
		width: number;
		height: number;
		pointer: string;
	};
	const { template, text, size, sizes, media_url } = $props();

	let canvases = $state<HTMLCanvasElement[]>([]);
	const tabs: SizeType[] = sizes;
	const RENDER_SIZE = $derived({
		width: size.width,
		height: size.height,
	});
	const lineHeight = $state(1.15);
	const ASPECT_RATIO = $derived(RENDER_SIZE.width / RENDER_SIZE.height);
	const currentActiveSize = $derived<SizeType["pointer"]>(size.pointer);
	const currentActive = $derived<SizeType | undefined>(tabs.find((tab) => tab.pointer === currentActiveSize));
	const currentActiveBackground = $derived(media_url + template[`${currentActiveSize}`].url);
	const currentActiveIndex = $derived(tabs.findIndex((tab) => tab === currentActive));
	let paddingX = $state(100);
	let paddingY = $state(200);
	let preview_width = $state<number>(0);
	let preview_height = $state<number>(0);
	let fontSize = $derived.by(() => {
		const minSize = 32;
		const maxSize = 200;
		const effectiveHeight = preview_height - paddingY;
		const effectiveWidth = preview_width - paddingX;
		if (effectiveWidth > 0 && effectiveHeight > 0) {
			let tL = text.length;
			const tA = effectiveWidth * effectiveHeight;
			let fontSize = Math.sqrt(tA / Math.log2(tL)) / Math.log2(tL) / ASPECT_RATIO;
			console.log(fontSize);
			fontSize = Math.min(maxSize, fontSize);
			fontSize = Math.max(minSize, fontSize);
			return fontSize;
		}
		return minSize + (maxSize - minSize) / maxSize;
	});

	function drawImage(ctx: CanvasRenderingContext2D) {
		let background = new Image();
		background.width = size.width;
		background.id = currentActive?.pointer ?? "asdf";

		background.onload = function () {
			ctx?.drawImage(background, 0, 0);
			drawText(ctx);
		};
		return background;
	}

	function printAtWordWrap(
		context: CanvasRenderingContext2D,
		text: string,
		x: number,
		y: number,
		lineHeight: number,
		fitWidth: number
	) {
		fitWidth = fitWidth || 0;

		if (fitWidth <= 0) {
			context.fillText(text, x, y);
			return;
		}
		let words = text.split(" ");
		let currentLine = 0;
		let idx = 1;
		const effectiveWidth = preview_width - paddingX;
		const totalLines = Math.ceil(context.measureText(text).width / effectiveWidth);
		const totalHeight = (totalLines * lineHeight) / 2;
		const translateY = totalHeight / 2;
		console.log(totalHeight, totalLines, translateY);
		while (words.length > 0 && idx <= words.length) {
			let str = words.slice(0, idx).join(" ");
			let w = context.measureText(str).width;
			if (w > fitWidth) {
				if (idx == 1) {
					idx = 2;
				}
				context.fillText(words.slice(0, idx - 1).join(" "), x, y - translateY + lineHeight * currentLine);
				currentLine++;
				words = words.splice(idx - 1);
				idx = 1;
			} else {
				idx++;
			}
		}
		if (idx > 0) context.fillText(words.join(" "), x, y - translateY + lineHeight * currentLine);
	}
	function drawText(ctx: CanvasRenderingContext2D) {
		ctx.font = `${fontSize}px Perandory`;
		ctx.textAlign = `center`;
		ctx.fillStyle = template.text_color ?? `#000000`;

		printAtWordWrap(ctx, text, preview_width / 2, preview_height / 2, fontSize * lineHeight, preview_width - paddingX);
	}
	$effect(() => {
		const currentCanvas = canvases[currentActiveIndex];
		const ctx = currentCanvas.getContext("2d");
		const previewBlock = document.querySelector("#canvasPreviewWrapper");
		const renderedWidth = previewBlock?.getBoundingClientRect().width;
		if (renderedWidth) {
			let testWidth = Math.max(RENDER_SIZE.width, RENDER_SIZE.height);
			preview_width = Math.min(testWidth, renderedWidth);
			preview_height = preview_width / ASPECT_RATIO;
			paddingX = preview_width / 12;
			paddingY = preview_height / (Math.pow(ASPECT_RATIO, 2) * 12);
		}
		if (ctx) {
			const background = drawImage(ctx);
			drawText(ctx);
			background.src = currentActiveBackground;
		}
	});
</script>

<div class="flex w-full h-full justify-center">
	{#each tabs as tab, ind}
		<canvas
			width={preview_width}
			bind:this={canvases[ind]}
			height={preview_height}
			class="preview_canvas rounded-sm bg-white"
			class:active={currentActive == tab}
			style="max-height:{preview_height}px;"
		>
			Your browser does not support the canvas element.
		</canvas>
	{/each}
</div>

<style>
	.preview_canvas {
		display: none;
		max-width: 100%;
		max-height: 100%;
	}

	.preview_canvas.active {
		display: block;
	}
</style>
