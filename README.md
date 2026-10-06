# Nuxt on Workers

Nuxt 4 and Vue SSR, hydrated composables, server-fetched request data, and typed Nitro API routes through the module-Worker preset.

## Run and deploy

Use Node.js 22.22+ within the 22.x line, Node 24.11+, or Node 26+. `.node-version` pins the tested Node 24.21.0 toolchain.

```sh
npm ci
npm run dev
```

```sh
npm run check
npm run bundle
npm run start
```

`check` prepares Nuxt and Workers types, checks Vue/TypeScript, builds the app, and performs a Wrangler dry run. `bundle` writes a self-contained Worker to `.output/worker-bundle`. `start` runs the built app in a local Workers runtime. Log in with Wrangler, select your account, and run `npm run deploy`.

Nitro's `cloudflare_module` preset builds `.output/server/index.mjs` and `.output/public`. The portable configuration supplies the `ASSETS` Static Assets binding. `.nuxt/`, `.output/`, generated types, and dependencies are excluded from published source.

## Try it

- Open `/`. `useFetch` retrieves request-time data during SSR; refreshing generates a new timestamp and resets the hydrated Vue counter.
- Submit the quote form. `$fetch` calls the real Nitro API, and displays the server's result or validation error.
- `GET /api/health` checks liveness.
- `GET /api/quote?quantity=3&unit_price_cents=250` returns 750 cents in USD. Quantity must be one integer 1–100; unit price one integer 1–1000000. Missing, duplicate, decimal, and out-of-range inputs return 400.
- `/robots.txt` and `/_nuxt/` JS/CSS come from Workers Static Assets.

The example is stateless, uses `no-store` for request-time responses, and permits HTTPS embedding and loopback development. It runs SSR on Workers and does not require NuxtHub storage.

See [Nuxt on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/) and the [Nitro 2 Cloudflare preset](https://v2.nitro.build/deploy/providers/cloudflare).

## Pattern and live demo

- [Pattern page](https://serverless.build/patterns/nuxt-workers)
- [Live deployment](https://workers-nuxt-typescript.dwarven.workers.dev)
