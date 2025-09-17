import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const products = [
  {
    name: "AI Business Chatbot",
    description: "Intelligent chatbot for customer inquiries, inventory, and order management.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    link: "/chatbot-product",
    cta: "Learn More",
    comingSoon: false,
  },
  {
    name: "Automated Recruiting System",
    description: "AI-powered CV screening, parsing, and candidate scoring for streamlined hiring.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    link: "/recruiting-product",
    cta: "Learn More",
    comingSoon: false,
  },
  {
    name: "Next-gen AI Assistant",
    description: "A revolutionary AI assistant for your business. Stay tuned!",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    link: "#",
    cta: "Coming Soon",
    comingSoon: true,
  },
];

export default function ProductGrid() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">Our Products</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card
            key={product.name}
            className={`p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 cursor-pointer relative group ${product.comingSoon ? 'opacity-80' : ''}`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
            <p className="text-muted-foreground text-center mb-4">{product.description}</p>
            {product.comingSoon && (
              <Badge className="absolute top-4 right-4 bg-yellow-400 text-black">Coming Soon</Badge>
            )}
            <div className="mt-auto">
              {product.comingSoon ? (
                <Button disabled className="bg-gray-300 text-gray-600 cursor-not-allowed">{product.cta}</Button>
              ) : (
                <Link href={product.link}>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">{product.cta}</Button>
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
