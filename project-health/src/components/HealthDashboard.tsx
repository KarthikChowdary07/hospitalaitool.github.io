import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Droplet, 
  Weight, 
  Thermometer,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Upload,
  Users,
  Clock,
  AlertCircle
} from 'lucide-react';

const HealthDashboard = () => {
  const vitals = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: '72',
      unit: 'BPM',
      trend: 'up',
      status: 'normal',
      color: 'text-success'
    },
    {
      icon: Droplet,
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      trend: 'stable',
      status: 'normal',
      color: 'text-primary'
    },
    {
      icon: Weight,
      label: 'Weight',
      value: '68.5',
      unit: 'kg',
      trend: 'down',
      status: 'improving',
      color: 'text-secondary'
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: '98.6',
      unit: '°F',
      trend: 'stable',
      status: 'normal',
      color: 'text-accent'
    }
  ];

  const recentActivity = [
    {
      type: 'Lab Report',
      title: 'Blood Test Results',
      date: '2 hours ago',
      status: 'new',
      icon: FileText
    },
    {
      type: 'Appointment',
      title: 'Dr. Sarah Johnson - Cardiology',
      date: 'Tomorrow at 2:00 PM',
      status: 'upcoming',
      icon: Calendar
    },
    {
      type: 'Medication',
      title: 'Blood Pressure Medication',
      date: 'Due in 30 minutes',
      status: 'reminder',
      icon: AlertCircle
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Health at a Glance</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor your vitals, track your progress, and stay on top of your health with our comprehensive dashboard.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Button className="h-auto p-6 flex flex-col items-center gap-3 bg-primary hover:bg-primary/90">
              <Upload className="w-6 h-6" />
              <span>Upload Document</span>
            </Button>
            <Button className="h-auto p-6 flex flex-col items-center gap-3 bg-secondary hover:bg-secondary/90">
              <Calendar className="w-6 h-6" />
              <span>Book Appointment</span>
            </Button>
            <Button className="h-auto p-6 flex flex-col items-center gap-3 bg-accent hover:bg-accent/90">
              <Users className="w-6 h-6" />
              <span>Family Profiles</span>
            </Button>
            <Button className="h-auto p-6 flex flex-col items-center gap-3 bg-warning hover:bg-warning/90">
              <Clock className="w-6 h-6" />
              <span>Set Reminder</span>
            </Button>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {vitals.map((vital, index) => (
              <Card key={index} className="health-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-full bg-current/10 flex items-center justify-center ${vital.color}`}>
                      <vital.icon className={`w-5 h-5 ${vital.color}`} />
                    </div>
                    {vital.trend === 'up' && <TrendingUp className="w-4 h-4 text-success" />}
                    {vital.trend === 'down' && <TrendingDown className="w-4 h-4 text-destructive" />}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{vital.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{vital.value}</span>
                      <span className="text-sm text-muted-foreground">{vital.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${vital.status === 'normal' ? 'bg-success' : 'bg-warning'}`}></div>
                      <span className="text-xs text-muted-foreground capitalize">{vital.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Health Progress */}
            <Card className="health-card xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Health Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Fitness Goal</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Medication Adherence</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Checkup Schedule</span>
                    <span className="text-sm text-muted-foreground">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.status === 'new' ? 'bg-primary/10 text-primary' :
                        activity.status === 'upcoming' ? 'bg-secondary/10 text-secondary' :
                        'bg-warning/10 text-warning'
                      }`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;