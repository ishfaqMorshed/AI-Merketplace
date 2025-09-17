import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';

export function useHeroQuery() {
  return useQuery({
    queryKey: ['/api/hero'],
    queryFn: async () => {
      const res = await fetch('/api/hero');
      if (!res.ok) throw new Error('Failed to load hero');
      return res.json();
    },
  });
}

export function usePricingQuery() {
  return useQuery({
    queryKey: ['/api/pricing'],
    queryFn: async () => {
      const res = await fetch('/api/pricing');
      if (!res.ok) throw new Error('Failed to load pricing');
      return res.json();
    },
  });
}

export function useProductsQuery(options?: { status?: 'published' | 'upcoming' }) {
  const { status } = options || {};
  
  return useQuery({
    queryKey: status ? ['/api/products', { status }] : ['/api/products'],
    queryFn: async () => {
      const url = status ? `/api/products?status=${status}` : '/api/products';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load products');
      return res.json();
    },
  });
}

export function invalidateSiteQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ['/api/hero'] });
  queryClient.invalidateQueries({ queryKey: ['/api/pricing'] });
  queryClient.invalidateQueries({ queryKey: ['/api/products'] });
}

export type SiteQueryKeys = '/api/hero' | '/api/pricing' | '/api/products';
