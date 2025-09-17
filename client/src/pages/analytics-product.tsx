import { useState, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, CheckCircle, TrendingUp, BarChart3, MessageSquare, Phone, Users, Facebook, Instagram, Twitter } from 'lucide-react';
import { DemoModal } from '@/components/demo-modal';
import { motion, useInView } from 'framer-motion';
import analyticsOverview from '@/assets/analytics-dashboard-overview.png';
import analyticsVoice from '@/assets/analytics-voice-support.png';
import analyticsSocial from '@/assets/analytics-social-media.png';
import analyticsDashboard from '@/assets/analytics-dashboard.png';

interface TimelineItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  icon: any;
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "AI-Powered Services",
    subtitle: "Intelligent automation with OpenAI GPT-4 and advanced AI capabilities",
    description: "Experience next-generation customer service with AI responses, voice support, and image recognition. Our system uses OpenAI GPT-4 for auto-replies with translation and sentiment analysis, plus Twilio integration for voice calls and transcription.",
    image: analyticsOverview,
    features: [
      "AI Responses: Auto-replies using OpenAI GPT-4 with translation and sentiment analysis",
      "Voice Support: Voice calls, transcription, and text-to-speech integration with Twilio",
      "Image Recognition: AI-powered analysis of images for product inquiries",
      "Real-time conversation tracking (1,248 total conversations)",
      "Order processing analytics (847 orders processed)",
      "Multi-platform performance monitoring with live notifications"
    ],
    icon: BarChart3,
    color: "blue"
  },
  {
    id: 2,
    title: "Multi-Platform Integration",
    subtitle: "Seamless connectivity across all your business channels",
    description: "Connect and automate responses across social media platforms, e-commerce sites, and communication channels. Manage orders in real-time across all platforms with intelligent routing and response automation.",
    image: analyticsVoice,
    features: [
      "Social Media: Automated responses and engagement tracking for Facebook, WhatsApp, and more",
      "Order Management: Real-time order updates across all e-commerce platforms",
      "WhatsApp Business API integration with automated responses",
      "Facebook Messenger automation and engagement tracking",
      "Website widget with live chat capabilities",
      "E-commerce platform synchronization (Shopify, WooCommerce, etc.)"
    ],
    icon: Phone,
    color: "green"
  },
  {
    id: 3,
    title: "Real-Time Communication",
    subtitle: "Instant notifications and automated customer engagement",
    description: "Never miss a customer interaction with instant notifications, live updates, and immediate auto-responses. Our system ensures 24/7 customer engagement with context-aware replies and real-time tracking.",
    image: analyticsSocial,
    features: [
      "Instant Notifications: Live updates for messages, comments, and orders",
      "Auto-Responses: Immediate replies to customer inquiries",
      "Real-time engagement tracking (2.4K total interactions)",
      "Sentiment analysis and customer satisfaction monitoring (4.2/5 score)",
      "Response time optimization (average 1.3s response time)",
      "Live chat interface with AI-powered suggestions"
    ],
    icon: Users,
    color: "purple"
  },
  {
    id: 4,
    title: "AI Automation & Security",
    subtitle: "Smart insights with enterprise-grade security and scalability",
    description: "Get comprehensive analytics and insights while maintaining top-level security. Our system provides real-time performance tracking, customer satisfaction metrics, and ROI analysis with JWT authentication and encrypted data.",
    image: analyticsDashboard,
    features: [
      "Smart Responses: Context-aware replies to customer queries",
      "Analytics: Real-time tracking of performance, customer satisfaction, and ROI",
      "Security: JWT authentication and encrypted data protection",
      "Scalability: Modular and production-ready architecture",
      "Revenue generation tracking ($12,450 generated, +18.3%)",
      "AI success rate monitoring (94.2% automation success rate)"
    ],
    icon: TrendingUp,
    color: "orange"
  }
];

export default function AnalyticsProduct() {
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
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link href="/products">
              <span className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors" data-testid="link-back-home">
                <ArrowLeft className="h-4 w-4" /> Back to Products
              </span>
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" 
              data-testid="text-product-title"
            >
              Automated Customer Engagement & Analytics System
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" 
              data-testid="text-product-subtitle"
            >
              Streamline your customer engagement, automate responses, and gain powerful insights with our fully integrated system featuring multi-platform support, voice AI, and comprehensive analytics.
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                data-testid="button-play-timeline"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pause Tour' : 'Start Interactive Tour'}
              </Button>
              <Button
                onClick={() => setShowDemoModal(true)}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium"
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
                    animate={activeStep === item.id ? { scale: 1.2, backgroundColor: `rgb(${item.color === 'blue' ? '37, 99, 235' : item.color === 'green' ? '34, 197, 94' : item.color === 'purple' ? '147, 51, 234' : '249, 115, 22'})` } : { scale: 1 }}
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

                  {/* Image */}
                  <div className="flex-1 max-w-lg">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative rounded-xl overflow-hidden shadow-2xl"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-tr from-${item.color}-600/20 to-transparent`} />
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
            Ready to Transform Your Customer Engagement?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Get started with our comprehensive analytics and automation platform today.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => setShowDemoModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg"
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

      <DemoModal 
        open={showDemoModal} 
        onOpenChange={setShowDemoModal} 
      />
    </div>
  );
}