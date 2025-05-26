<script lang="ts">
  import type { Service } from "$lib/types/variables";
  const { data } = $props();
  const services = $state<Service[] | undefined>(data.services);
  const asset_url = $state(data.asset_url);
  let ready = $state(false);

  $effect(() => {
    ready = true;
  });
</script>

{#if ready}
  <main>
    <section class="mt-32 py-24">
      <div class="marquee flex services-center gap-12">
        <h2 class="text-8xl shrink-0">Our Services</h2>
        <div class="text-9xl font-serif">-</div>
        <h2 class="text-8xl shrink-0">Our Services</h2>
        <div class="text-9xl font-serif">-</div>
        <h2 class="text-8xl shrink-0">Our Services</h2>
      </div>
    </section>
    <section class="service__section pb-48">
      <div class="container">
        {#if services}
          <ul class="grid grid-cols-2 service__list gap-12 w-10/12 mx-auto">
            {#each services as service, index}
              <li class="service__item">
                <a href="/services/{service.slug}" class="block">
                  <div
                    class="card relative overflow-hidden aspect-[5/6] min-w-80 rounded-lg"
                  >
                    <div class="w-full h-full p-12 flex flex-col justify-start">
                      <div class="text-md text-primary mb-2">
                        {index + 1 < 10 ? `0${index + 1}` : index}
                      </div>
                      <h3 class="text-7xl text-white mb-0 leading-relaxed">
                        {service.name}
                      </h3>
                    </div>
                    <div
                      class="card__bg w-full h-full absolute left-0 top-0 -z-10"
                    >
                      <img
                        src="{asset_url}/{service.id}/{service.banner}"
                        alt={service.name}
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </section>
  </main>
{/if}

<style>
  .service__item:nth-child(even) .card {
    translate: 0 6rem;
  }
  .card__bg::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }
</style>
