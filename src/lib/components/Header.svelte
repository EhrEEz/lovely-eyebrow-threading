<script lang="ts">
    import Button from "./buttons/Button.svelte";
    import Logo from "$lib/assets/svg/logo.svg";
    import LogoDark from "$lib/assets/svg/logo-dark.svg";
    import MenuSlide from "$lib/components/menu/Menu.svelte";
    import Social from "./social/Social.svelte";
    import type { LinkType } from "$lib/types/variables";
    import { PRIMARY_LINK_ITEMS } from "$lib/types/constants";
    import MenuToggle from "./menu/MenuToggle.svelte";
    import { getContext } from "svelte";

    // biome-ignore lint/suspicious/noExplicitAny: will only change at the end of project completion taking into account every changes later made
    const data: any = getContext("site-settings");

    console.log(data);
    const { navScroll } = $props();
    const mini = $state(data.header_mini);

    const headerLinks = $state<LinkType[]>(PRIMARY_LINK_ITEMS);

    let menuView = $state<boolean>(false);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    function getHalf(arr: any[]): [any[], any[]] {
        const half = Math.floor((arr.length - 1) / 2);
        const first = arr.slice(0, half);
        const second = arr.slice(half);
        return [first, second];
    }
    const cta = $derived.by((): LinkType => {
        const ctaItem = headerLinks.find((emt) => emt.slug === data.cta);
        if (!ctaItem) {
            return {
                name: "Contact Us",
                slug: "contact-us",
                href: "/contact-us",
            };
        }
        return ctaItem;
    });
    const splitlinks = getHalf(headerLinks);

    function toggleMenu() {
        menuView = !menuView;
    }
</script>

<header
    id="topHeader"
    class="absolute left-0 top-0 right-0 z-40 py-6"
    class:nav__bg={navScroll && !menuView}
>
    <div class="container">
        <div class="flex justify-between items-center gap-4">
            <div class="left-section flex gap-4 items-center flex-grow basis-0">
                {#each data.socials as social}
                    <a
                        class="social__link hover:opacity-80"
                        href={social.url}
                        title={`${social.name} Page`}
                        target="_blank"
                    >
                        <Social
                            name={social.icon}
                            height={15}
                            width={14}
                            color={navScroll && !menuView
                                ? "#FFFFFF"
                                : "#000000"}
                        />
                    </a>
                {/each}
            </div>
            <nav
                class="middle-section flex gap-8 items-center justify-center flex-grow"
            >
                {#if !mini}
                    <ul
                        class="list-none flex gap-4 items-center justify-end flex-grow basis-0"
                    >
                        {#each splitlinks[0] as link}
                            {#if link.name !== cta.name}
                                <li>
                                    <a
                                        class="uppercase text-sm text-primary-foreground hover:underline decoration-primary decoration-2 underline-offset-4"
                                        href={link.href}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                {/if}
                <a href="/" title="Home">
                    <h1 class="flex logo-modifier">
                        <span class="sr-only">Lovely Eyebrow Threading</span>
                        <img
                            src={navScroll && !menuView ? LogoDark : Logo}
                            alt="Lovely Eyebrow Threading"
                        />
                    </h1>
                </a>
                {#if !mini}
                    <ul
                        class="list-none flex items-center justify-start gap-4 flex-grow basis-0"
                    >
                        {#each splitlinks[1] as link}
                            {#if link.name !== cta.name}
                                <li>
                                    <a
                                        class="uppercase text-sm text-primary-foreground hover:underline decoration-primary decoration-2 underline-offset-4 nav__items"
                                        href={link.href}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                {/if}
            </nav>
            <div
                class="right-section flex gap-6 items-end justify-end flex-grow basis-0"
            >
                <Button variant="default" size="lg" href={cta.href}>
                    <span class="btn__text">{cta.name} </span>
                </Button>
                {#if mini}
                    <MenuToggle onClick={toggleMenu} {menuView} />
                {/if}
            </div>
        </div>
    </div>
</header>
{#if mini}
    <MenuSlide view={menuView} />
{/if}

<style>
    header {
        --logo-width: clamp(8dvw, 12rem, 12dvw);
        will-change: background-color;
        background-color: transparent;
        transition: background-color 0.3 cubic-bezier(0.25, 0.1, 0, 0.93);
    }

    .logo-modifier {
        width: var(--logo-width);
        height: max-content;
        will-change: height, width;
        transition: 0.3s cubic-bezier(0.25, 0.1, 0, 0.93);
    }

    .nav__bg {
        background-color: black;
        --logo-width: clamp(7dvw, 7rem, 12dvw);
        padding-block: 1em;
        transition: 0.3 cubic-bezier(0.25, 0.1, 0, 0.93);
    }
</style>
