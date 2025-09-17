import { useState, useEffect, useRef } from 'react';
import { useHeroQuery } from '@/lib/siteQueries';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/language-provider';
import { DemoModal } from '@/components/demo-modal';
import { MessageCircle, UserCheck, Check } from 'lucide-react';

// Custom hook for scroll animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible] as const;
}

export default function Home() {
  const { t } = useLanguage();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { data: heroData } = useHeroQuery();
  
  // Scroll animation refs
  const [productsRef, productsVisible] = useScrollAnimation();
  const [whyChooseRef, whyChooseVisible] = useScrollAnimation();
  const [reviewsRef, reviewsVisible] = useScrollAnimation();
  const [faqRef, faqVisible] = useScrollAnimation();
  const [contactRef, contactVisible] = useScrollAnimation();

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-background to-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
              {heroData?.title ?? 'Transform Your Business with'}
              <span className="gradient-text block mt-2">{heroData?.title ? '' : 'AI Solutions'}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-hero-subtitle">
              {heroData?.subtitle ?? t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/products">
                <Button 
                  className="bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90 transition-all hover:scale-105"
                  data-testid="button-explore-products"
                >
                  {t.hero.exploreProducts}
                </Button>
              </Link>
              <Button 
                variant="outline"
                onClick={() => setShowDemoModal(true)}
                className="px-8 py-3 hover:bg-secondary transition-colors"
                data-testid="button-book-demo"
              >
                {t.hero.bookDemo}
              </Button>
            </div>
            
            {/* Powered By Section */}
            <div className="relative mt-16">
              <p className="text-center text-muted-foreground mb-8 text-lg font-medium">Powered by Leading AI Technologies</p>
              <div className="overflow-hidden">
                <div className="flex animate-scroll space-x-12">
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">GPT</span>
                    </div>
                    <span className="font-semibold text-gray-800">ChatGPT-5</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">NB</span>
                    </div>
                    <span className="font-semibold text-gray-800">Nano Banana</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">N8N</span>
                    </div>
                    <span className="font-semibold text-gray-800">N8N</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">G</span>
                    </div>
                    <span className="font-semibold text-gray-800">Gemini Pro</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">V3</span>
                    </div>
                    <span className="font-semibold text-gray-800">VEO3</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">C</span>
                    </div>
                    <span className="font-semibold text-gray-800">Claude Sonnet</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">L</span>
                    </div>
                    <span className="font-semibold text-gray-800">LLaMA 3</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">D</span>
                    </div>
                    <span className="font-semibold text-gray-800">DALL-E 3</span>
                  </div>
                  
                  {/* Duplicate the logos for seamless loop */}
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">GPT</span>
                    </div>
                    <span className="font-semibold text-gray-800">ChatGPT-5</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">NB</span>
                    </div>
                    <span className="font-semibold text-gray-800">Nano Banana</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">N8N</span>
                    </div>
                    <span className="font-semibold text-gray-800">N8N</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm whitespace-nowrap">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">G</span>
                    </div>
                    <span className="font-semibold text-gray-800">Gemini Pro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Animation Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary/10 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section id="products" className="py-20">
        <div 
          ref={productsRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-products-title">
              {t.products.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-products-subtitle">
              {t.products.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Product 1: AI Business Chatbot */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 feature-card cursor-pointer" data-testid="card-product-business-chatbot">
              <Link href="/chatbot-product">
                <div className="block">
                  <img 
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                    alt="AI Business Chatbot" 
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        AI Business Chatbot
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Most Popular
                        </Badge>
                        <span>•</span>
                        <span>Real-time Integration</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Intelligent chatbot that handles customer inquiries, manages inventory, processes orders, and integrates with WhatsApp and Messenger for seamless customer service.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Real-time data responses (Chatbot feature)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Image query processing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Inventory management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Multi-platform integration</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">Starting at</span>
                      <div className="text-2xl font-bold text-primary">
                        $299
                        <span className="text-sm text-muted-foreground font-normal">/month</span>
                      </div>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Learn More
                    </Button>
                  </div>
                </div>
              </Link>
            </Card>
            
            {/* Product 2: Automated Recruiting */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 feature-card cursor-pointer" data-testid="card-product-recruiting">
              <Link href="/recruiting">
                <div className="block">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                    alt="Automated Recruiting System" 
                    className="w-full h-48 object-cover rounded-lg mb-6"
                    data-testid="img-recruiting"
                  />
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <UserCheck className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2" data-testid="text-recruiting-title">
                        {t.products.recruiting.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                          Time Saver
                        </Badge>
                        <span>•</span>
                        <span>AI-Powered Screening</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6" data-testid="text-recruiting-description">
                    {t.products.recruiting.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {t.products.recruiting.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3" data-testid={`feature-recruiting-${index}`}>
                        <Check className="h-4 w-4 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">Starting at</span>
                      <div className="text-2xl font-bold text-accent" data-testid="text-recruiting-price">
                        {t.products.recruiting.price}
                        <span className="text-sm text-muted-foreground font-normal">{t.products.recruiting.currency}</span>
                      </div>
                    </div>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="button-recruiting-learn-more">
                      {t.products.recruiting.learnMore}
                    </Button>
                  </div>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Our Solutions Section */}
      <section id="why-choose" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div 
          ref={whyChooseRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            whyChooseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-why-choose-title">
              Why Choose Our AI Solutions?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We deliver cutting-edge AI technology that transforms businesses with proven results and unmatched reliability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow" data-testid="card-why-proven">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-muted-foreground">
                Our solutions have helped 500+ businesses increase efficiency by 80% and reduce operational costs significantly.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow" data-testid="card-why-support">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">24/7 Expert Support</h3>
              <p className="text-muted-foreground">
                Dedicated support team available round-the-clock to ensure your AI solutions run smoothly and efficiently.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow" data-testid="card-why-integration">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <UserCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Easy Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly integrate with your existing systems. Setup in minutes, not weeks, with our guided implementation process.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-20">
        <div 
          ref={reviewsRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-reviews-title">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by businesses worldwide. See how our AI solutions have transformed their operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow" data-testid="card-review-1">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {"★".repeat(5)}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "The AI chatbot reduced our customer service workload by 70%. Our team can now focus on complex issues while the bot handles routine inquiries perfectly."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SJ
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">CEO, TechStart Inc.</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-shadow" data-testid="card-review-2">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {"★".repeat(5)}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "The recruiting system streamlined our hiring process completely. We went from screening 100 CVs manually to having the top 10 candidates selected automatically."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MR
                </div>
                <div>
                  <h4 className="font-semibold">Michael Rodriguez</h4>
                  <p className="text-sm text-muted-foreground">HR Director, Global Corp</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-shadow" data-testid="card-review-3">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {"★".repeat(5)}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "Implementation was seamless and the ROI was immediate. Our order processing is now 5x faster and error-free. Best investment we've made this year."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  EL
                </div>
                <div>
                  <h4 className="font-semibold">Emily Liu</h4>
                  <p className="text-sm text-muted-foreground">Operations Manager, RetailPlus</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-secondary/30">
        <div 
          ref={faqRef}
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Get answers to the most common questions about our AI solutions.
            </p>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6" data-testid="card-faq-1">
              <h3 className="text-lg font-semibold mb-3">How quickly can I see results with your AI solutions?</h3>
              <p className="text-muted-foreground">
                Most customers see immediate improvements within the first week of implementation. Full optimization typically occurs within 30 days as the AI learns your business patterns.
              </p>
            </Card>
            
            <Card className="p-6" data-testid="card-faq-2">
              <h3 className="text-lg font-semibold mb-3">Do I need technical expertise to use these solutions?</h3>
              <p className="text-muted-foreground">
                Not at all! Our solutions are designed for business users. We provide complete setup assistance, training, and ongoing support to ensure success without technical complexity.
              </p>
            </Card>
            
            <Card className="p-6" data-testid="card-faq-3">
              <h3 className="text-lg font-semibold mb-3">Can the AI integrate with my existing systems?</h3>
              <p className="text-muted-foreground">
                Yes, our AI solutions integrate seamlessly with popular platforms including Excel, Google Sheets, WhatsApp, Messenger, and most CRM systems through our robust API connections.
              </p>
            </Card>
            
            <Card className="p-6" data-testid="card-faq-4">
              <h3 className="text-lg font-semibold mb-3">What happens to my data? Is it secure?</h3>
              <p className="text-muted-foreground">
                Your data security is our top priority. We use enterprise-grade encryption, comply with GDPR standards, and never share your business data with third parties.
              </p>
            </Card>
            
            <Card className="p-6" data-testid="card-faq-5">
              <h3 className="text-lg font-semibold mb-3">Can I customize the AI to match my business needs?</h3>
              <p className="text-muted-foreground">
                Absolutely! Our AI solutions are highly customizable. You can train the chatbot with your specific business knowledge and configure recruiting criteria to match your exact requirements.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div 
          ref={contactRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-contact-title">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started today with a personalized demo or speak with our AI specialists to find the perfect solution for your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4" data-testid="contact-email">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p className="text-muted-foreground">support@aisolutions.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4" data-testid="contact-phone">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Call Us</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4" data-testid="contact-hours">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <UserCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Book Your Free Demo</h3>
              <p className="text-muted-foreground mb-6">
                See our AI solutions in action with a personalized demonstration tailored to your business needs.
              </p>
              <Button 
                onClick={() => setShowDemoModal(true)}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3"
                data-testid="button-book-demo-contact"
              >
                Schedule Free Demo
              </Button>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  🚀 Join 500+ businesses already using our AI solutions
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <DemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
}
