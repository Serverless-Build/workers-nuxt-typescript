export default defineNuxtConfig({
  compatibilityDate: '2026-10-05',
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/style.css'],
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: { deployConfig: true, nodeCompat: true },
  },
});
