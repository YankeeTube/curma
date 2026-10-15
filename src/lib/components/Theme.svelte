<script lang="ts">
	import { onMount } from 'svelte';
	let dark = $state(false);
	onMount(() => {
		dark = document.documentElement.classList.contains('dark');
	});
	function change() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		try {
			localStorage.setItem('CURMA::DARK', String(dark));
		} catch {
			/* Keep the theme usable when browser storage is unavailable. */
		}
	}
</script>

<button
	class="theme"
	type="button"
	onclick={change}
	aria-label={dark ? '라이트 테마로 변경' : '다크 테마로 변경'}
	aria-pressed={dark}
	title={dark ? '라이트 테마로 변경' : '다크 테마로 변경'}
>
	{#if dark}
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
			/>
		</svg>
	{:else}
		<svg viewBox="0 0 24 24" aria-hidden="true"
			><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" /></svg
		>
	{/if}
</button>
