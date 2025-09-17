import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Search, Brain, Star, CheckCircle, Clock, Scale, TrendingUp, Table, Languages, Shield } from 'lucide-react';
import { DemoModal } from '@/components/demo-modal';

export default function RecruitingProduct() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const workflowSteps = [
    {
      icon: Mail,
      title: "1. CV Collection",
      description: "Automatically collect CVs from emails and Google Sheets",
    },
    {
      icon: Search,
      title: "2. Data Parsing",
      description: "Extract and structure key information from CV documents",
    },
    {
      icon: Brain,
      title: "3. AI Analysis", 
      description: "Match keywords and requirements using advanced algorithms",
    },
    {
      icon: Star,
      title: "4. Scoring & Rating",
      description: "Generate qualification scores based on job requirements",
    },
    {
      icon: CheckCircle,
      title: "5. Qualified Selection",
      description: "Automatically filter and organize qualified candidates",
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "Save 80% Time",
      description: "Reduce manual screening from hours to minutes",
    },
    {
      icon: Scale,
      title: "Reduce Bias",
      description: "Objective, data-driven candidate evaluation",
    },
    {
      icon: TrendingUp,
      title: "Higher Quality",
      description: "Find better matches with AI-powered analysis",
    },
    {
      icon: Table,
      title: "Excel Integration",
      description: "Seamless integration with existing workflows",
    },
    {
      icon: Languages,
      title: "Multi-Language",
      description: "Support for multiple languages and formats",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "GDPR compliant data processing",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link href="/products">
              <span className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6" data-testid="link-back-home"><ArrowLeft className="h-4 w-4" /> Back to Products</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-product-title">
              Automated Recruiting System
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-product-subtitle">
              Revolutionize your hiring process with AI-powered CV screening that saves time, reduces bias, and identifies the best candidates automatically.
            </p>
          </div>

          {/* Workflow Demo */}
          <Card className="p-8 mb-12 shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-center" data-testid="text-workflow-title">See How It Works</h3>
            <div className="max-w-4xl mx-auto">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className="workflow-step"
                  data-testid={`workflow-step-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <step.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
                data-testid={`card-feature-${index}`}
              >
                <feature.icon className="h-8 w-8 text-accent mb-4" />
                <h4 className="font-semibold mb-3">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* ROI Benefits */}
          <Card className="p-8 mb-12 shadow-lg bg-gradient-to-r from-accent/5 to-primary/5">
            <h3 className="text-2xl font-bold mb-8 text-center" data-testid="text-benefits-title">Measurable Results</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div data-testid="stat-time-saved">
                <div className="text-4xl font-bold text-accent mb-2">80%</div>
                <p className="text-muted-foreground">Time Saved on Screening</p>
              </div>
              <div data-testid="stat-accuracy">
                <div className="text-4xl font-bold text-accent mb-2">95%</div>
                <p className="text-muted-foreground">Screening Accuracy</p>
              </div>
              <div data-testid="stat-cost-reduction">
                <div className="text-4xl font-bold text-accent mb-2">60%</div>
                <p className="text-muted-foreground">Cost Reduction</p>
              </div>
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-6" data-testid="text-pricing-title">Start Streamlining Today</h3>
            <div className="inline-block bg-gradient-to-r from-accent to-primary text-white rounded-2xl p-8">
              <h4 className="text-xl font-bold mb-2">Business Plan</h4>
              <div className="text-4xl font-bold mb-4" data-testid="text-pricing-amount">
                $199
                <span className="text-lg font-normal">/month</span>
              </div>
              <Button 
                onClick={() => setShowDemoModal(true)}
                className="bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
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
