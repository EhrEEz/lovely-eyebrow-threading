import { goto } from "$app/navigation";
import type { User } from "$lib/types/variables";
import { redirect } from "@sveltejs/kit";

export const userState = $state({
	user: null as User | null,
	logout: async () => {
		const res = await fetch("/ep/logoutUser", {
			method: "GET",
		});
		const json = await res.json();
		if (json) {
			userState.user = null;
			goto("/new-post");
		} else {
			console.error(res);
		}
	},
});
