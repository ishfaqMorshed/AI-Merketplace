import React from "react";
import { useProductsQuery } from "@/lib/siteQueries";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, MessageSquare, Users, ArrowRight } from "lucide-react";
import type { Product } from "@shared/schema";
import chatbotBg from "@/assets/chatbot-bg.png";
import recruitingBg from "@/assets/recruiting-bg.png";

// Helper function to get product link based on name
const getProductLink = (name: string): string => {
  const nameKey = name.toLowerCase();
  if (nameKey.includes('chatbot')) return '/chatbot-product';
  if (nameKey.includes('recruiting') || nameKey.includes('recruiter')) return '/recruiting-product';
  return '#'; // Default for upcoming products
};

// Helper function to get product background image based on name
const getProductBackground = (name: string): string => {
  const nameKey = name.toLowerCase();
  if (nameKey.includes('chatbot')) return chatbotBg;
  if (nameKey.includes('recruiting') || nameKey.includes('recruiter')) return recruitingBg;
  return chatbotBg; // Default
};

// Helper function to get product icon based on name
const getProductIcon = (name: string) => {
  const nameKey = name.toLowerCase();
  if (nameKey.includes('chatbot')) return MessageSquare;
  if (nameKey.includes('recruiting') || nameKey.includes('recruiter')) return Users;
  return MessageSquare; // Default
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
      <div className="grid md:grid-cols-2 gap-8">
        {products.map((product: Product) => {
          const isUpcoming = product.status === 'upcoming';
          const productLink = getProductLink(product.name);
          const backgroundImage = product.thumbnail || getProductBackground(product.name);
          const IconComponent = getProductIcon(product.name);
          
          return (
            <Card
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
              data-testid={`product-card-${product.id}`}
            >
              {/* Header Image */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={backgroundImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                {/* Title with Icon */}
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900" data-testid={`product-name-${product.id}`}>
                    {product.name}
                  </h2>
                </div>
                
                {/* Tags */}
                <div className="flex items-center gap-2 mb-4">
                  {product.tag && (
                    <Badge className="bg-cyan-100 text-cyan-700 border-0 text-xs px-2 py-1 font-medium">
                      {product.tag}
                    </Badge>
                  )}
                  <Badge className="bg-gray-100 text-gray-600 border-0 text-xs px-2 py-1 font-medium">
                    {isUpcoming ? 'Coming Soon' : 'Real-time Integration'}
                  </Badge>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed" data-testid={`product-description-${product.id}`}>
                  {product.description}
                </p>
                
                {/* Features List */}
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4">
                  {/* Pricing */}
                  <div>
                    <div className="text-sm text-gray-600" data-testid={`product-price-${product.id}`}>
                      Starting at <span className="text-2xl font-bold text-cyan-500">{product.price}</span><span className="text-sm text-gray-500">/month</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div>
                    {isUpcoming ? (
                      <Button 
                        disabled 
                        className="bg-gray-300 text-gray-600 cursor-not-allowed px-6 py-2"
                      >
                        Coming Soon
                      </Button>
                    ) : (
                      <Link href={productLink}>
                        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2">
                          Learn More
                          <ArrowRight className="w-4 h-4" />
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
