import { randomUUID } from 'crypto';
import {
  FALLBACK_HERO,
  FALLBACK_PRICING,
  FALLBACK_PRODUCTS,
  type FallbackHero,
  type FallbackPricingTier,
  type FallbackProduct,
} from '../shared/fallbackData';

type ProductUpdate = Partial<Omit<FallbackProduct, 'id' | 'createdAt'>>;

type HeroUpdate = Partial<Omit<FallbackHero, 'id' | 'updatedAt'>>;

type PricingUpdate = Partial<Omit<FallbackPricingTier, 'id' | 'updatedAt'>>;

const nowIso = () => new Date().toISOString();

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const fallbackState: {
  hero: FallbackHero;
  pricing: FallbackPricingTier[];
  products: FallbackProduct[];
} = {
  hero: { ...clone(FALLBACK_HERO) },
  pricing: clone(FALLBACK_PRICING),
  products: clone(FALLBACK_PRODUCTS),
};

export function getFallbackHero(): FallbackHero {
  return fallbackState.hero;
}

export function updateFallbackHero(update: HeroUpdate): FallbackHero {
  fallbackState.hero = {
    ...fallbackState.hero,
    ...update,
    updatedAt: nowIso(),
  };
  return fallbackState.hero;
}

export function listFallbackPricing(): FallbackPricingTier[] {
  return fallbackState.pricing;
}

export function updateFallbackPricing(
  id: string,
  update: PricingUpdate,
): FallbackPricingTier | undefined {
  const tier = fallbackState.pricing.find((item) => item.id === id);
  if (!tier) return undefined;
  Object.assign(tier, update);
  tier.updatedAt = nowIso();
  return tier;
}

export function listFallbackProducts(filter?: {
  status?: 'published' | 'upcoming';
  tag?: string;
}): FallbackProduct[] {
  let products = [...fallbackState.products];
  if (filter?.status) {
    products = products.filter((product) => product.status === filter.status);
  }
  if (filter?.tag) {
    const tagLower = filter.tag.toLowerCase();
    products = products.filter((product) =>
      (product.tag ?? '').toLowerCase().includes(tagLower),
    );
  }
  return products;
}

export function createFallbackProduct(
  data: Omit<FallbackProduct, 'id' | 'createdAt'>,
): FallbackProduct {
  const product: FallbackProduct = {
    ...data,
    id: randomUUID(),
    createdAt: nowIso(),
  };
  fallbackState.products.push(product);
  return product;
}

export function updateFallbackProduct(
  id: string,
  update: ProductUpdate,
): FallbackProduct | undefined {
  const product = fallbackState.products.find((item) => item.id === id);
  if (!product) return undefined;
  Object.assign(product, update);
  return product;
}

export function deleteFallbackProduct(id: string): boolean {
  const index = fallbackState.products.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }
  fallbackState.products.splice(index, 1);
  return true;
}

export type { FallbackProduct, ProductUpdate };
