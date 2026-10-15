<script lang="ts">
	import './layout.css';
	import { asset, resolve } from '$app/paths';
	import Theme from '#lib/components/Theme.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	const year = new Date().getFullYear();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={asset('logo.svg')} />
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#0a0b0c" media="(prefers-color-scheme: dark)" />
</svelte:head>

<a class="skip" href="#content">본문으로 바로가기</a>

<div class="shell">
	<header class="header">
		<a class="brand" href={resolve('/')} aria-label="커마 홈">
			<img src={asset('logo.svg')} alt="" width="32" height="32" />
			<span>커마</span>
		</a>
		<nav aria-label="주요 메뉴">
			<a href={resolve('/')} aria-current="page">서비스</a>
			<a href="https://tlnd.cc/blog/ko">블로그</a>
		</nav>
		<Theme />
	</header>
	<main id="content" tabindex="-1">
		{@render children()}
	</main>
	<footer class="footer">
		<div class="columns">
			<div class="intro">
				<a class="brand" href={resolve('/')}>
					<img src={asset('logo.svg')} alt="" width="36" height="36" />
					<span>커마</span>
				</a>
				<p>게임과 일상을 위한 작은 도구들을 만듭니다.</p>
			</div>
			<div class="menus">
				<div>
					<p class="heading">바로가기</p>
					<nav aria-label="하단 바로가기">
						<a href="https://tlnd.cc">TL&amp;D</a>
						<a href="https://tlnd.cc/blog/ko">블로그</a>
					</nav>
				</div>
				<div>
					<p class="heading">지원</p>
					<nav aria-label="하단 지원 메뉴">
						<a href="https://toon.at/donate/curma" target="_blank" rel="noreferrer">후원하기</a>
						<a href="https://discord.gg/EXqKQCAb6m" target="_blank" rel="noreferrer">문의·피드백</a>
					</nav>
				</div>
			</div>
		</div>
		<div class="copyright">{year} © curma.cc. All rights reserved.</div>
	</footer>
</div>
