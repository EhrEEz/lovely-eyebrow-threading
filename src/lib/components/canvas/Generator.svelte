<script lang="ts">
	import "./_floaters.scss";
	const { children = null } = $props();
</script>

{#each { length: 6 }, ind}
	<div class="oval--pink oval--{ind + 1}"></div>
{/each}
