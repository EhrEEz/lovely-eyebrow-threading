<script lang="ts" module>
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
		SvelteHTMLElements,
	} from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 uppercase",
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary-90 hover:text-white duration-300 transition shadow",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90shadow-sm",
				outline:
					"border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary-foreground underline-offset-4 !rounded-none border-b-2 border-primary-foreground !px-0",
			},
			size: {
				default: "h-9 px-4 py-3 rounded-xl adjust-padding",
				sm: "h-8 rounded-xl px-3 text-xs negative-padding",
				lg: "h-10 rounded-xl px-8 negative-padding",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});
	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		ref?:
			| SvelteHTMLElements["button"]
			| null
			| SvelteHTMLElements["anchor"];
	} & HTMLAnchorAttributes &
		HTMLButtonAttributes;
</script>

<script lang="ts">
	import { cn } from "$lib/utils/utils.js";

	let {
		children,
		variant = "default",
		size = "default",
		class: className,
		ref = $bindable(null),
		href = undefined,
		type = "button",
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		{href}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
