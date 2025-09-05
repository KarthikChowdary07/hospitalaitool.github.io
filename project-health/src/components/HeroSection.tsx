import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  ArrowRight,
  Activity,
  Calendar
} from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Your Digital Health Guardian</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your Complete{' '}
                <span className="health-gradient bg-clip-text text-transparent">
                  Health
                </span>{' '}
                Companion
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Securely store, manage, and track your family's health records. 
                Get AI-powered insights and never miss an important appointment again.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-health group">
                Get Started Today
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View Features
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100K+</div>
                <div className="text-sm text-muted-foreground">Health Records</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">99.9%</div>
                <div className="text-sm text-muted-foreground">Secure & Private</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="health-glow absolute inset-0 rounded-2xl"></div>
            <div className="relative w-full h-64 rounded-2xl shadow-2xl bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">[ Hero Image Placeholder ]</span>
            </div>
            
            {/* Floating Health Cards */}
            <div className="absolute -top-4 -left-4 health-card p-4 bg-card/90 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-success pulse-animation" />
                </div>
                <div>
                  <div className="text-sm font-medium">Heart Rate</div>
                  <div className="text-xs text-muted-foreground">72 BPM - Normal</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 health-card p-4 bg-card/90 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Next Checkup</div>
                  <div className="text-xs text-muted-foreground">Dr. Smith - Tomorrow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;



export default HeroSection;
