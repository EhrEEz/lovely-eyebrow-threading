<script lang="ts">
    import Logo from "$lib/assets/svg/logo.svg";
    import { PRIMARY_LINK_ITEMS } from "$lib/types/constants";
    import { getContext } from "svelte";

    import type { LinkType } from "$lib/types/variables";

    const currentYear = new Date().getFullYear();

    const headerLinks = $state<LinkType[]>(PRIMARY_LINK_ITEMS);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const data: any = getContext("site-settings");
</script>

<footer class="py-4 mt-4">
    <div class="container">
        <div class="main__line flex items-center justify-between gap-4">
            <div class="flex flex-col items-center">
                <div class="logo__wrapper w-72">
                    <img
                        src={Logo}
                        alt="Lovely Eyebrow Threading Logo"
                        class="mb-3 w-full"
                    />
                </div>
                <address class="uppercase not-italic">
                    <a
                        href={data.address.map_link}
                        title="Google maps {data.address.address_1} {data
                            .address.address_2}"
                        >{data.address.address_1}
                        &nbsp;&nbsp; {data.address.address_2}</a
                    >
                </address>
            </div>
            <ul class="links__wrapper flex gap-8">
                {#each headerLinks as link}
                    {#if link.slug !== data.cta}
                        <li class="footer__link">
                            <a
                                href={link.href}
                                class="uppercase underline hover:decoration-primary decoration-2 underline-width-8 decoration-transparent underline-offset-4 transition-[all] duration-300"
                                title={link.name}
                            >
                                {link.name}
                            </a>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
        <div class="sr-only">
            Beauty services that define you and Results that make you smile
        </div>
        <div
            class="legal__links flex items-center justify-center gap-8 mt-32"
            aria-label="Legal Items"
        >
            <a
                href="/privacy-policy"
                class="uppercase text-text-light hover:text-text underline transition"
                title="Privacy Policy">Privacy Policy</a
            >
            <div class="uppercase text-text-light">
                Lovely Eyebrow Threading © {currentYear}
            </div>
            <a
                href="/terms-of-service"
                class="uppercase text-text-light hover:text-text transition underline"
                title="Terms of Service">Terms of Service</a
            >
        </div>
    </div>
</footer>

<style>
    footer {
        background-image: url("./footer-slogan.svg");
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: 60% bottom;
    }
</style>
