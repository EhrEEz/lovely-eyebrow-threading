<script>
	import Button from "../buttons/Button.svelte";
	// biome-ignore lint/style/useConst: bindable items present
	let { showModal = $bindable(), header, children, footer = null } = $props();

	// biome-ignore lint/style/useConst: Svelte Requires let to bind
	let dialog = $state(); // HTMLDialogElement
	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div class="dialog__window">
		<Button size="icon" variant="ghost" aria-label="Close Modal">
			<svg width="110" height="85" viewBox="0 0 110 85" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2 3L108 82M108 3L2 82" stroke="black" stroke-width="6" />
			</svg>
		</Button>

		{#if header}
			<div class="dialog__header">
				{@render header?.()}
			</div>
		{/if}
		{#if children}
			<div class="dialog__children">
				{@render children?.()}
			</div>
		{/if}
		<div class="dialog__footer">
			<div class="fl-row jc-end al-center">
				{@render footer?.()}
				<Button variant="secondary" onclick={() => dialog.close()}>
					<span class="btn__wrapper">
						<span class="btn__icon">
							<svg width="110" height="85" viewBox="0 0 110 85" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M2 3L108 82M108 3L2 82" stroke="black" stroke-width="6" />
							</svg>
						</span>
						<span class="btn__text"> Close </span>
					</span>
				</Button>
			</div>
		</div>
		<!-- svelte-ignore a11y_autofocus -->
	</div>
</dialog>

<style>
	dialog {
		min-width: min(90%, 25rem);
		max-width: 40rem;
		border-radius: 0.2em;
		border: none;
		position: absolute;
		inset-inline-start: 50%;
		inset-block-start: 50%;
		translate: -50% -50%;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > .dialog__window {
		padding: 1em 2em 1em 2em;
		@media screen and (min-width: 992px) {
			padding: 3em 3em 2em;
		}
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.dialog__header,
	.dialog__children,
	.dialog__footer {
		margin-block: 0.5em;
	}

	.dialog__children {
		margin-block: 0.5em 2em;
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.btn__close {
		position: absolute;
		display: block;
		inset-inline-end: 1em;
		inset-block-start: 1em;
		color: var(--clr-neutral-500);

		&:hover {
			color: var(--clr-dark-500);
		}
	}
</style>
