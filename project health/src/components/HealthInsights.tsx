import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Heart,
  Activity,
  Target,
  Calendar
} from 'lucide-react';

interface HealthMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
  recommendation: string;
}

interface Insight {
  id: string;
  type: 'success' | 'warning' | 'info' | 'critical';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

const HealthInsights = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [healthScore, setHealthScore] = useState(85);
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);

  useEffect(() => {
    // Generate AI-powered health insights based on mock data
    generateHealthInsights();
  }, []);

  const generateHealthInsights = () => {
    // Mock health metrics
    const mockMetrics: HealthMetric[] = [
      {
        name: 'Blood Pressure',
        value: 75,
        trend: 'stable',
        status: 'good',
        recommendation: 'Maintain current lifestyle'
      },
      {
        name: 'Weight Management',
        value: 68,
        trend: 'down',
        status: 'warning',
        recommendation: 'Consider increasing caloric intake'
      },
      {
        name: 'Exercise Frequency',
        value: 45,
        trend: 'down',
        status: 'warning',
        recommendation: 'Increase physical activity to 150min/week'
      },
      {
        name: 'Sleep Quality',
        value: 92,
        trend: 'up',
        status: 'good',
        recommendation: 'Excellent sleep pattern, keep it up!'
      }
    ];

    // AI-generated insights
    const mockInsights: Insight[] = [
      {
        id: '1',
        type: 'warning',
        title: 'Blood Pressure Trending Up',
        description: 'Your blood pressure readings have increased by 8% over the past month',
        action: 'Schedule checkup with cardiologist',
        priority: 'high'
      },
      {
        id: '2',
        type: 'success',
        title: 'Great Medication Adherence',
        description: '100% medication compliance this month! Your consistency is paying off',
        action: 'Keep maintaining this routine',
        priority: 'low'
      },
      {
        id: '3',
        type: 'info',
        title: 'Preventive Care Due',
        description: 'Annual blood work and cholesterol screening are due next month',
        action: 'Book lab appointment',
        priority: 'medium'
      },
      {
        id: '4',
        type: 'critical',
        title: 'Medication Interaction Alert',
        description: 'Potential interaction detected between Aspirin and new supplement',
        action: 'Consult pharmacist immediately',
        priority: 'high'
      },
      {
        id: '5',
        type: 'info',
        title: 'Exercise Goal Progress',
        description: 'You\'re 75% towards your weekly exercise goal of 150 minutes',
        action: 'Add 2 more workout sessions',
        priority: 'medium'
      }
    ];

    setMetrics(mockMetrics);
    setInsights(mockInsights);
    
    // Calculate health score based on metrics
    const avgScore = mockMetrics.reduce((acc, metric) => acc + metric.value, 0) / mockMetrics.length;
    setHealthScore(Math.round(avgScore));
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      default: return <Lightbulb className="w-5 h-5 text-primary" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-medical-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI Health Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized health recommendations powered by artificial intelligence
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-6">
          {/* Health Score Overview */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                Your Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">{healthScore}/100</div>
                  <p className="text-muted-foreground">Overall Health Rating</p>
                </div>
                <div className="w-32 h-32">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(healthScore / 100) * 314} 314`}
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Activity className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{metric.name}</span>
                      {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-success" />}
                      {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-destructive" />}
                    </div>
                    <Progress value={metric.value} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">{metric.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <div className="grid gap-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Personalized Recommendations
            </h3>
            
            {insights.map((insight) => (
              <Card key={insight.id} className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{insight.title}</h4>
                          <Badge variant={getPriorityColor(insight.priority)}>
                            {insight.priority} priority
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{insight.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="w-4 h-4 text-primary" />
                          <span className="font-medium">Action:</span>
                          <span>{insight.action}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
                  <Calendar className="w-6 h-6" />
                  <span>Schedule Checkup</span>
                </Button>
                <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
                  <Heart className="w-6 h-6" />
                  <span>Update Vitals</span>
                </Button>
                <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
                  <Activity className="w-6 h-6" />
                  <span>Log Exercise</span>
                </Button>
                <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
                  <Brain className="w-6 h-6" />
                  <span>Health Quiz</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HealthInsights;