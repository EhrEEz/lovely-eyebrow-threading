import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import { fontFamily } from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/@selemondev/svelte-marquee/dist/*.svelte"],

	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: {
				"2xl": "1440px",
				xl: "1200px",
				lg: "1024px",
				md: "768px",
				sm: "640px",
			},
		},
		transitionDuration: {
			DEFAULT: "250ms",
		},
		transitionProperty: {
			DEFAULT: "scale, background-color, color, opacity",
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: "var(--primary-color)",
					foreground: "var(--primary-foreground-color)",
					90: "var(--primary-color-90)",
					20: "var(--primary-color-20)",
					50: "var(--primary-color-50)",
				},
				secondary: {
					DEFAULT: "var(--secondary-color)",
					95: "var(--secondary-color-95)",
					90: "var(--secondary-color-90)",
				},
				text: {
					DEFAULT: "var(--text-color)",
					light: "var(--light-text-color)",
				},
			},
			borderRadius: {
				xl: "var(--radius)",
				xxl: "4rem",
				lg: "3rem",
				md: "2rem",
				sm: "1rem",
				xs: "0.8rem",
			},

			fontFamily: {
				sans: ["Akshar", ...fontFamily.sans],
				serif: ["Perandory", ...fontFamily.sans],
			},
			keyframes: {
				"marquee-left": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-100% - var(--gap)))" },
				},
				"marquee-up": {
					from: { transform: "translateY(0)" },
					to: { transform: "translateY(calc(-100% - var(--gap)))" },
				},
			},
			animation: {
				"marquee-left": "marquee-left var(--duration, 40s) linear infinite",
				"marquee-up": "marquee-up var(--duration, 40s) linear infinite",
			},
		},
	},

	plugins: [typography, forms, containerQueries, animate],
} satisfies Config;
