import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function extractFirstTwoWordsKebab(input: string) {
	const words = input.match(/[A-Za-z]+/g);
	if (!words || words.length === 0) return null;
	const selected = words.slice(0, 2).map((w) => w.toLowerCase());
	return selected.join("-");
}
