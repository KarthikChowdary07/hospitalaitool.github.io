import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Users, 
  Brain, 
  Shield, 
  Calendar, 
  Activity,
  Upload,
  Search,
  Bell,
  Share2,
  Smartphone,
  Globe
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: 'Smart Document Management',
      description: 'Securely store and organize all your medical documents with AI-powered categorization and OCR text extraction.',
      gradient: 'from-primary to-primary-light'
    },
    {
      icon: Users,
      title: 'Family Health Profiles',
      description: 'Manage health records for your entire family with separate dashboards and privacy controls.',
      gradient: 'from-secondary to-secondary-light'
    },
    {
      icon: Brain,
      title: 'AI Health Assistant',
      description: 'Get personalized health insights, medication reminders, and answers to your health questions 24/7.',
      gradient: 'from-accent to-warning'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your health data is protected with enterprise-grade encryption and HIPAA-compliant security measures.',
      gradient: 'from-success to-secondary'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Never miss appointments or medications with intelligent reminders and calendar integration.',
      gradient: 'from-primary to-accent'
    },
    {
      icon: Activity,
      title: 'Vitals Tracking',
      description: 'Monitor your health metrics over time with beautiful charts and trend analysis.',
      gradient: 'from-success to-primary'
    }
  ];

  const additionalFeatures = [
    {
      icon: Upload,
      title: 'Quick Upload',
      description: 'Snap photos of documents with your phone'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find any document instantly with AI search'
    },
    {
      icon: Bell,
      title: 'Reminders',
      description: 'Never miss medications or appointments'
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description: 'Share records securely with doctors'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Access your health data anywhere, anytime'
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Available in multiple Indian languages'
    }
  ];

  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need for{' '}
            <span className="health-gradient bg-clip-text text-transparent">
              Complete Health Management
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From document storage to AI-powered insights, we provide all the tools you need to take control of your health journey.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="health-card group hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-card rounded-2xl p-8 health-card">
          <h3 className="text-2xl font-bold text-center mb-8">Plus Many More Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;