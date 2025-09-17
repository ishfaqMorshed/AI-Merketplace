import React from "react";
import { useProductsQuery } from "@/lib/siteQueries";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check } from "lucide-react";
import type { Product } from "@shared/schema";
import chatbotBg from "@/assets/chatbot-bg.png";

// Helper function to get product link based on name
const getProductLink = (name: string): string => {
  const nameKey = name.toLowerCase();
  if (nameKey.includes('chatbot')) return '/chatbot-product';
  if (nameKey.includes('recruiting') || nameKey.includes('recruiter')) return '/recruiting-product';
  return '#'; // Default for upcoming products
};

export default function ProductGrid() {
  const { data: products, isLoading, error } = useProductsQuery();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Our Products</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>
              <div className="bg-gray-300 h-6 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded mb-4"></div>
              <div className="bg-gray-300 h-10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Our Products</h1>
        <p className="text-red-600">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Our Products</h1>
        <p className="text-muted-foreground">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">Our Products</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product: Product) => {
          const isUpcoming = product.status === 'upcoming';
          const productLink = getProductLink(product.name);
          
          return (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer relative group"
              data-testid={`product-card-${product.id}`}
            >
              {/* Header with background image */}
              <div 
                className="relative h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 overflow-hidden"
                style={{
                  backgroundImage: `url(${product.thumbnail || chatbotBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-blue-900/80"></div>
                
                {/* Coming Soon badge */}
                {isUpcoming && (
                  <Badge className="absolute top-3 right-3 bg-yellow-400 text-black border-0">
                    Coming Soon
                  </Badge>
                )}
              </div>
              
              {/* Card content */}
              <div className="p-6">
                {/* Product name and tags */}
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-gray-900 mb-2" data-testid={`product-name-${product.id}`}>
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm">
                    {product.tag && (
                      <Badge className="bg-cyan-100 text-cyan-800 border-0 text-xs px-2 py-1">
                        {product.tag}
                      </Badge>
                    )}
                    <span className="text-gray-600">• {isUpcoming ? 'Coming Soon' : 'Available Now'}</span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed" data-testid={`product-description-${product.id}`}>
                  {product.description}
                </p>
                
                {/* Features list */}
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* Footer with price and CTA */}
                <div className="flex items-center justify-between mt-6">
                  <div>
                    {product.price && (
                      <div className="text-left">
                        <div className="text-xs text-gray-500">Starting at</div>
                        <div className="text-2xl font-bold text-cyan-600" data-testid={`product-price-${product.id}`}>
                          {product.price}<span className="text-sm font-normal text-gray-500">/month</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    {isUpcoming ? (
                      <Button 
                        disabled 
                        className="bg-gray-300 text-gray-600 cursor-not-allowed border-0"
                        size="sm"
                      >
                        Coming Soon
                      </Button>
                    ) : (
                      <Link href={productLink}>
                        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white border-0">
                          Learn More
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
