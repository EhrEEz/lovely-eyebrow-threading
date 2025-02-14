<script>
    // @ts-nocheck

    import { fade, fly } from "svelte/transition";
    import Button from "$lib/components/buttons/Button.svelte";
    import Social from "$lib/components/social/Social.svelte";

    const { data } = $props();

    const page = $state(data.page);

    const services = $state(data.services);

    let ready = $state(false);

    $effect(() => {
        ready = true;
    });
</script>

{#if ready}
    <main>
        <section class="relative">
            <div class="container">
                <div
                    class="flex-col flex items-center justify-center min-h-dvh"
                >
                    <address
                        class="flex items-center justify-center gap-4 not-italic mb-5"
                        in:fade={{ duration: 700, delay: 400 }}
                    >
                        <span class="uppercase">{page.address.address_1} </span>
                        <span class="uppercase">{page.address.address_2}</span>
                    </address>
                    <h2
                        class="text-9xl"
                        id="title-1"
                        in:fly={{ y: 20, duration: 1000, delay: 100 }}
                    >
                        {page.title}
                    </h2>
                    <h2
                        class="text-7xl"
                        id="title-2"
                        in:fly={{ y: -15, duration: 1000, delay: 200 }}
                    >
                        {page.subtitle}
                    </h2>
                    <div
                        class="flex items-center justify-center gap-6 mt-8"
                        in:fade={{ duration: 300, delay: 600 }}
                    >
                        <Button variant="default" size="lg"
                            ><span class="btn__text">Book Now</span></Button
                        >
                        <Button variant="link" size="lg"
                            ><span class="btn__text">Contact Us</span></Button
                        >
                    </div>
                </div>
                <div
                    class="floating__image image--1"
                    in:fly={{ y: 25, x: -25, duration: 1000, delay: 400 }}
                >
                    <img src="/images/header-2.png" alt={"Header Image 1"} />
                </div>

                <div
                    class="floating__image image--2"
                    in:fly={{ y: 25, x: 25, duration: 1000, delay: 450 }}
                >
                    <img src="/images/header-1.png" alt={"Header Image 2"} />
                </div>
            </div>
        </section>
        <section class="pt-48">
            <div class="container">
                <h2 class="text-7xl uppercase mb-8">
                    {services.title}
                </h2>
                <ul class="flex gap-8">
                    {#each services.items as item, index}
                        <li>
                            <a href="/{item.slug}">
                                <div
                                    class="card relative rounded-sm overflow-hidden aspect-[11/16] min-w-80"
                                >
                                    <div
                                        class="w-full h-full p-8 flex flex-col justify-end"
                                    >
                                        <div class="text-md text-primary">
                                            {index + 1 < 10
                                                ? `0${index + 1}`
                                                : index}
                                        </div>
                                        <h3 class="text-3xl text-white mb-0">
                                            {item.name}
                                        </h3>
                                    </div>
                                    <div
                                        class="card__bg w-full h-full absolute left-0 top-0 -z-10"
                                    >
                                        <img
                                            src="/images/services/{item.image}"
                                            alt={item.name}
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </section>
        <section class="py-48">
            <div class="marquee flex items-center gap-12">
                <h3 class="text-8xl shrink-0">Own your brows</h3>
                <div class="text-9xl font-serif">-</div>
                <h3 class="text-8xl shrink-0">Own your brows</h3>
            </div>
        </section>
        <section class="featured-service__section">
            <div class="container flex gap-8 items-center">
                <div class="w-1/2 pe-20">
                    <h2 class="font-sans font-normal text-2xl mb-6 uppercase">
                        Tinted Eyebrows
                    </h2>
                    <p class="text-lg leading-9">
                        Thanks to modern innovation, achieving full, beautiful
                        brows—even if you weren’t genetically blessed with
                        them—is now very attainable: From high-performance brow
                        pencils to brow-growing serums that yield impressive
                        results, there are plenty of options for getting thicker
                        brows in just a few swipes or strokes. However, if you
                        prefer a fix that doesn’t involve using numerous brow
                        products or filling them in on a daily basis, consider
                        giving eyebrow tinting a try.
                    </p>
                </div>
                <div class="w-1/2">
                    <div class="rounded-xxl overflow-hidden relative">
                        <h4
                            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white px-3 py-3 w-full text-5xl !leading-[1em]"
                        >
                            Whatever type your eyebrows are, We got you covered
                        </h4>
                        <img
                            src="/images/eyebrow.png"
                            class="w-full"
                            alt="Whatever type your eyebrows are,
We got you covered"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section class="contact__section pt-48 pb-24">
            <div class="container">
                <div class="flex items-center flex-col gap-20">
                    <div
                        class="contact__wrapper relative w-3/4 flex justify-center"
                    >
                        <div
                            class="contact__image relative !overflow-hidden rounded-xxl after:absolute after:w-full after:block after:left-0 after:top-0 after:h-full w-2/3"
                        >
                            <img
                                src="/images/message.png"
                                class="w-full"
                                alt="Shop Chairs"
                            />
                        </div>
                        <div
                            class="flex flex-col justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
                        >
                            <h2 class="text-8xl text-primary text-center">
                                Have Questions? Ready to book an appointment?
                            </h2>
                            <Button href="/contact" size="lg">Lets Talk</Button>
                        </div>
                    </div>
                    <div
                        class="socials__wrapper flex flex-col items-center gap-3"
                    >
                        <div class="uppercase">Find us on Social Media</div>
                        <div
                            class="left-section flex gap-8 items-center flex-grow basis-0"
                        >
                            {#each data.settings.socials as social}
                                <a
                                    class="social__link hover:opacity-80"
                                    href={social.url}
                                    title={`${social.name} Page`}
                                    target="_blank"
                                >
                                    <Social
                                        name={social.icon}
                                        height={20}
                                        color={"#FAABE5"}
                                    />
                                </a>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
{/if}

<style>
    .contact__image::after {
        background-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 100%
        );
    }
    .floating__image {
        position: absolute;
        inline-size: 25vw;
        aspect-ratio: 15 /10;
        border-radius: 50%;
        overflow: hidden;
        z-index: -1;
    }

    .floating__image img {
        block-size: 100%;
        inline-size: 100%;
        object-fit: cover;
        object-position: center center;
        rotate: -10deg;
    }
    .floating__image.image--1 {
        top: 15%;
        left: 0;
        /* top: 25%;
        left: -25%; */
        transform: translate(-35%, 0);
        rotate: 20deg;
        animation: float--1 14s ease-out infinite alternate;
    }

    .floating__image.image--2 {
        bottom: 0;
        right: 0;
        rotate: -12deg;
        scale: 1.2;

        animation: float--2 12s ease-out 1s infinite alternate;
    }

    .card__bg::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.8) 100%
        );
    }

    @keyframes float--1 {
        100% {
            translate: 0.5rem 0.5rem;
            rotate: 10deg;
        }
    }
    @keyframes float--2 {
        100% {
            translate: 1rem 0.5rem;
            rotate: -18deg;
        }
    }
</style>
