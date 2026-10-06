import { defineEventHandler, getMethod, setHeader, setResponseStatus } from 'h3';

export default defineEventHandler((event) => {
  if (!['GET', 'HEAD'].includes(getMethod(event))) {
    setResponseStatus(event, 405); setHeader(event, 'Allow', 'GET, HEAD');
    return { error: 'Method not allowed.' };
  }
  return { ok: true, framework: 'Nuxt', marker: 'SERVERLESS_BUILD_NUXT_TYPESCRIPT_V1' };
});
