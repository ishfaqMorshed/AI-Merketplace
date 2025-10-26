const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').trim();

const normalizedBaseUrl = rawBaseUrl.endsWith('/')
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

export const API_BASE_URL = normalizedBaseUrl;

export const isApiConfigured = normalizedBaseUrl.length > 0;

export function withApiBase(path: string): string {
  if (!path.startsWith('/')) {
    throw new Error(`API paths must start with "/". Received: ${path}`);
  }
  return normalizedBaseUrl ? `${normalizedBaseUrl}${path}` : path;
}
