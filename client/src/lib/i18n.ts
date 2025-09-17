export interface Translation {
  nav: {
    home: string;
    products: string;
    pricing: string;
    contact: string;
    getStarted: string;
  };
  hero: {
    title: string;
    subtitle: string;
    exploreProducts: string;
    bookDemo: string;
  };
  products: {
    title: string;
    subtitle: string;
    chatbot: {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      price: string;
      currency: string;
      learnMore: string;
    };
    recruiting: {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      price: string;
      currency: string;
      learnMore: string;
    };
  };
  demo: {
    title: string;
    subtitle: string;
    fullName: string;
    email: string;
    company: string;
    productInterest: string;
    cancel: string;
    book: string;
  };
  footer: {
    description: string;
    products: string;
    support: string;
    contact: string;
    copyright: string;
  };
}

const english: Translation = {
  nav: {
    home: "Home",
    products: "Products", 
    pricing: "Pricing",
    contact: "Contact",
    getStarted: "Get Started",
  },
  hero: {
    title: "Transform Your Business with AI Solutions",
    subtitle: "Discover powerful AI tools designed for local businesses. From intelligent chatbots to automated recruiting systems, we have the solutions to streamline your operations.",
    exploreProducts: "Explore Products",
    bookDemo: "Book a Demo",
  },
  products: {
    title: "Our AI Solutions",
    subtitle: "Choose from our cutting-edge AI products designed to revolutionize your business operations",
    chatbot: {
      title: "AI Business Chatbot",
      subtitle: "Most Popular • Real-time Integration",
      description: "Intelligent chatbot that handles customer inquiries, manages inventory, processes orders, and integrates with WhatsApp and Messenger for seamless customer service.",
      features: [
        "Real-time data responses",
        "Image query processing", 
        "Inventory management",
        "Multi-platform integration"
      ],
      price: "$299",
      currency: "/month",
      learnMore: "Learn More",
    },
    recruiting: {
      title: "Automated Recruiting System",
      subtitle: "Time Saver • AI-Powered Screening",
      description: "Streamline your hiring process with AI-powered CV screening, automatic parsing, keyword matching, and intelligent candidate qualification scoring.",
      features: [
        "Automated CV screening",
        "Smart data parsing",
        "Keyword matching & scoring",
        "Google Sheets integration"
      ],
      price: "$199",
      currency: "/month",
      learnMore: "Learn More",
    },
  },
  demo: {
    title: "Book Your Demo",
    subtitle: "Get a personalized demonstration of our AI solutions",
    fullName: "Full Name",
    email: "Email",
    company: "Company",
    productInterest: "Product Interest",
    cancel: "Cancel",
    book: "Book Demo",
  },
  footer: {
    description: "Empowering local businesses with cutting-edge AI technology.",
    products: "Products",
    support: "Support", 
    contact: "Contact",
    copyright: "© 2024 AI Solutions. All rights reserved.",
  },
};

const bangla: Translation = {
  nav: {
    home: "হোম",
    products: "পণ্য",
    pricing: "মূল্য",
    contact: "যোগাযোগ",
    getStarted: "শুরু করুন",
  },
  hero: {
    title: "AI সমাধান দিয়ে আপনার ব্যবসা রূপান্তরিত করুন",
    subtitle: "স্থানীয় ব্যবসার জন্য ডিজাইন করা শক্তিশালী AI টুলস আবিষ্কার করুন। বুদ্ধিমান চ্যাটবট থেকে স্বয়ংক্রিয় নিয়োগ সিস্টেম পর্যন্ত, আমাদের কাছে আপনার কার্যক্রম সুগম করার সমাধান রয়েছে।",
    exploreProducts: "পণ্য দেখুন",
    bookDemo: "ডেমো বুক করুন",
  },
  products: {
    title: "আমাদের AI সমাধান",
    subtitle: "আপনার ব্যবসায়িক কার্যক্রম বিপ্লব ঘটানোর জন্য ডিজাইন করা আমাদের অত্যাধুনিক AI পণ্য থেকে বেছে নিন",
    chatbot: {
      title: "AI ব্যবসায়িক চ্যাটবট",
      subtitle: "সর্বাধিক জনপ্রিয় • রিয়েল-টাইম ইন্টিগ্রেশন",
      description: "বুদ্ধিমান চ্যাটবট যা গ্রাহকের অনুসন্ধান পরিচালনা করে, ইনভেন্টরি পরিচালনা করে, অর্ডার প্রক্রিয়া করে এবং নিরবচ্ছিন্ন গ্রাহক সেবার জন্য WhatsApp এবং Messenger এর সাথে একীভূত হয়।",
      features: [
        "রিয়েল-টাইম ডেটা প্রতিক্রিয়া",
        "ছবির অনুসন্ধান প্রক্রিয়াকরণ",
        "ইনভেন্টরি ব্যবস্থাপনা",
        "মাল্টি-প্ল্যাটফর্ম ইন্টিগ্রেশন"
      ],
      price: "৳২৫,০০০",
      currency: "/মাস",
      learnMore: "আরও জানুন",
    },
    recruiting: {
      title: "স্বয়ংক্রিয় নিয়োগ সিস্টেম",
      subtitle: "সময় সাশ্রয়ী • AI-চালিত স্ক্রিনিং",
      description: "AI-চালিত CV স্ক্রিনিং, স্বয়ংক্রিয় পার্সিং, কীওয়ার্ড ম্যাচিং এবং বুদ্ধিমান প্রার্থী যোগ্যতা স্কোরিং দিয়ে আপনার নিয়োগ প্রক্রিয়া সুগম করুন।",
      features: [
        "স্বয়ংক্রিয় CV স্ক্রিনিং",
        "স্মার্ট ডেটা পার্সিং",
        "কীওয়ার্ড ম্যাচিং ও স্কোরিং",
        "Google Sheets ইন্টিগ্রেশন"
      ],
      price: "৳১৬,৫০০",
      currency: "/মাস",
      learnMore: "আরও জানুন",
    },
  },
  demo: {
    title: "আপনার ডেমো বুক করুন",
    subtitle: "আমাদের AI সমাধানের ব্যক্তিগতকৃত প্রদর্শনী পান",
    fullName: "পূর্ণ নাম",
    email: "ইমেইল",
    company: "কোম্পানি",
    productInterest: "পণ্যের আগ্রহ",
    cancel: "বাতিল",
    book: "ডেমো বুক করুন",
  },
  footer: {
    description: "অত্যাধুনিক AI প্রযুক্তি দিয়ে স্থানীয় ব্যবসাকে ক্ষমতায়ন।",
    products: "পণ্য",
    support: "সহায়তা",
    contact: "যোগাযোগ",
    copyright: "© ২০২৪ AI সমাধান। সর্বস্বত্ব সংরক্ষিত।",
  },
};

export const translations = {
  en: english,
  bn: bangla,
};

export type Language = keyof typeof translations;
