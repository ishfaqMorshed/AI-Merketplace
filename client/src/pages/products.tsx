import React from "react";
import { useProductsQuery } from "@/lib/siteQueries";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

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
              className={`p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 cursor-pointer relative group ${isUpcoming ? 'opacity-80' : ''}`}
            >
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    // Fallback to default image if thumbnail fails to load
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
                  }}
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              
              <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
              
              {product.tag && (
                <Badge variant="secondary" className="mb-2">{product.tag}</Badge>
              )}
              
              <p className="text-muted-foreground text-center mb-4">{product.description}</p>
              
              {product.price && (
                <p className="font-bold text-lg mb-2">{product.price}</p>
              )}
              
              {isUpcoming && (
                <Badge className="absolute top-4 right-4 bg-yellow-400 text-black">Coming Soon</Badge>
              )}
              
              <div className="mt-auto">
                {isUpcoming ? (
                  <Button disabled className="bg-gray-300 text-gray-600 cursor-not-allowed">
                    Coming Soon
                  </Button>
                ) : (
                  <Link href={productLink}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Learn More
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
