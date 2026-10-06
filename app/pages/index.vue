<script setup lang="ts">
import type { QuoteResult } from '../../shared/quote';

useHead({ title: 'Nuxt on Workers', htmlAttrs: { lang: 'en' } });
const { data: requestData } = await useFetch('/api/request');
const count = ref(0);
const quantity = ref('3');
const unitPrice = ref('250');
const pending = ref(false);
const result = ref<QuoteResult>();

async function calculate() {
  pending.value = true;
  try {
    result.value = await $fetch<QuoteResult>('/api/quote', { query: { quantity: quantity.value, unit_price_cents: unitPrice.value } });
  } catch (error) {
    const failure = error as { data?: QuoteResult };
    result.value = failure.data && 'error' in failure.data ? failure.data : { error: 'The server could not calculate the quote. Please try again.' };
  } finally { pending.value = false; }
}
</script>

<template>
  <main>
    <header><span class="badge">Nuxt · Cloudflare Workers</span><h1>Vue, on the server.<br /><em>Nuxt, at the edge.</em></h1><p class="intro">Vue server rendering, hydrated composables, and a real Nitro API deployed together on Workers.</p></header>
    <div class="grid">
      <section><span class="step">01 / Server-fetched data</span><h2>Your page starts on a Worker.</h2><p>Nuxt fetches request data during SSR and transfers it to the browser. Refresh to see a new timestamp.</p><time :datetime="requestData?.renderedAt">{{ requestData?.renderedAt }}</time><p class="muted">Cloudflare Workers · no-store</p></section>
      <section><span class="step">02 / Hydrated Vue</span><h2>Reactivity in your browser.</h2><p>This ref-backed counter is local to your browser and resets on refresh.</p><button type="button" @click="count++">Count: {{ count }}</button></section>
      <section class="wide"><span class="step">03 / Nitro server route</span><h2>Ask the API for a quote.</h2><p>A typed Nitro handler validates inputs and calculates the total on the Worker.</p>
        <form @submit.prevent="calculate"><label>Quantity<input v-model="quantity" name="quantity" type="number" min="1" max="100" step="1" required /></label><label>Unit price (cents)<input v-model="unitPrice" name="unit_price_cents" type="number" min="1" max="1000000" step="1" required /></label><button :disabled="pending">{{ pending ? 'Calculating…' : 'Calculate a quote' }}</button></form>
        <output id="result" aria-live="polite">{{ result ? 'error' in result ? result.error : `${result.total_cents} cents · ${result.currency}` : 'Your server-calculated quote will appear here.' }}</output>
      </section>
    </div><footer>Nuxt + Vue + Nitro · Workers Static Assets · <a href="/api/health">Health</a> · <a href="/api/quote?quantity=3&amp;unit_price_cents=250">JSON API</a></footer>
  </main>
</template>
