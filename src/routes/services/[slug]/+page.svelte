<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import Compare from "$lib/components/compare/Compare.svelte";
  import type { Gallery, Service } from "$lib/types/variables";
  const { data } = $props();
  const service = $state<Service | undefined>(data.service);
  const gallery = $state<Gallery[] | undefined>(data.gallery);
  const asset_url = $state(data.asset_url);
  const gallery_url = $state(data.gallery_url);
  let ready = $state(false);

  $effect(() => {
    ready = true;
  });
</script>

<main class="mt-56">
  <section class="main__section mb-36">
    <div class="container">
      <div class="grid grid-cols-12">
        <div class="col-span-6 px-24">
          <div class="overflow-hidden oval-image rotate-12">
            <img
              src="{asset_url}/{service?.id}/{service?.banner}"
              alt="{service?.name} Image"
            />
          </div>
        </div>
        <div class="col-span-6">
          <h1 class="text-8xl mb-4">{service?.name}</h1>
          <p class="text-md pe-24 leading-8">
            {service?.short_description}
          </p>
          {#if service?.booking_link}
            <Button href={service.booking_link}>Book Now</Button>
          {/if}
        </div>
      </div>
    </div>
  </section>
  {#if gallery && gallery.length > 0}
    <section class="gallery__section mb-36">
      <div class="container">
        <h2 class="text-6xl mb-8">
          Transformations Including {service?.name}
        </h2>
        <div class="grid grid-cols-2 gap-12">
          {#each gallery as item}
            <Compare
              config={{
                before: `${gallery_url}/${item.id}/${item.before}`,
                after: `${gallery_url}/${item.id}/${item.after}`,
                alt: `${item.label}`,
              }}
              tags={["Eyebrow Threading", "Eyelash Extensions"]}
            />
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <section class="mb-36">
    <div class="marquee flex services-center gap-12">
      <h2 class="text-8xl shrink-0">{service?.short_quote}</h2>
      <div class="text-9xl font-serif">-</div>
      <h2 class="text-8xl shrink-0">{service?.short_quote}</h2>
      <div class="text-9xl font-serif">-</div>
      <h2 class="text-8xl shrink-0">{service?.short_quote}</h2>
    </div>
  </section>
</main>

<style>
  .oval-image {
    border-radius: 100%;
  }

  .oval-image img {
    aspect-ratio: 4 / 3;
    inline-size: 100%;
    object-fit: cover;
  }
</style>
