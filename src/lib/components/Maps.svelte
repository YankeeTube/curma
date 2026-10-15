<script lang="ts">
	let left = $state(0);
	let shown = $state(false);
	const maps = [
		{
			id: 'nte',
			name: '이환 맵스',
			badge: '이환 월드맵',
			copy: '이환의 월드맵을 한눈에',
			link: 'https://tlnd.cc/nte'
		},
		{
			id: 'mongil',
			name: '몬길 맵스',
			badge: '몬길: STAR DIVE',
			copy: '탐험과 수집을 더 편리하게',
			link: 'https://tlnd.cc/mongil'
		}
	] as const;

	function position(element: HTMLElement) {
		const parent = element.parentElement;
		if (!parent) return;
		const update = () => {
			const offset = parent.getBoundingClientRect().right + 16;
			const width = Number.parseFloat(getComputedStyle(element).width);
			left = offset;
			shown = offset + width <= document.documentElement.clientWidth;
		};
		const observer = new ResizeObserver(update);
		observer.observe(document.documentElement);
		observer.observe(parent);
		observer.observe(element);
		update();
		return () => observer.disconnect();
	}
</script>

<aside {@attach position} class={{ shown }} style:left={`${left}px`} aria-label="지도 서비스 안내">
	{#each maps as map (map.id)}
		<!-- Both map destinations are external services. -->
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			class="maps"
			data-map={map.id}
			href={map.link}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`${map.name} 새 탭에서 열기`}
		>
			<span class="cover">
				<svg class="art" viewBox="0 0 240 152" fill="none" aria-hidden="true">
					{#if map.id === 'nte'}
						<path
							d="m-12 37 80-18 49 26 78-29 59 24M-9 104l61-21 70 28 73-31 61 23M52-12l16 31-16 64 26 81M151-12l-34 57 5 66-17 53M222-8l-27 24v64l29 83"
							stroke="white"
							stroke-opacity=".13"
							stroke-width="1"
						/>
						<path
							d="m105 118 26-33 29 8 27-40 35-9"
							stroke="var(--highlight)"
							stroke-opacity=".7"
							stroke-width="2"
							stroke-dasharray="4 6"
						/>
						<circle cx="131" cy="85" r="3" fill="var(--cyan)" stroke="none" />
						<circle cx="160" cy="93" r="3" fill="var(--highlight)" stroke="none" />
						<circle cx="187" cy="53" r="24" stroke="var(--highlight)" stroke-opacity=".14" />
						<circle
							cx="187"
							cy="53"
							r="17"
							fill="var(--highlight)"
							fill-opacity=".1"
							stroke="none"
						/>
						<path
							d="M187 35a11 11 0 0 0-11 11c0 9 11 18 11 18s11-9 11-18a11 11 0 0 0-11-11Z"
							fill="var(--highlight)"
							stroke="#fff0b8"
							stroke-width="1.5"
						/>
						<circle cx="187" cy="46" r="4" fill="#202124" stroke="none" />
					{:else}
						<path
							d="M-20 110c44-69 83 34 139-21s97-55 143-22M-20 130c44-69 83 34 139-21s97-55 143-22M-20 90c44-69 83 34 139-21s97-55 143-22M-20 70c44-69 83 34 139-21s97-55 143-22"
							stroke="var(--green)"
							stroke-opacity=".2"
							stroke-width="1"
						/>
						<path
							d="m105 125 24-26 34-6 27-43 32-13"
							stroke="var(--highlight)"
							stroke-opacity=".6"
							stroke-width="2"
							stroke-dasharray="4 6"
						/>
						<path
							d="m164 44-15 22h7l-11 17h38l-11-17h7zM199 62l-12 18h5l-8 14h30l-9-14h6z"
							fill="var(--green)"
							fill-opacity=".18"
							stroke="var(--green)"
							stroke-width="1.5"
						/>
						<path d="M164 83v10m35 1v9" stroke="var(--green)" stroke-width="2" />
						<path d="m197 27 3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="var(--highlight)" stroke="none" />
					{/if}
				</svg>
				<span class="badge">{map.badge}</span>
				<strong class="caption">{map.name}</strong>
			</span>
			<span class="body">
				<span class="copy">{map.copy}</span>
				<span class="action"
					>지도 열기<svg viewBox="0 0 24 24" aria-hidden="true"
						><path d="M5 12h14m-5-5 5 5-5 5" /></svg
					></span
				>
			</span>
		</a>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	{/each}
</aside>

<style>
	aside {
		position: fixed;
		top: 16px;
		z-index: 10;
		display: none;
		width: 240px;
		max-height: calc(100dvh - 32px);
		flex-direction: column;
		gap: 16px;
		overflow-y: auto;
		overscroll-behavior: contain;
	}
	aside.shown {
		display: flex;
	}
	.maps {
		--highlight: #ffe58f;
		--hover: #fff0b8;
		--cyan: #7cecfc;
		--green: #819c73;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		overflow: hidden;
		border: 1px solid var(--line);
		border-radius: 16px;
		background: var(--paper);
		transition: border-color 150ms;
	}
	.maps:hover {
		border-color: var(--highlight);
	}
	.maps:focus-visible {
		outline: 2px solid var(--highlight);
		outline-offset: -2px;
	}
	.cover {
		position: relative;
		display: flex;
		min-height: 152px;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		gap: 32px;
		overflow: hidden;
		padding: 16px 16px 20px;
		color: #f3f1e9;
		background: #202224;
	}
	.maps[data-map='mongil'] {
		--highlight: #a6d9a0;
		--hover: #c0e9b9;
	}
	.maps[data-map='mongil'] .cover {
		background: linear-gradient(135deg, #234d3b, #142e25);
	}
	.maps[data-map='mongil'] .body {
		background: #f2f8ee;
	}
	:global(.dark) .maps[data-map='mongil'] .body {
		background: #14221a;
	}
	.art {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		transition: transform 200ms;
	}
	.maps:hover .art {
		transform: scale(1.04);
	}
	.badge {
		position: relative;
		padding: 4px 8px;
		border: 1px solid rgb(255 229 143 / 30%);
		border-radius: 999px;
		color: #fff0b8;
		background: rgb(255 255 255 / 8%);
		font-size: 10px;
		font-weight: 700;
	}
	.maps[data-map='mongil'] .badge {
		border-color: rgb(166 217 160 / 35%);
		color: #c0e9b9;
		background: rgb(166 217 160 / 12%);
	}
	.caption {
		position: relative;
		font-size: 26px;
		font-weight: 900;
		line-height: 1.3;
		letter-spacing: -0.04em;
	}
	.body {
		display: grid;
		gap: 14px;
		padding: 16px;
	}
	.copy {
		color: var(--muted);
		font-size: 12px;
		line-height: 1.7;
	}
	.action {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 12px;
		border-radius: 10px;
		color: #202124;
		background: var(--highlight);
		font-size: 12px;
		font-weight: 700;
		transition: background-color 150ms;
	}
	.action svg {
		width: 18px;
		height: 18px;
		transition: transform 150ms;
	}
	.maps:hover .action {
		background: var(--hover);
	}
	.maps:hover .action svg {
		transform: translateX(3px);
	}
	@media (prefers-reduced-motion: reduce) {
		.maps,
		.art,
		.action,
		.action svg {
			transition: none;
		}
		.maps:hover .art,
		.maps:hover .action svg {
			transform: none;
		}
	}
</style>
