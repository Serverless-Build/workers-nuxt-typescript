import { defineEventHandler } from 'h3';

export default defineEventHandler(() => ({ renderedAt: new Date().toISOString(), runtime: 'Cloudflare Workers' }));
