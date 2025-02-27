<script lang="ts">
    import { setGeneratorContext } from "./index.svelte.js";

    let canvas: HTMLCanvasElement;

    let width = $state(0);
    let height = $state(0);
    let Generator: ReturnType<typeof setGeneratorContext>;

    $effect(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        Generator = setGeneratorContext(canvas, {
            width: width,
            height: height,
        });

        $inspect(Generator);
    });
</script>

<canvas {width} {height} bind:this={canvas}></canvas>
