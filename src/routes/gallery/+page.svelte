<script lang="ts">
    import Compare from "$lib/components/compare/Compare.svelte";
</script>

<main class="mt-64">
    <h2 class="text-center text-9xl">
        Transformation <div>Gallery</div>
    </h2>

    <section
        class="compare__section py-32"
        aria-describedby="GalleryDescription"
    >
        <div class="container mb-8">
            <p class="text-center uppercase text-xl" id="GalleryDescription">
                Move mouse left and right over image to compare before & after
                of transformations.
            </p>
        </div>
        <div class="container">
            <div class="grid grid-cols-2 gap-4">
                <!-- <Compare
                    dir="/images/gallery/1"
                    ext={"jpg"}
                    tags={["Eyebrow Threading", "Eyelash Extensions"]}
                />
                <Compare
                    dir="/images/gallery/1"
                    ext={"jpg"}
                    tags={["Eyebrow Threading", "Eyelash Extensions"]}
                /> -->
            </div>
        </div>
    </section>
</main>
