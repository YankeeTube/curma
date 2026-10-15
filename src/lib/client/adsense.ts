import { dev } from '$app/env';

const requested = new WeakSet<HTMLElement>();

export function adsense(element: HTMLElement) {
	if (dev || requested.has(element)) return;

	const observer = new ResizeObserver(request);
	observer.observe(element);
	request();

	function request() {
		if (!element.isConnected || element.getBoundingClientRect().width === 0) return;
		observer.disconnect();
		if (requested.has(element)) return;
		requested.add(element);
		try {
			(window.adsbygoogle ??= []).push({});
		} catch (error) {
			console.error('광고를 초기화하지 못했습니다.', error);
		}
	}

	return () => observer.disconnect();
}
