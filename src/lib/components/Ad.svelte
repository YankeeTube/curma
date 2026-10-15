<script lang="ts">
	import { adsense } from '#lib/client/adsense.js';

	let { size = 'banner' }: { size?: 'banner' | 'medium' | 'tall' } = $props();
</script>

<div class="advert" data-size={size}>
	<ins
		{@attach adsense}
		class="adsbygoogle"
		data-ad-client="ca-pub-9888197614457245"
		data-ad-slot={size === 'tall' ? '1365083446' : '1878597845'}
		data-full-width-responsive="false"
	></ins>
	<span aria-hidden="true">Google Adsense</span>
</div>
