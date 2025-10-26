import { randomUUID } from 'crypto';

type FallbackHero = {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
};

type FallbackPricingTier = {
  id: string;
  name: string;
  price: string;
  updatedAt: string;
};

type FallbackProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  tag: string | null;
  status: 'published' | 'upcoming';
  thumbnail: string | null;
  features: string[] | null;
  createdAt: string;
};

type ProductUpdate = Partial<Omit<FallbackProduct, 'id' | 'createdAt'>>;

type HeroUpdate = Partial<Omit<FallbackHero, 'id' | 'updatedAt'>>;

type PricingUpdate = Partial<Omit<FallbackPricingTier, 'id' | 'updatedAt'>>;

const nowIso = () => new Date().toISOString();

const fallbackState: {
  hero: FallbackHero;
  pricing: FallbackPricingTier[];
  products: FallbackProduct[];
} = {
  hero: {
    id: 'hero',
    title: 'Transform Your Business with AI Solutions',
    subtitle:
      'Discover powerful AI tools designed for local businesses. From intelligent chatbots to automated recruiting systems, we have the solutions to streamline your operations.',
    updatedAt: nowIso(),
  },
  pricing: [
    {
      id: 'starter',
      name: 'Starter',
      price: '$49/mo',
      updatedAt: nowIso(),
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '$149/mo',
      updatedAt: nowIso(),
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Contact us',
      updatedAt: nowIso(),
    },
  ],
  products: [
    {
      id: 'ai-chatbot',
      name: 'AI Customer Support Chatbot',
      description:
        'Deploy a multilingual AI chatbot that understands customer intents, integrates with your knowledge base, and escalates seamlessly to humans when needed.',
      price: '$199/mo',
      tag: 'featured',
      status: 'published',
      thumbnail: null,
      features: [
        'Instant web & WhatsApp integration',
        'Custom knowledge base ingestion',
        'Detailed analytics dashboard',
      ],
      createdAt: nowIso(),
    },
    {
      id: 'recruiting-assistant',
      name: 'AI Recruiting Assistant',
      description:
        'Automate candidate sourcing, screening, and interview scheduling with an AI assistant trained on your hiring criteria.',
      price: '$299/mo',
      tag: 'hr',
      status: 'published',
      thumbnail: null,
      features: [
        'Automated resume parsing',
        'Conversational candidate screening',
        'ATS integrations',
      ],
      createdAt: nowIso(),
    },
    {
      id: 'ai-analytics',
      name: 'AI Insights & Analytics',
      description:
        'Connect your data sources and get AI generated insights, weekly executive summaries, and anomaly alerts.',
      price: '$499/mo',
      tag: 'analytics',
      status: 'upcoming',
      thumbnail: null,
      features: [
        'Unified business dashboards',
        'Automated KPI commentary',
        'Forecasting & anomaly detection',
      ],
      createdAt: nowIso(),
    },
  ],
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
