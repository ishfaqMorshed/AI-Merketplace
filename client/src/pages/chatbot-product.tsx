import { useState, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Database, Image, ShoppingCart, Play, Pause, CheckCircle, MessageSquare, Globe } from 'lucide-react';
import { ChatDemo } from '@/components/chat-demo';
import { DemoModal } from '@/components/demo-modal';
import { FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

interface TimelineItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: () => JSX.Element;
  features: string[];
  icon: any;
  color: string;
}

export default function ChatbotProduct() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleTimelineNavigation = (step: number) => {
    setActiveStep(step);
    timelineRefs.current[step - 1]?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playTimeline();
    }
  };

  const playTimeline = () => {
    let currentStep = activeStep;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep > timelineData.length) {
        currentStep = 1;
      }
      setActiveStep(currentStep);
      timelineRefs.current[currentStep - 1]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      if (currentStep === timelineData.length) {
        setTimeout(() => {
          setIsPlaying(false);
          clearInterval(interval);
        }, 3000);
      }
    }, 4000);
  };

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: "Live Interactive Demo",
      subtitle: "Experience our AI chatbot in action",
      description: "Try our chatbot yourself and see how it responds to real questions, processes orders, and provides intelligent customer support with natural language understanding.",
      content: () => (
        <Card className="p-8 shadow-lg bg-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Try Our Live Demo</h3>
          <ChatDemo />
        </Card>
      ),
      features: [
        "Natural language conversation processing",
        "Real-time response generation",
        "Context-aware dialogue management",
        "Product inquiry handling",
        "Order processing capabilities",
        "Multi-language support"
      ],
      icon: MessageSquare,
      color: "blue"
    },
    {
      id: 2,
      title: "Multi-Platform Integration",
      subtitle: "Connect seamlessly across all your channels",
      description: "Deploy your AI chatbot across WhatsApp Business, Facebook Messenger, and your website with a single setup. Maintain consistent customer experience everywhere.",
      content: () => (
        <Card className="p-8 shadow-lg bg-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Multi-Platform Integration</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
              <FaWhatsapp className="text-4xl text-green-500 mb-4 mx-auto" />
              <h4 className="font-semibold mb-2">WhatsApp Business</h4>
              <p className="text-sm text-muted-foreground">Seamless integration with WhatsApp for customer support</p>
            </div>
            <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
              <FaFacebookMessenger className="text-4xl text-blue-500 mb-4 mx-auto" />
              <h4 className="font-semibold mb-2">Facebook Messenger</h4>
              <p className="text-sm text-muted-foreground">Connect with customers through Messenger platform</p>
            </div>
            <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
              <Globe className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h4 className="font-semibold mb-2">Website Widget</h4>
              <p className="text-sm text-muted-foreground">Embed directly on your website for instant support</p>
            </div>
          </div>
        </Card>
      ),
      features: [
        "WhatsApp Business API integration",
        "Facebook Messenger automation",
        "Website widget embed code",
        "Unified conversation management",
        "Cross-platform synchronization",
        "Single dashboard control"
      ],
      icon: Globe,
      color: "green"
    },
    {
      id: 3,
      title: "AI Agent in Action",
      subtitle: "Smart text responses and image analysis",
      description: "Watch how our AI handles real customer interactions with intelligent text responses and advanced image recognition for product identification and recommendations.",
      content: () => (
        <Card className="p-8 shadow-lg bg-white">
          <h3 className="text-2xl font-bold mb-8 text-center">See AI Agent in Action</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-6">Smart Text Responses</h4>
              <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-gray-900 to-gray-700 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] relative overflow-hidden">
                  <div className="bg-black text-white text-xs py-1 px-4 flex justify-between items-center">
                    <span>9:41</span>
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <span>100%</span>
                  </div>
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
                  <div className="bg-black text-white text-xs py-1 px-4 flex justify-between items-center">
                    <span>9:41</span>
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <span>100%</span>
                  </div>
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
        </Card>
      ),
      features: [
        "Real-time inventory integration",
        "Natural language processing",
        "Image recognition and analysis",
        "Product identification",
        "Automated order processing",
        "Context-aware responses"
      ],
      icon: Image,
      color: "purple"
    },
    {
      id: 4,
      title: "Platform Integration Details",
      subtitle: "WhatsApp and Messenger dashboard integration",
      description: "See how our system integrates with your business platforms, providing seamless customer support across WhatsApp Business and Facebook Messenger with unified management.",
      content: () => (
        <Card className="p-8 shadow-lg bg-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Platform Integration Details</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
                <FaWhatsapp className="text-green-500" />
                WhatsApp Integration
              </h4>
              <div className="relative mx-auto w-80 h-[400px] bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl p-4 shadow-2xl">
                <div className="w-full h-full bg-white rounded-xl relative overflow-hidden">
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
      ),
      features: [
        "WhatsApp Business API connectivity",
        "Facebook Messenger automation",
        "Unified conversation management",
        "Real-time customer support",
        "Automated response generation",
        "Cross-platform synchronization"
      ],
      icon: FaWhatsapp,
      color: "cyan"
    },
    {
      id: 5,
      title: "Core Features & Pricing",
      subtitle: "Complete feature set and transparent pricing",
      description: "Explore our comprehensive feature set including real-time data integration, advanced image processing, and automated order management, plus our competitive pricing structure.",
      content: () => (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Database className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-semibold mb-3">Real-time Data Integration</h4>
              <p className="text-sm text-muted-foreground">Connects to your database for live inventory updates and customer information</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Image className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-semibold mb-3">Image Processing</h4>
              <p className="text-sm text-muted-foreground">Analyzes product images and provides detailed information and recommendations</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <ShoppingCart className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-semibold mb-3">Order Management</h4>
              <p className="text-sm text-muted-foreground">Processes orders directly and updates your Excel sheets automatically</p>
            </Card>
          </div>

          <Card className="p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-6">Choose Your Plan</h3>
            <div className="inline-block bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-8">
              <h4 className="text-xl font-bold mb-2">Professional Plan</h4>
              <div className="text-4xl font-bold mb-4">
                $299
                <span className="text-lg font-normal">/month</span>
              </div>
              <Button 
                onClick={() => setShowDemoModal(true)}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Book Demo & Get Started
              </Button>
            </div>
          </Card>
        </div>
      ),
      features: [
        "Real-time database connectivity",
        "Advanced image analysis",
        "Automated order processing",
        "Excel integration",
        "24/7 customer support",
        "Enterprise-grade security"
      ],
      icon: ShoppingCart,
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link href="/products">
              <span className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors" data-testid="link-back-home">
                <ArrowLeft className="h-4 w-4" /> Back to Products
              </span>
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6" 
              data-testid="text-product-title"
            >
              AI Business Chatbot
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" 
              data-testid="text-product-subtitle"
            >
              Transform customer interactions with our intelligent chatbot that understands your business, manages inventory, and processes orders seamlessly across multiple platforms.
            </motion.p>
            
            {/* Interactive Timeline Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center items-center gap-4 mb-12"
            >
              <Button
                onClick={handlePlayPause}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                data-testid="button-play-timeline"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pause Tour' : 'Start Interactive Tour'}
              </Button>
              <Button
                onClick={() => setShowDemoModal(true)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-medium"
                data-testid="button-book-demo"
              >
                Book a Demo
              </Button>
            </motion.div>

            {/* Timeline Step Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center items-center gap-4 mb-8"
            >
              {timelineData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleTimelineNavigation(item.id)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    activeStep === item.id 
                      ? `bg-${item.color}-600 border-${item.color}-600 text-white` 
                      : `border-gray-300 text-gray-400 hover:border-${item.color}-400 hover:text-${item.color}-600`
                  }`}
                  data-testid={`timeline-step-${item.id}`}
                >
                  <item.icon className="w-5 h-5" />
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {timelineData.map((item, index) => {
              const ref = useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, { amount: 0.3 });
              
              return (
                <motion.div
                  key={item.id}
                  ref={(el) => {
                    timelineRefs.current[index] = el;
                    (ref as any).current = el;
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex gap-12 items-center`}
                  data-testid={`timeline-item-${item.id}`}
                >
                  {/* Timeline Line */}
                  <div className="hidden lg:block absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-gray-200 to-gray-300 transform -translate-x-1/2" />
                  
                  {/* Timeline Node */}
                  <motion.div 
                    animate={activeStep === item.id ? { scale: 1.2, backgroundColor: `rgb(${item.color === 'blue' ? '37, 99, 235' : item.color === 'green' ? '34, 197, 94' : item.color === 'purple' ? '147, 51, 234' : item.color === 'cyan' ? '6, 182, 212' : '249, 115, 22'})` } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`hidden lg:block absolute left-1/2 top-1/2 w-12 h-12 bg-${item.color}-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center shadow-lg`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 max-w-lg">
                    <Card className={`p-8 shadow-xl border-l-4 border-l-${item.color}-600 hover:shadow-2xl transition-all duration-300`}>
                      <div className={`inline-flex items-center gap-2 bg-${item.color}-100 text-${item.color}-700 px-3 py-1 rounded-full text-sm font-medium mb-4`}>
                        <item.icon className="w-4 h-4" />
                        Step {item.id}
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{item.title}</h3>
                      <p className={`text-${item.color}-600 font-medium mb-4`}>{item.subtitle}</p>
                      <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                      <div className="space-y-3">
                        {item.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className={`w-5 h-5 text-${item.color}-600 mt-0.5 flex-shrink-0`} />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Interactive Content */}
                  <div className="flex-1 max-w-2xl">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative rounded-xl overflow-hidden"
                    >
                      {item.content()}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your Customer Support?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Start engaging customers intelligently across all platforms with our AI chatbot.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => setShowDemoModal(true)}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-medium rounded-lg"
              data-testid="button-cta-demo"
            >
              Book a Free Demo
            </Button>
            <Link href="/products">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-medium rounded-lg"
                data-testid="button-cta-products"
              >
                View All Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <DemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
}