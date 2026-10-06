import { defineEventHandler, getMethod, getRequestURL, setHeader, setResponseStatus } from 'h3';
import { calculateQuote } from '../../shared/quote';

export default defineEventHandler((event) => {
  if (!['GET', 'HEAD'].includes(getMethod(event))) {
    setResponseStatus(event, 405); setHeader(event, 'Allow', 'GET, HEAD');
    return { error: 'Method not allowed.' };
  }
  const result = calculateQuote(getRequestURL(event).searchParams);
  if ('error' in result) setResponseStatus(event, 400);
  return result;
});
