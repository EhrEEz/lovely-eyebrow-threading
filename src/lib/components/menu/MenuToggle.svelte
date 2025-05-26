<script lang="ts">
	import Button, { type ButtonProps } from "../buttons/Button.svelte";

	const { onClick, menuView, color } = $props();
	const toggled = $derived<boolean>(menuView);
</script>

<Button variant="ghost" size="icon" onclick={onClick}>
	<svg
		width="36"
		height="36"
		viewBox="0 0 63 17"
		fill="none"
		id="navigationButton"
		class:toggled
		xmlns="http://www.w3.org/2000/svg"
	>
		<line y1="1.5" x2="63" y2="1.5" stroke={color} stroke-width="2.5" id="line1" />
		<line y1="15.5" x2="63" y2="15.5" stroke={color} stroke-width="2.5" id="line2" />
	</svg>
</Button>

<style>
	#navigationButton.toggled #line1 {
		rotate: 12.5deg;
		transform-origin: left center;
		transition: 0.3s ease-in-out;
	}
	#navigationButton.toggled #line2 {
		transform-origin: left center;
		rotate: -12.5deg;
		transition: 0.3s ease-in-out;
	}
	#navigationButton #line1,
	#navigationButton #line2 {
		transition: 0.3s ease-in-out;
	}
</style>
