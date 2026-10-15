# curma.cc

직접 만든 서비스의 바로가기를 모은 SvelteKit 3 / Svelte 5 사이트입니다. 메이플커마·던파커마의 768px 본문, 56px 헤더, 로고, 테마와 푸터 구성을 따릅니다.

## 구성

- `src/lib/services.ts`: 서비스 이름, 설명, 링크, 아이콘
- `src/routes/+page.svelte`: 서비스 바로가기 메인페이지
- `src/routes/+layout.svelte`: 공통 헤더와 푸터
- `src/routes/layout.css`: 반응형 레이아웃과 테마
- `static/ads.txt`: 메이플커마와 동일한 AdSense 게시자 설정
- `wrangler.jsonc`: Cloudflare 배포 설정

`@sveltejs/adapter-static`과 루트 레이아웃의 `prerender = true`로 전체 페이지를 빌드 시 HTML로 생성합니다. 결과물은 `build/`에 저장되며, 요청 시 SSR이나 데이터베이스 조회가 없습니다. 자바스크립트를 사용하지 않아도 모든 서비스 링크를 이용할 수 있습니다. 테마 선택은 브라우저에서 동작하며 `CURMA::DARK` 키로 저장합니다.

## 검사

```sh
npm ci
npm run check
npm run lint
npm run deploy:check
```

`deploy:check`는 정적 빌드와 Wrangler 패키징만 확인하며 실제 배포는 하지 않습니다. 개발·미리보기 서버는 명시적으로 요청하신 경우에만 실행합니다.

## Cloudflare Workers 배포

```sh
npm run deploy
```

Cloudflare 인증이 설정된 환경에서 실행하시면 됩니다. Workers Builds에서는 빌드 명령을 `npm run build`, 배포 명령을 `npx wrangler deploy`로 설정하시면 됩니다.

- Worker 이름: `curma`
- CPU 설정: `limits.cpu_ms = 1`
- 정적 파일 디렉터리: `build/`
- 존재하지 않는 경로: `static/404.html`을 404 상태로 제공

Worker 스크립트 없이 Cloudflare Static Assets가 파일을 직접 제공합니다. CPU 제한은 Worker 실행에 대한 설정이며, 정적 파일 제공 시 애플리케이션 Worker 코드가 실행되지는 않습니다.

배포 후 Cloudflare에서 `curma.cc` 도메인을 연결해 주세요. canonical과 sitemap은 `https://curma.cc/`를 기준으로 작성되어 있습니다. `ads.txt`만 설정되어 있으며 광고 스크립트와 광고 슬롯은 포함하지 않습니다.

공식 문서: [SvelteKit SSG](https://svelte.dev/docs/kit/adapter-static), [Cloudflare Static Assets](https://developers.cloudflare.com/workers/static-assets/), [Wrangler CPU 설정](https://developers.cloudflare.com/workers/wrangler/configuration/#limits).
