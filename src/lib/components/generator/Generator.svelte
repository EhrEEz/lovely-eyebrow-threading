<script lang="ts">
	import { tick } from "svelte";
	import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
	import { Turnstile } from "svelte-turnstile";
	import Modal from "$lib/components/modal/Modal.svelte";
	import saveAs from "file-saver";
	import moment from "moment";
	import Button from "$lib/components/buttons/Button.svelte";
	import "$lib/scss/components/_input.scss";
	import { custom } from "zod";
	type SizeType = {
		name: string;
		aspect_ratio: string;
		width: number;
		height: number;
		pointer: string;
	};
	type ErrorType = {
		announcement_text?: string;
		announcement_media?: string;
		announcement_template?: string;
	};
	const tabs: SizeType[] = [
		{
			name: "Portrait",
			aspect_ratio: "1080x1350 (3:4)",
			width: 1080,
			height: 1350,
			pointer: "background_portrait",
		},
		{
			name: "Square",
			aspect_ratio: "1080x1080 (1:1)",
			width: 1080,
			height: 1080,
			pointer: "background_square",
		},
		{
			name: "Landscape",
			aspect_ratio: "1200x630 (1.91:1)",
			width: 1200,
			height: 630,
			pointer: "background_landscape",
		},
		{
			name: "Story / Reels",
			aspect_ratio: "1080x1920 (9:16)",
			width: 1080,
			height: 1920,
			pointer: "story_portrait",
		},
	];
	let errors: ErrorType = $state({});
	const textMaxLength = 200;
	const { templates, media_url } = $props();
	const lineHeight = $state(1.25);
	let size = $state(tabs[0]);
	let currentTemplate = $state(templates[0]);
	let paddingX = $state(100);
	let paddingY = $state(200);
	let preview_width = $state<number>(0);
	let preview_height = $state<number>(0);
	let token = $state("");
	let custom_text = $state<string>("");
	let textErrorMessage = $state<string>("");
	let canvas = $state<HTMLCanvasElement>()!;
	let showSuccessModal = $state(false);
	let showErrorModal = $state(false);
	let token_error = $state(false);
	let token_error_details = $state("");
	let formLoading = $state(false);

	const RENDER_SIZE = $derived({
		width: size.width,
		height: size.height,
	});
	const currentTemplateID = $derived(currentTemplate.documentId);
	const ASPECT_RATIO = $derived(RENDER_SIZE.width / RENDER_SIZE.height);
	const currentActiveSizePointer = $derived<SizeType["pointer"]>(size.pointer);
	const currentActiveSize = $derived<SizeType | undefined>(
		tabs.find((tab) => tab.pointer === currentActiveSizePointer)
	);
	const currentActiveBackground = $derived(media_url + currentTemplate[`${currentActiveSizePointer}`].url);
	const currentActiveIndex = $derived(tabs.findIndex((tab) => tab === currentActiveSize));
	const maxWidth = $state(1000);

	let fontSize = $derived.by(() => {
		const maxActiveSide = Math.max(preview_width, preview_height);
		const minActiveSide = Math.min(preview_height, preview_width);
		const minSize = minActiveSide / 18;
		const maxSize = maxActiveSide / 12;
		const effectiveHeight = preview_height - paddingY;
		const effectiveWidth = preview_width - paddingX;
		if (effectiveWidth > 0 && effectiveHeight > 0) {
			let tL = custom_text.length;
			const tA = effectiveWidth * effectiveHeight;
			let fontSize = Math.sqrt(tA / Math.log2(tL)) / Math.log2(tL) / ASPECT_RATIO;
			fontSize = Math.min(maxSize, fontSize);
			fontSize = Math.max(minSize, fontSize);
			return fontSize;
		}
		return minSize + (maxSize - minSize) / maxSize;
	});

	const disabledActions = $derived<boolean>(
		custom_text.length <= 0 || textErrorMessage.length > 0 || token.length <= 0
	);

	function handleTextChange(e: Event) {
		if (!custom_text) {
			textErrorMessage = "Text cannot be empty";
		} else {
			textErrorMessage = "";
		}

		if (custom_text.length > textMaxLength) {
			e.stopPropagation();
		}
	}
	function extractFirstTwoWordsKebab(input: string) {
		const words = input.match(/[A-Za-z]+/g);
		if (!words || words.length === 0) return null;
		const selected = words.slice(0, 2).map((w) => w.toLowerCase());
		return selected.join("-");
	}

	function getFileName(mimeType: string, text: string): string {
		let filename = "";
		const now = moment();
		const firstTwoWords = extractFirstTwoWordsKebab(text);
		filename += now.format("YYMMDDhhmmss");
		if (currentActiveSize) {
			filename += `${currentActiveSize.width}x${currentActiveSize.height}`;
		}
		filename += "-" + firstTwoWords + "-";
		if (mimeType == "image/apng") {
			filename += ".apng";
		}
		if (mimeType == "image/avif") {
			filename += ".avif";
		}
		if (mimeType == "image/gif") {
			filename += ".gif";
		}
		if (mimeType == "image/jpeg") {
			filename += ".jpeg";
		}
		if (mimeType == "image/png") {
			filename += ".png";
		}
		if (mimeType == "image/svg+xml") {
			filename += ".svg";
		}
		if (mimeType == "image/webp") {
			filename += ".webp";
		}
		return filename;
	}

	function drawImage(ctx: CanvasRenderingContext2D) {
		let background = new Image();
		background.crossOrigin = "anonymous";
		background.width = preview_width;
		background.id = currentActiveSize?.pointer ?? "asdf";

		background.onload = function () {
			ctx?.drawImage(background, 0, 0, preview_width, preview_height);
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
		const translateY = totalHeight;
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
		ctx.fillStyle = currentTemplate.text_color ?? `#000000`;

		printAtWordWrap(
			ctx,
			custom_text,
			preview_width / 2,
			Math.max(preview_height / 2 + (fontSize * lineHeight) / 2, paddingY),
			fontSize * lineHeight,
			Math.min(preview_width - paddingX, maxWidth)
		);
	}

	async function getImage({
		canvas,
		width,
		height,
		mime = "image/png",
		quality = 0.8,
	}: {
		canvas: HTMLCanvasElement;
		width: number;
		height: number;
		mime?: string;
		quality?: number;
	}): Promise<Blob> {
		return new Promise((resolve) => {
			const tmpCanvas = document.createElement("canvas");
			tmpCanvas.width = width;
			tmpCanvas.height = height;

			const ctx = tmpCanvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);
			}
			tmpCanvas.toBlob(
				(blob) => {
					if (blob) {
						resolve(blob as Blob);
					}
				},
				mime,
				quality
			);
		});
	}
	function waitForImageLoad(canvas: HTMLCanvasElement, imageUrl: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(new Error("Could not get canvas context"));
				return;
			}

			const background = new Image();
			background.crossOrigin = "anonymous";
			background.width = preview_width;

			background.onload = function () {
				// Draw the background image
				ctx.drawImage(background, 0, 0, preview_width, preview_height);
				// Draw the text on top
				ctx.font = `${fontSize}px Perandory`;
				ctx.textAlign = "center";
				ctx.fillStyle = currentTemplate.text_color ?? "#000000";

				printAtWordWrap(
					ctx,
					custom_text,
					preview_width / 2,
					Math.max(preview_height / 2 + (fontSize * lineHeight) / 2, paddingY),
					fontSize * lineHeight,
					Math.min(preview_width - paddingX, maxWidth)
				);

				resolve();
			};

			background.onerror = function () {
				reject(new Error("Failed to load background image"));
			};

			background.src = imageUrl + "#" + new Date().getTime();
		});
	}

	async function download() {
		const currentCanvas = canvas;
		if (currentActiveSize) {
			const blob = await getImage({
				canvas: currentCanvas,
				width: currentActiveSize.width,
				height: currentActiveSize.height,
			});
			if (blob) {
				const fileName = getFileName("image/webp", custom_text);
				saveAs(blob as Blob, fileName);
			}
		}
	}
	async function saveAnnouncement() {
		size = tabs[1];
		formLoading = true;

		try {
			await tick();

			if (token.length <= 0) {
				throw new Error("Token is empty");
			}

			if (custom_text.length <= 0) {
				textErrorMessage = "Text cannot be empty";
				formLoading = false;
				return;
			}

			const currentCanvas = canvas;
			const currentActiveBackground = media_url + currentTemplate[size.pointer].url;

			await waitForImageLoad(currentCanvas, currentActiveBackground);

			const blob: Blob = await getImage({
				canvas: currentCanvas,
				width: size.width,
				height: size.height,
				mime: "image/png",
			});

			const fileName = getFileName("image/png", custom_text);
			const payload = {
				announcement_text: custom_text,
				announcement_template: currentTemplateID,
				token: token,
			};

			const formData = new FormData();
			formData.append("files.announcement_media", blob, fileName);
			formData.append("data", JSON.stringify(payload));

			const res = await fetch("/ep/saveAnnouncement", {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				const errorText = await res.text();
				throw new Error(`Upload failed: ${errorText}`);
			}

			const json = await res.json();

			if (json.token_error) {
				token_error = true;
				token_error_details = json.error;
				showErrorModal = true;
			} else if (json.error) {
				showErrorModal = true;
			} else if (json.data) {
				showSuccessModal = true;
				custom_text = "";
			}
		} catch (error: any) {
			console.error("Error saving announcement:", error);
			showErrorModal = true;
			token_error_details = error.message || "An error occurred while saving";
		} finally {
			formLoading = false;
		}
	}

	$effect(() => {
		// currentTemplate = templates[0];
		// size = tabs[0];
		const currentCanvas = canvas;
		const ctx = currentCanvas.getContext("2d");
		const previewBlock = document.querySelector("#canvasPreviewWrapper");
		const renderedWidth = previewBlock?.getBoundingClientRect().width;
		const cfResponse = document.querySelector<HTMLInputElement>("[name='cf-turnstile-response']");
		if (cfResponse) {
			const cfResponseAttr = cfResponse.value;
			if (cfResponseAttr) {
				token = cfResponseAttr;
			}
		}

		if (renderedWidth) {
			let testWidth = Math.max(RENDER_SIZE.width, RENDER_SIZE.height);
			preview_width = Math.min(testWidth, renderedWidth);
			preview_height = preview_width / ASPECT_RATIO;
			paddingX = preview_width / 12;
			paddingY = ASPECT_RATIO > 1.1 ? preview_height / (3.25 / ASPECT_RATIO) : (paddingY = preview_height / 2.25);
		}
		if (ctx) {
			const background = drawImage(ctx);
			background.src = currentActiveBackground + "#" + new Date().getTime();
			drawText(ctx);
		}
	});
</script>

<div class="grid grid-cols-3 mb-8">
	<h3 class="text-3xl">Customize</h3>
	<div class="flex justify-center items-end gap-8 rounded-xl bg-stone-100 w-fit mx-auto px-8 justify-self-center">
		{#each tabs as tab}
			<button
				class="tab__button uppercase pb-2 pt-4 border-b-2 border-b-transparent transition duration-200 {size.pointer ===
				tab.pointer
					? 'tab--active'
					: ''}"
				onclick={() => {
					size = tab;
				}}
			>
				{tab.name}
			</button>
		{/each}
	</div>
	<div class="flex justify-end items-center gap-2 justify-self-end">
		<!-- <Button variant="secondary">Download All Sizes</Button> -->
		<Button variant="secondary" class="gap-2" onclick={download} disabled={disabledActions || formLoading}>
			<span class="btn__icon">
				<svg
					id="fi_7268609"
					enable-background="new 0 0 515.283 515.283"
					height="12"
					viewBox="0 0 515.283 515.283"
					xmlns="http://www.w3.org/2000/svg"
					><g
						><g
							><g
								><g
									><path
										d="m400.775 515.283h-286.268c-30.584 0-59.339-11.911-80.968-33.54-21.628-21.626-33.539-50.382-33.539-80.968v-28.628c0-15.811 12.816-28.628 28.627-28.628s28.627 12.817 28.627 28.628v28.628c0 15.293 5.956 29.67 16.768 40.483 10.815 10.814 25.192 16.771 40.485 16.771h286.268c15.292 0 29.669-5.957 40.483-16.771 10.814-10.815 16.771-25.192 16.771-40.483v-28.628c0-15.811 12.816-28.628 28.626-28.628s28.628 12.817 28.628 28.628v28.628c0 30.584-11.911 59.338-33.54 80.968-21.629 21.629-50.384 33.54-80.968 33.54zm-143.134-114.509c-3.96 0-7.73-.804-11.16-2.257-3.2-1.352-6.207-3.316-8.838-5.885-.001-.001-.001-.002-.002-.002-.019-.018-.038-.037-.057-.056-.005-.004-.011-.011-.016-.016-.016-.014-.03-.029-.045-.044-.01-.01-.019-.018-.029-.029-.01-.01-.023-.023-.032-.031-.02-.02-.042-.042-.062-.062l-114.508-114.509c-11.179-11.179-11.179-29.305 0-40.485 11.179-11.179 29.306-11.18 40.485 0l65.638 65.638v-274.409c-.001-15.811 12.815-28.627 28.626-28.627s28.628 12.816 28.628 28.627v274.408l65.637-65.637c11.178-11.179 29.307-11.179 40.485 0 11.179 11.179 11.179 29.306 0 40.485l-114.508 114.507c-.02.02-.042.042-.062.062-.011.01-.023.023-.032.031-.01.011-.019.019-.029.029-.014.016-.03.03-.044.044-.005.005-.012.012-.017.016-.018.019-.037.038-.056.056-.001 0-.001.001-.002.002-.315.307-.634.605-.96.895-2.397 2.138-5.067 3.805-7.89 4.995-.01.004-.018.008-.028.012-.011.004-.02.01-.031.013-3.412 1.437-7.158 2.229-11.091 2.229z"
										fill="rgb(0,0,0)"
									></path></g
								></g
							></g
						></g
					>
				</svg>
			</span>
			<span class="btn__text"> Download </span>
		</Button>
		<Button onclick={saveAnnouncement} disabled={disabledActions || formLoading}>Save</Button>
	</div>
</div>
<div class="grid grid-cols-12 gap-24 items-start content-center">
	<div class="template__list grid grid-cols-2 gap-6 col-span-3" aria-labelledby="templateLabel">
		<div class="col-span-2">
			<div class="form-group text-area--7 xl:my-6" class:error={textErrorMessage}>
				<label for="custom_text">
					<textarea
						placeholder="custom_text"
						class="form-control"
						bind:value={custom_text}
						rows={10}
						maxlength={200}
						data-input-value={custom_text}
						onkeyup={handleTextChange}
					></textarea>
					<div class="form-label required mb-2">Type your text here</div>
					<div class="error-message">{textErrorMessage}</div>
				</label>
			</div>
		</div>
		<div class="col-span-2">
			<div class="text-xl san-serif uppercase">Choose Template</div>
		</div>
		{#each templates as template (template.id)}
			<button
				aria-label={template.name}
				class="rounded-sm bg-stone-50 flex flex-col p-2 gap-2 items-start border {template.documentID ===
				currentTemplate.documentID
					? '!border-primary !bg-white'
					: '!border-transparent'}"
				data-index={template.id}
				onclick={(e) => {
					e.preventDefault();
					currentTemplate = template;
				}}
			>
				<img
					loading="lazy"
					src={media_url + template.background_square.url}
					title={template.name}
					srcset="
			{template.background_square.thumbnail ? `${media_url + template.background_square.thumbnail.url} 234w,` : ''}
			{template.background_square.small ? `${media_url + template.background_square.small.url} 500w,` : ''}"
					class="aspect-square object-cover w-full rounded-sm"
					alt="{template.name} Template"
				/>
				<div class="name uppercase px-2 line-clamp-1">{template.name}</div>
			</button>
		{/each}
	</div>
	<div class="col-span-9 flex justify-center items-start p-8 bg-stone-100 rounded-md relative">
		<div class="preview w-full h-[60dvh]" id="canvasPreviewWrapper">
			<div class="flex w-full h-full justify-center mb-2">
				<canvas
					width={preview_width}
					bind:this={canvas}
					height={preview_height}
					class="preview_canvas rounded-sm bg-white"
					style="max-height:{preview_height}px;"
				>
					Your browser does not support the canvas element.
				</canvas>
			</div>

			<div class="absolute top-full left-0">
				<Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} theme="light" />
			</div>
		</div>
	</div>
