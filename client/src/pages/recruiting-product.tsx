import { useState, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Search, Brain, Star, CheckCircle, Clock, Scale, TrendingUp, Table, Languages, Shield, Play, Pause } from 'lucide-react';
import { DemoModal } from '@/components/demo-modal';
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

export default function RecruitingProduct() {
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
      title: "CV Collection",
      subtitle: "Automatically collect CVs from emails and Google Sheets",
      description: "Streamline your recruitment process by automatically collecting CVs from multiple sources including email attachments, Google Sheets uploads, and direct submissions through our platform.",
      content: () => (
        <Card className="p-8 shadow-lg bg-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Automated CV Collection</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">Email Integration</h4>
                <p className="text-gray-600 text-sm">Automatically extract CVs from email attachments</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <Table className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">Google Sheets</h4>
                <p className="text-gray-600 text-sm">Import CVs directly from spreadsheet uploads</p>
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-center text-gray-700">
              <strong>100+ CVs</strong> processed automatically per day with <strong>99% accuracy</strong>
            </p>
          </div>
        </Card>
      ),
      features: [
        "Automated email CV extraction",
        "Google Sheets integration",
        "Multiple file format support (PDF, DOC, DOCX)",
        "Bulk upload processing",
        "Real-time collection monitoring",
        "Error handling and validation"
      ],
      icon: Mail,
      color: "blue"
    },
    {
      id: 2,
      title: "Data Parsing",
      subtitle: "Extract and structure key information from CV documents",
      description: "Our advanced AI parsing engine extracts critical information from CVs including contact details, work experience, education, skills, and qualifications with exceptional accuracy.",
      content: () => (
        <Card className="p-8 shadow-lg bg-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Intelligent Data Extraction</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-sm text-gray-600">Parsing Accuracy</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">15+</div>
              <p className="text-sm text-gray-600">Data Fields Extracted</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">5s</div>
              <p className="text-sm text-gray-600">Processing Time</p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Contact Information (Name, Email, Phone)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Work Experience & Job Titles</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Education & Certifications</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Skills & Technologies</span>
            </div>
          </div>
        </Card>
      ),
      features: [
        "98% data extraction accuracy",
        "15+ structured data fields",
        "Multi-language CV support",
        "OCR for scanned documents",
        "Custom field configuration",
        "Data validation and cleanup"
      ],
      icon: Search,
      color: "green"
    },
    {
      id: 3,
      title: "AI Analysis",
      subtitle: "Match keywords and requirements using advanced algorithms",
      description: "Our AI engine analyzes extracted data against job requirements using natural language processing and machine learning to identify the best candidate matches with precision.",
      content: () => (
        <Card className="p-8 shadow-lg bg-white">
          <h3 className="text-2xl font-bold mb-8 text-center">AI-Powered Candidate Analysis</h3>
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm font-medium">CV Input</p>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4 relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm font-medium">Match Score</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-semibold mb-2">Requirement Matching</h4>
                <ul className="text-sm space-y-1">
                  <li>• React.js: 3+ years ✓</li>
                  <li>• TypeScript: Advanced ✓</li>
                  <li>• Node.js: 2+ years ✓</li>
                  <li>• Team Leadership: 1+ year ✗</li>
                </ul>
              </div>
              <div className="p-4 border-l-4 border-green-500 bg-green-50">
                <h4 className="font-semibold mb-2">Skills Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Technical Skills</span>
                    <span className="text-sm font-medium text-green-600">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-[95%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ),
      features: [
        "Natural language processing",
        "Keyword and requirement matching",
        "Skills gap analysis",
        "Experience level assessment",
        "Industry-specific algorithms",
        "Continuous learning from feedback"
      ],
      icon: Brain,
      color: "purple"
    },
    {
      id: 4,
      title: "Scoring & Rating",
      subtitle: "Generate qualification scores based on job requirements",
      description: "Our system automatically generates comprehensive qualification scores for each candidate based on their match to job requirements, experience level, and skills alignment.",
      content: () => (
        <Card className="p-8 shadow-lg bg-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Intelligent Candidate Scoring</h3>
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-6 border rounded-lg bg-green-50">
                <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">92%</div>
                <p className="text-sm text-gray-600">Overall Match</p>
              </div>
              <div className="text-center p-6 border rounded-lg bg-blue-50">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">5.2</div>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="text-center p-6 border rounded-lg bg-purple-50">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">A+</div>
                <p className="text-sm text-gray-600">Rating Grade</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Technical Skills</span>
                  <span className="text-sm text-gray-600">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full w-[90%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Experience Match</span>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Cultural Fit</span>
                  <span className="text-sm text-gray-600">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full w-[88%]"></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ),
      features: [
        "Multi-criteria scoring system",
        "Weighted requirement matching",
        "Experience level assessment",
        "Skills proficiency scoring",
        "Cultural fit indicators",
        "Customizable scoring weights"
      ],
      icon: Star,
      color: "orange"
    },
    {
      id: 5,
      title: "Results & Benefits",
      subtitle: "Qualified selection and measurable ROI",
      description: "Experience dramatic improvements in hiring efficiency with our comprehensive feature set that saves time, reduces bias, and delivers better quality candidates with measurable results.",
      content: () => (
        <div className="space-y-8">
          <Card className="p-8 shadow-lg bg-gradient-to-r from-accent/5 to-primary/5">
            <h3 className="text-2xl font-bold mb-8 text-center">Measurable Results</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">80%</div>
                <p className="text-muted-foreground">Time Saved on Screening</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">95%</div>
                <p className="text-muted-foreground">Screening Accuracy</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">60%</div>
                <p className="text-muted-foreground">Cost Reduction</p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Clock className="h-8 w-8 text-accent mb-4" />
              <h4 className="font-semibold mb-3">Save 80% Time</h4>
              <p className="text-sm text-muted-foreground">Reduce manual screening from hours to minutes</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Scale className="h-8 w-8 text-accent mb-4" />
              <h4 className="font-semibold mb-3">Reduce Bias</h4>
              <p className="text-sm text-muted-foreground">Objective, data-driven candidate evaluation</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <TrendingUp className="h-8 w-8 text-accent mb-4" />
              <h4 className="font-semibold mb-3">Higher Quality</h4>
              <p className="text-sm text-muted-foreground">Find better matches with AI-powered analysis</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Table className="h-8 w-8 text-accent mb-4" />
              <h4 className="font-semibold mb-3">Excel Integration</h4>
              <p className="text-sm text-muted-foreground">Seamless integration with existing workflows</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Languages className="h-8 w-8 text-accent mb-4" />
              <h4 className="font-semibold mb-3">Multi-Language</h4>
              <p className="text-sm text-muted-foreground">Support for multiple languages and formats</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Shield className="h-8 w-8 text-accent mb-4" />
              <h4 className="font-semibold mb-3">Secure & Compliant</h4>
              <p className="text-sm text-muted-foreground">GDPR compliant data processing</p>
            </Card>
          </div>

          <Card className="p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-6">Start Streamlining Today</h3>
            <div className="inline-block bg-gradient-to-r from-accent to-primary text-white rounded-2xl p-8">
              <h4 className="text-xl font-bold mb-2">Business Plan</h4>
              <div className="text-4xl font-bold mb-4">
                $199
                <span className="text-lg font-normal">/month</span>
              </div>
              <Button 
                onClick={() => setShowDemoModal(true)}
                className="bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Book Demo & Get Started
              </Button>
            </div>
          </Card>
        </div>
      ),
      features: [
        "80% time savings on manual screening",
        "95% accuracy in candidate selection",
        "60% reduction in recruitment costs",
        "GDPR compliant data processing",
        "Seamless Excel and Google Sheets integration",
        "Multi-language CV support"
      ],
      icon: CheckCircle,
      color: "cyan"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link href="/products">
              <span className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors" data-testid="link-back-home">
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
              Automated Recruiting System
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" 
              data-testid="text-product-subtitle"
            >
              Revolutionize your hiring process with AI-powered CV screening that saves time, reduces bias, and identifies the best candidates automatically.
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
                className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                data-testid="button-play-timeline"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pause Workflow' : 'Start Workflow Tour'}
              </Button>
              <Button
                onClick={() => setShowDemoModal(true)}
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 px-6 py-3 rounded-lg font-medium"
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
                    animate={activeStep === item.id ? { scale: 1.2, backgroundColor: `rgb(${item.color === 'blue' ? '37, 99, 235' : item.color === 'green' ? '34, 197, 94' : item.color === 'purple' ? '147, 51, 234' : item.color === 'orange' ? '249, 115, 22' : '6, 182, 212'})` } : { scale: 1 }}
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
      <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Revolutionize Your Hiring Process?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Start screening candidates faster and more accurately with our AI-powered recruiting system.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => setShowDemoModal(true)}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-medium rounded-lg"
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