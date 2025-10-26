import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';
import {
  FALLBACK_HERO,
  FALLBACK_PRICING,
  FALLBACK_PRODUCTS,
  type FallbackHero,
  type FallbackPricingTier,
  type FallbackProduct,
} from '@shared/fallbackData';
import { withApiBase } from '@/lib/apiBase';

const warnOnce = new Set<string>();

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

async function fetchJsonWithFallback<T>(path: string, fallback: T): Promise<T> {
  const url = withApiBase(path);
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (error) {
    if (!warnOnce.has(path)) {
      console.warn(
        `[siteQueries] Falling back to static data for ${path}. Configure VITE_API_BASE_URL to point to a running backend to disable this fallback.`,
        error,
      );
      warnOnce.add(path);
    }
    return clone(fallback);
  }
}

export function useHeroQuery() {
  return useQuery({
    queryKey: ['/api/hero'],
    queryFn: () => fetchJsonWithFallback<FallbackHero>('/api/hero', FALLBACK_HERO),
  });
}

export function usePricingQuery() {
  return useQuery({
    queryKey: ['/api/pricing'],
    queryFn: () =>
      fetchJsonWithFallback<FallbackPricingTier[]>(
        '/api/pricing',
        FALLBACK_PRICING,
      ),
  });
}

export function useProductsQuery(options?: { status?: 'published' | 'upcoming' }) {
  const { status } = options || {};

  return useQuery({
    queryKey: status ? ['/api/products', { status }] : ['/api/products'],
    queryFn: async () => {
      const url = status ? `/api/products?status=${status}` : '/api/products';
      const data = await fetchJsonWithFallback<FallbackProduct[]>(
        url,
        FALLBACK_PRODUCTS,
      );
      if (status) {
        return data.filter((product) => product.status === status);
      }
      return data;
    },
  });
}

export function invalidateSiteQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ['/api/hero'] });
  queryClient.invalidateQueries({ queryKey: ['/api/pricing'] });
  queryClient.invalidateQueries({ queryKey: ['/api/products'] });
}

export type SiteQueryKeys = '/api/hero' | '/api/pricing' | '/api/products';
