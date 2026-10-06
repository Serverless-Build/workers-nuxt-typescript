import { defineEventHandler, setHeader } from 'h3';

export default defineEventHandler((event) => {
  setHeader(event, 'Cache-Control', 'no-store');
  setHeader(event, 'X-Content-Type-Options', 'nosniff');
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin');
  setHeader(event, 'Content-Security-Policy', 'frame-ancestors https: http://localhost:* http://127.0.0.1:*');
});
