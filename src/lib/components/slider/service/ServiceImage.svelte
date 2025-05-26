<script lang="ts">
	import { Spring } from "svelte/motion";
	const { image, text, ind } = $props();
	let anim_init = {
		opacity: 0,
		offset_1: 65,
		offset_2: 5,
	};

	let anim = new Spring(anim_init, { stiffness: 0.01, damping: 0.25 });
	export function animateText() {
		anim.target = {
			opacity: 1,
			offset_1: 70,
			offset_2: 10,
		};
	}
	export function reset() {
		anim.target = anim_init;
	}
</script>

<svg width="600" viewBox="0 0 905 858" fill="none" xmlns="http://www.w3.org/2000/svg">
	<style>
		.text {
			font-size: 5rem;
			font-family: "Perandory", serif;
		}
	</style>
	<defs>
		<pattern id="image{ind}" patternUnits="userSpaceOnUse" width="100%" height="100%">
			<image href={image} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMinYMin slice" />
		</pattern>
	</defs>

	<path
		d="M460.44 161.785C544.091 136.002 626.22 136.548 687.049 169.426C747.844 202.285 775.918 261.254 772.138 330.1C768.356 398.966 732.694 477.716 665.979 549.997C599.268 622.275 514.173 674.361 430.533 700.141C346.883 725.924 264.754 725.378 203.925 692.5C143.13 659.641 115.056 600.672 118.836 531.826C122.617 462.96 158.28 384.209 224.994 311.928C291.706 239.649 376.8 187.565 460.44 161.785Z"
		stroke="none"
		fill="url(#image{ind})"
	/>
	<path
		d="M462.805 118.712C559.753 88.8031 654.949 89.4325 725.465 127.58C795.947 165.709 828.492 234.137 824.11 314.016C819.727 393.915 778.39 485.272 701.071 569.119C623.755 652.963 525.133 713.382 428.195 743.288C331.247 773.197 236.05 772.568 165.534 734.42C95.0527 696.29 62.5078 627.863 66.8896 547.984C71.2728 468.085 112.61 376.728 189.929 292.881C267.245 209.037 365.867 148.618 462.805 118.712Z"
		stroke="none"
		id="OuterCircle"
	/>

	<text>
		<textPath
			href="#OuterCircle"
			text-anchor="start"
			startOffset="{anim.current.offset_1}%"
			opacity={anim.current.opacity}
			class="text text_1"
			fill="black">{text}</textPath
		>
	</text>
	<text>
		<textPath
			href="#OuterCircle"
			text-anchor="start"
			opacity={anim.current.opacity}
			startOffset="{anim.current.offset_2}%"
			class="text text_2"
			fill="black">{text}</textPath
		>
	</text>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}
</style>
