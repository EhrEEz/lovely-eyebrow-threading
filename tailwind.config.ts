import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: {
				"2xl": "1440px",
				xl: "1200px",
				lg: "960px",
				md: "720px",
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
		},
	},

	plugins: [typography, forms, containerQueries],
} satisfies Config;
