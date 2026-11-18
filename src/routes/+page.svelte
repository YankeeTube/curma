<script lang="ts">
	import { asset } from '$app/paths';
	import { services } from '#lib/services.js';
	const description =
		'메이플커마, 던파커마, 리딤커마, 이환·몬길 맵스, 니케 맵스·에셋, 카제나 덱 빌더와 TL&D. 게임과 일상을 위한 서비스를 한곳에서 만나보세요.';
</script>

<svelte:head>
	<title>커마 | 게임과 일상을 위한 도구들</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="https://curma.cc/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="커마" />
	<meta property="og:title" content="커마 | 게임과 일상을 위한 도구들" />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://curma.cc/" />
	<meta property="og:locale" content="ko_KR" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<div class="page">
	<section class="hero" aria-labelledby="title">
		<span class="eyebrow"><span class="dot"></span> CURMA.CC</span>
		<h1 id="title">좋아하는 게임을,<br />조금 더 편리하게.</h1>
		<p>직접 만든 게임 서비스와 유용한 도구들을 만나보세요.</p>
	</section>
	<section aria-labelledby="services">
		<div class="listhead">
			<h2 id="services">서비스 바로가기</h2>
			<span>{String(services.length).padStart(2, '0')} SERVICES</span>
		</div>
		<ol class="services">
			{#each services as service, index (service.link)}
				<li>
					<!-- Every service destination is an absolute external URL. -->
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a class="service" href={service.link}>
						<span class="number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
						<span class="picture" data-tone={service.tone}>
							<img src={asset(service.icon)} alt="" width="32" height="32" />
						</span>
						<div class="details">
							<h3>{service.name}</h3>
							<p>{service.description}</p>
							<span class="domain">{service.domain}</span>
						</div>
						<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"
							><path d="M5 12h14m-6-6 6 6-6 6" /></svg
						>
					</a>
				</li>
			{/each}
		</ol>
	</section>
	<div class="note">
		<span class="dot"></span> 일상에 작은 편리함을 더하는 서비스들을 만들고 있습니다.
	</div>
</div>
