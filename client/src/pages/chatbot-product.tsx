import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Database, Image, ShoppingCart } from 'lucide-react';
import { ChatDemo } from '@/components/chat-demo';
import { DemoModal } from '@/components/demo-modal';
import { FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa';
import { Globe } from 'lucide-react';

export default function ChatbotProduct() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link href="/products">
              <span className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6" data-testid="link-back-home"><ArrowLeft className="h-4 w-4" /> Back to Products</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-product-title">
              AI Business Chatbot
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-product-subtitle">
              Transform customer interactions with our intelligent chatbot that understands your business, manages inventory, and processes orders seamlessly across multiple platforms.
            </p>
          </div>

          {/* Live Demo Section */}
          <Card className="p-8 mb-12 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center" data-testid="text-demo-title">Try Our Live Demo</h3>
            <ChatDemo />
          </Card>

          {/* Integration Platforms */}
          <Card className="p-8 mb-12 shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-center" data-testid="text-integration-title">Multi-Platform Integration</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow" data-testid="card-whatsapp">
                <FaWhatsapp className="text-4xl text-green-500 mb-4 mx-auto" />
                <h4 className="font-semibold mb-2">WhatsApp Business</h4>
                <p className="text-sm text-muted-foreground">Seamless integration with WhatsApp for customer support</p>
              </div>
              <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow" data-testid="card-messenger">
                <FaFacebookMessenger className="text-4xl text-blue-500 mb-4 mx-auto" />
                <h4 className="font-semibold mb-2">Facebook Messenger</h4>
                <p className="text-sm text-muted-foreground">Connect with customers through Messenger platform</p>
              </div>
              <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow" data-testid="card-website">
                <Globe className="h-10 w-10 text-primary mb-4 mx-auto" />
                <h4 className="font-semibold mb-2">Website Widget</h4>
                <p className="text-sm text-muted-foreground">Embed directly on your website for instant support</p>
              </div>
            </div>
          </Card>

          {/* AI Agent in Action Section */}
          <Card className="p-8 mb-12 shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-center" data-testid="text-ai-action-title">See AI Agent in Action</h3>
            
            {/* Text Responses */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-6">Smart Text Responses</h4>
                <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-gray-900 to-gray-700 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2rem] relative overflow-hidden">
                    {/* iPhone Status Bar */}
                    <div className="bg-black text-white text-xs py-1 px-4 flex justify-between items-center">
                      <span>9:41</span>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                      <span>100%</span>
                    </div>
                    
                    {/* Chat Interface */}
                    <div className="p-4 h-full bg-gradient-to-b from-blue-50 to-white">
                      <div className="text-center mb-4">
                        <h5 className="font-semibold text-lg">TechStore Support</h5>
                        <p className="text-xs text-gray-500">Online now</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-end">
                          <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%] text-sm">
                            Do you have iPhone 15 in stock?
                          </div>
                        </div>
                        
                        <div className="flex justify-start">
                          <div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-[80%] text-sm">
                            Yes! We have 12 iPhone 15 units in stock. Available colors: Blue, Pink, Yellow, Green, Black. Price: $799. Would you like to place an order?
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%] text-sm">
                            Yes, I want the blue one
                          </div>
                        </div>
                        
                        <div className="flex justify-start">
                          <div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-[80%] text-sm">
                            Perfect! I can help you order the iPhone 15 in Blue. Please provide your name and delivery address.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Instant responses with real inventory data and order processing
                </p>
              </div>
              
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-6">Image Analysis</h4>
                <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-gray-900 to-gray-700 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2rem] relative overflow-hidden">
                    {/* iPhone Status Bar */}
                    <div className="bg-black text-white text-xs py-1 px-4 flex justify-between items-center">
                      <span>9:41</span>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                      <span>100%</span>
                    </div>
                    
                    {/* Chat Interface */}
                    <div className="p-4 h-full bg-gradient-to-b from-blue-50 to-white">
                      <div className="text-center mb-4">
                        <h5 className="font-semibold text-lg">TechStore Support</h5>
                        <p className="text-xs text-gray-500">Online now</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-end">
                          <div className="bg-blue-500 text-white rounded-lg p-2 max-w-[80%]">
                            <img 
                              src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=150&h=100&fit=crop" 
                              alt="Laptop image" 
                              className="rounded w-full h-20 object-cover mb-2"
                            />
                            <p className="text-sm">What laptop is this?</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-start">
                          <div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-[80%] text-sm">
                            I can see this is a MacBook Pro. Based on the image, it appears to be a 14" or 16" model. We have similar MacBook Pro models in stock starting at $1,999. Would you like details on our current inventory?
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%] text-sm">
                            Yes, show me the 14" models
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  AI analyzes images and provides accurate product information
                </p>
              </div>
            </div>
            
            {/* WhatsApp and Messenger Integration */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
                  <FaWhatsapp className="text-green-500" />
                  WhatsApp Integration
                </h4>
                <div className="relative mx-auto w-80 h-[400px] bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl p-4 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-xl relative overflow-hidden">
                    {/* Computer Screen Mockup */}
                    <div className="bg-green-600 text-white p-3 text-center">
                      <h5 className="font-semibold">WhatsApp Business Dashboard</h5>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                        <p className="text-sm font-semibold text-green-800">Customer: +1 555-0123</p>
                        <p className="text-sm text-gray-700">"Hi, do you deliver to Brooklyn?"</p>
                      </div>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                        <p className="text-sm font-semibold text-blue-800">AI Agent Response:</p>
                        <p className="text-sm text-gray-700">"Yes! We deliver to Brooklyn. Delivery is free for orders over $50 and typically takes 2-3 business days. Would you like to place an order?"</p>
                      </div>
                      
                      <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                        <p className="text-sm font-semibold text-green-800">Customer: +1 555-0123</p>
                        <p className="text-sm text-gray-700">"Perfect! I need a wireless mouse"</p>
                      </div>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                        <p className="text-sm font-semibold text-blue-800">AI Agent Response:</p>
                        <p className="text-sm text-gray-700">"Great choice! We have several wireless mice in stock: Logitech MX Master 3 ($99), Apple Magic Mouse ($79), Microsoft Surface Mouse ($59). Which one interests you?"</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Seamless WhatsApp integration with automated customer support
                </p>
              </div>
              
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
                  <FaFacebookMessenger className="text-blue-500" />
                  Messenger Integration
                </h4>
                <div className="relative mx-auto w-80 h-[400px] bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl p-4 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-xl relative overflow-hidden">
                    {/* Computer Screen Mockup */}
                    <div className="bg-blue-600 text-white p-3 text-center">
                      <h5 className="font-semibold">Facebook Business Dashboard</h5>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
                        <p className="text-sm font-semibold text-purple-800">Sarah Johnson</p>
                        <p className="text-sm text-gray-700">"What are your business hours?"</p>
                      </div>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                        <p className="text-sm font-semibold text-blue-800">AI Agent Response:</p>
                        <p className="text-sm text-gray-700">"We're open Monday-Friday 9AM-6PM EST, and Saturday 10AM-4PM EST. We're closed on Sundays. Our online store is available 24/7 for orders!"</p>
                      </div>
                      
                      <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
                        <p className="text-sm font-semibold text-purple-800">Sarah Johnson</p>
                        <p className="text-sm text-gray-700">"Do you have any deals on headphones?"</p>
                      </div>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                        <p className="text-sm font-semibold text-blue-800">AI Agent Response:</p>
                        <p className="text-sm text-gray-700">"Yes! We currently have 20% off all Sony headphones and 15% off Bose models. The Sony WH-1000XM5 is now $279 (down from $349). Would you like to hear about more deals?"</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Facebook Messenger integration with intelligent conversation flow
                </p>
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 hover:shadow-lg transition-shadow" data-testid="card-feature-realtime">
              <Database className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-semibold mb-3">Real-time Data Integration</h4>
              <p className="text-sm text-muted-foreground">Connects to your database for live inventory updates and customer information</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow" data-testid="card-feature-image">
              <Image className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-semibold mb-3">Image Processing</h4>
              <p className="text-sm text-muted-foreground">Analyzes product images and provides detailed information and recommendations</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow" data-testid="card-feature-orders">
              <ShoppingCart className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-semibold mb-3">Order Management</h4>
              <p className="text-sm text-muted-foreground">Processes orders directly and updates your Excel sheets automatically</p>
            </Card>
          </div>

          {/* Pricing */}
          <Card className="p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-6" data-testid="text-pricing-title">Choose Your Plan</h3>
            <div className="inline-block bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-8">
              <h4 className="text-xl font-bold mb-2">Professional Plan</h4>
              <div className="text-4xl font-bold mb-4" data-testid="text-pricing-amount">
                $299
                <span className="text-lg font-normal">/month</span>
              </div>
              <Button 
                onClick={() => setShowDemoModal(true)}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                data-testid="button-get-started"
              >
                Book Demo & Get Started
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <DemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
}
