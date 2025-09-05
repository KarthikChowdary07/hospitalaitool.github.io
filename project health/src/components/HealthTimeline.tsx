import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Activity, FileText, Pill, UserCheck, TrendingUp, Filter } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'appointment' | 'lab' | 'prescription' | 'vitals' | 'diagnosis';
  title: string;
  description: string;
  details: any;
  doctor?: string;
  hospital?: string;
}

const HealthTimeline = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: '2024-09-05',
      type: 'vitals',
      title: 'Blood Pressure Check',
      description: 'Regular monitoring - Normal readings',
      details: { systolic: 120, diastolic: 80, pulse: 72 },
      doctor: 'Self-monitoring'
    },
    {
      id: '2',
      date: '2024-09-03',
      type: 'lab',
      title: 'Complete Blood Count',
      description: 'Routine annual checkup labs',
      details: { hemoglobin: '14.2 g/dL', wbc: '7,200/μL', platelets: '250,000/μL' },
      doctor: 'Dr. Sarah Wilson',
      hospital: 'City General Hospital'
    },
    {
      id: '3',
      date: '2024-09-01',
      type: 'appointment',
      title: 'Annual Physical Exam',
      description: 'Comprehensive health evaluation',
      details: { weight: '70kg', height: '175cm', bmi: '22.9' },
      doctor: 'Dr. Michael Brown',
      hospital: 'Family Health Center'
    },
    {
      id: '4',
      date: '2024-08-28',
      type: 'prescription',
      title: 'Medication Refill',
      description: 'Lisinopril for blood pressure management',
      details: { medication: 'Lisinopril 10mg', quantity: '90 tablets', duration: '3 months' },
      doctor: 'Dr. Sarah Wilson'
    },
    {
      id: '5',
      date: '2024-08-15',
      type: 'diagnosis',
      title: 'Hypertension Diagnosis',
      description: 'Stage 1 hypertension confirmed',
      details: { condition: 'Essential Hypertension', icd10: 'I10', severity: 'Stage 1' },
      doctor: 'Dr. Sarah Wilson',
      hospital: 'City General Hospital'
    },
    {
      id: '6',
      date: '2024-07-20',
      type: 'lab',
      title: 'Lipid Panel',
      description: 'Cholesterol and triglyceride levels',
      details: { totalCholesterol: '195 mg/dL', hdl: '50 mg/dL', ldl: '120 mg/dL', triglycerides: '125 mg/dL' },
      doctor: 'Dr. Sarah Wilson',
      hospital: 'City General Hospital'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <UserCheck className="h-4 w-4" />;
      case 'lab': return <FileText className="h-4 w-4" />;
      case 'prescription': return <Pill className="h-4 w-4" />;
      case 'vitals': return <Activity className="h-4 w-4" />;
      case 'diagnosis': return <TrendingUp className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'appointment': return 'bg-blue-500';
      case 'lab': return 'bg-green-500';
      case 'prescription': return 'bg-purple-500';
      case 'vitals': return 'bg-orange-500';
      case 'diagnosis': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'appointment': return 'default';
      case 'lab': return 'secondary';
      case 'prescription': return 'outline';
      case 'vitals': return 'secondary';
      case 'diagnosis': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredEvents = timelineEvents.filter(event => {
    if (selectedFilter === 'all') return true;
    return event.type === selectedFilter;
  }).filter(event => {
    if (selectedYear === 'all') return true;
    return event.date.startsWith(selectedYear);
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderEventDetails = (event: TimelineEvent) => {
    switch (event.type) {
      case 'vitals':
        return (
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Blood Pressure:</span>
              <p>{event.details.systolic}/{event.details.diastolic} mmHg</p>
            </div>
            <div>
              <span className="font-medium">Pulse:</span>
              <p>{event.details.pulse} bpm</p>
            </div>
          </div>
        );
      case 'lab':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {Object.entries(event.details).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <p>{value as string}</p>
              </div>
            ))}
          </div>
        );
      case 'prescription':
        return (
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Medication:</span> {event.details.medication}</div>
            <div><span className="font-medium">Quantity:</span> {event.details.quantity}</div>
            <div><span className="font-medium">Duration:</span> {event.details.duration}</div>
          </div>
        );
      case 'diagnosis':
        return (
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Condition:</span> {event.details.condition}</div>
            <div><span className="font-medium">ICD-10:</span> {event.details.icd10}</div>
            <div><span className="font-medium">Severity:</span> {event.details.severity}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-3xl font-bold">Health Timeline</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chronological view of your medical history, appointments, and health events
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="appointment">Appointments</SelectItem>
                <SelectItem value="lab">Lab Results</SelectItem>
                <SelectItem value="prescription">Prescriptions</SelectItem>
                <SelectItem value="vitals">Vitals</SelectItem>
                <SelectItem value="diagnosis">Diagnoses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            <div className="space-y-8">
              {filteredEvents.map((event, index) => (
                <div key={event.id} className="relative flex items-start gap-6">
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${getEventColor(event.type)} flex-shrink-0`}>
                    <div className="text-white">
                      {getEventIcon(event.type)}
                    </div>
                  </div>

                  {/* Event card */}
                  <Card className="flex-1">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <Badge variant={getBadgeVariant(event.type)}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription>{formatDate(event.date)}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      
                      {renderEventDetails(event)}

                      {(event.doctor || event.hospital) && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            {event.doctor && (
                              <div className="flex items-center gap-1">
                                <UserCheck className="h-3 w-3" />
                                {event.doctor}
                              </div>
                            )}
                            {event.hospital && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {event.hospital}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more timeline events.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HealthTimeline;