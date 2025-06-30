import type { User } from "$lib/types/variables";

export const userState = $state({
	user: null as User | null,
	logout: async () => {
		const res = await fetch("ep/auth/logout", {
			method: "POST",
		});
		if (res.ok) {
			userState.user = null;
		}
	},
});