</div>
<Modal bind:showModal={showSuccessModal}>
	{#snippet header()}
		<h5 class="heading-4 pe-lg-4 font-sans text-2xl">Announcement Saved Successfully</h5>
	{/snippet}
	{#snippet children()}
		<div class="text-xl text-text-light">
			<p>It is now accessible from the Announcements Page. If this was a mistake, use admin to delete the post.</p>
		</div>
	{/snippet}
</Modal>
<Modal bind:showModal={showErrorModal}>
	{#snippet header()}
		<h5 class="heading-5 pe-16 error-300 font-sans text-2xl">Error Sending Message</h5>
	{/snippet}
	{#if Object.values(errors).length > 0}
		{#snippet children()}
			<div class="text-lg mb-4">
				<p>Please Try again</p>
			</div>
			<div class="regular-16 error-300 bg-error-100 py-2 px-3 mt-lg-1 rounded-1">
				<p>Error details:</p>
				{#each Object.values(errors) as error}
					<p>{error}</p>
				{/each}
			</div>
		{/snippet}
	{/if}

	{#if token_error}
		{#snippet children()}
			<div class="regular-20 mb-4">
				<p>Please Try again</p>
			</div>
			<div class="regular-16 error-300 bg-error-100 py-2 px-3 mt-lg-1 rounded-1">
				<p>Error detail: {token_error_details ? token_error_details : "Token Error"}</p>
			</div>
		{/snippet}
	{/if}
</Modal>

<style>
	.preview_canvas {
		max-width: 100%;
		max-height: 100%;
	}

	.tab--active {
		border-color: var(--primary-color);
		will-change: border-color;
		transition: border-color 0.2s ease-out;
	}
</style>
