<script lang="ts">
    import { Spring } from "svelte/motion";
    import Button from "../buttons/Button.svelte";

    type CompareProps = {
        dir: string;
        ext: "png" | "webp" | "jpg";
        tags: Array<string>;
    };

    function imageExists(url: string) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener("load", () => resolve(true));
            img.addEventListener("error", (e) => reject(e));
            img.src = url;
        });
    }

    const defaultDirectory = "/images/gallery/placeholder";
    const defaultBefore = `${defaultDirectory}/before.png`;
    const defaultAfter = `${defaultDirectory}/after.png`;

    const { dir, ext, tags = [] }: CompareProps = $props();

    let width = $state(0);
    let height = $state(0);

    const positionX = new Spring(0, {
        damping: 0.7,
    });

    // biome-ignore lint/style/useConst: <explanation>
    let divider = $state<HTMLElement | undefined>(undefined);

    const beforePath = $state(`${dir}/before.${ext}`);
    const afterPath = $state(`${dir}/after.${ext}`);

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
        if (divider && width > 0 && height > 0) {
            positionX.target = event.offsetX;
        }
    }
    //
    function resetPositions() {
        if (divider && width > 0 && height > 0) {
            positionX.target = Math.floor(width * 1);
        }
    }
</script>

<div
    class="relative overflow-hidden"
    data-ref-id={id}
    onmousemove={handleMouseMove}
    onmouseleave={resetPositions}
    role="figure"
    aria-label="Before After Comparison"
    style="--position-x:{positionX.current}px;"
>
    <div class="before-wrapper bg-black" bind:this={beforeOverlay}>
        {#await imageExists(beforePath) then}
            <img src={beforePath} alt={"before image"} class="opacity-80" />
        {:catch}
            <img src={defaultBefore} alt={"before image"} />
        {/await}
    </div>
    <div
        class="after-wrapper absolute left-0 top-0 overflow-hidden z-20"
        style="width:var(--position-x);height:{height}px"
    >
        <div
            class="label__button absolute left-2 top-2 pointer-events-none z-30"
        >
            <span class="btn__text">After</span>
        </div>
        {#await imageExists(afterPath) then}
            <img
                src={afterPath}
                style="width: {width}px;height:{height}px;max-width:{width}px"
                alt={"after image"}
                onload={initialize}
            />
        {:catch}
            <img
                src={defaultAfter}
                alt={"after image"}
                style="width: {width}px;height:{height}px;max-width:{width}px"
                onload={initialize}
            />
        {/await}
    </div>
    <div
        class="indicator w-[2px] h-full absolute top-0 -translate-x-1/2 bg-white opacity-0 pointer-events-none z-40"
        style="box-shadow:0 0 2em 1em var(--primary-color-20); left: var(--position-x);"
        bind:this={divider}
    ></div>
    <div class="label__button absolute right-2 top-2 pointer-events-none z-10">
        <span class="btn__text">Before</span>
    </div>

    {#if tags.length > 0}
        <div
            class="tags__wrapper absolute bottom-2 inset-x-0 gap-2 flex items-center px-3 pointer-events-none z-50"
        >
            {#each tags as tag}
                <div
                    class="tag text-sm px-3 py-1 rounded-full bg-[#00000020] backdrop-blur-sm text-white backdrop-brightness-90"
                >
                    {tag}
                </div>
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
