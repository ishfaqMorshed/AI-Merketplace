export type FallbackHero = {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
};

export type FallbackPricingTier = {
  id: string;
  name: string;
  price: string;
  updatedAt: string;
};

export type FallbackProduct = {
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

const timestamp = () => new Date().toISOString();

export const FALLBACK_HERO: FallbackHero = {
  id: 'hero',
  title: 'Transform Your Business with AI Solutions',
  subtitle:
    'Discover powerful AI tools designed for local businesses. From intelligent chatbots to automated recruiting systems, we have the solutions to streamline your operations.',
  updatedAt: timestamp(),
};

export const FALLBACK_PRICING: FallbackPricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$49/mo',
    updatedAt: timestamp(),
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$149/mo',
    updatedAt: timestamp(),
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Contact us',
    updatedAt: timestamp(),
  },
];

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
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
    createdAt: timestamp(),
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
    createdAt: timestamp(),
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
    createdAt: timestamp(),
  },
];
