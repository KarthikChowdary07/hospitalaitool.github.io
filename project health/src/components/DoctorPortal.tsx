import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Stethoscope, 
  Search,
  User,
  FileText,
  Calendar,
  Pill,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  Download,
  Share2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  bloodType: string;
  lastVisit: string;
  nextAppointment?: string;
  status: 'active' | 'inactive' | 'critical';
  conditions: string[];
  allergies: string[];
}

interface Prescription {
  id: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  date: string;
}

const DoctorPortal = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    dosage: '',
    frequency: 'once',
    duration: '',
    instructions: ''
  });
  const [clinicalNotes, setClinicalNotes] = useState('');
  const { toast } = useToast();

  // Mock patient data
  const mockPatients: Patient[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 45,
      gender: 'Female',
      phone: '+1-555-0123',
      email: 'sarah.j@email.com',
      bloodType: 'A+',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15',
      status: 'active',
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      allergies: ['Penicillin']
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 62,
      gender: 'Male',
      phone: '+1-555-0456',
      email: 'mchen@email.com',
      bloodType: 'O-',
      lastVisit: '2024-01-20',
      status: 'critical',
      conditions: ['Heart Disease', 'High Cholesterol'],
      allergies: ['Sulfa']
    },
    {
      id: '3',
      name: 'Emma Davis',
      age: 28,
      gender: 'Female',
      phone: '+1-555-0789',
      email: 'emma.d@email.com',
      bloodType: 'B+',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-03-10',
      status: 'active',
      conditions: ['Asthma'],
      allergies: ['Shellfish', 'Peanuts']
    }
  ];

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const addPrescription = () => {
    if (!selectedPatient || !newPrescription.medication || !newPrescription.dosage) {
      toast({
        title: "Missing Information",
        description: "Please select a patient and fill in medication details",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to backend
    toast({
      title: "Prescription Added",
      description: `Prescription for ${newPrescription.medication} added to ${selectedPatient.name}'s record`,
    });

    setNewPrescription({
      medication: '',
      dosage: '',
      frequency: 'once',
      duration: '',
      instructions: ''
    });
    setIsPrescriptionOpen(false);
  };

  const saveNotes = () => {
    if (!selectedPatient) return;

    toast({
      title: "Notes Saved",
      description: `Clinical notes saved for ${selectedPatient.name}`,
    });
    setIsNotesOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Doctor Portal</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Secure patient management system for healthcare providers
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Search & List */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Patient Search
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedPatient?.id === patient.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{patient.name}</h4>
                        <Badge variant={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} years • {patient.gender} • {patient.bloodType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </p>
                      {patient.conditions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {patient.conditions.slice(0, 2).map((condition, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                          {patient.conditions.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{patient.conditions.length - 2} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Details */}
            <div className="lg:col-span-2">
              {!selectedPatient ? (
                <Card className="medical-card">
                  <CardContent className="flex items-center justify-center py-16">
                    <div className="text-center">
                      <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a patient to view details</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="medical-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{selectedPatient.name}</CardTitle>
                        <p className="text-muted-foreground">
                          {selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.bloodType}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{selectedPatient.phone}</span>
                          <span>{selectedPatient.email}</span>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(selectedPatient.status)} className="text-sm">
                        {selectedPatient.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="prescriptions">Rx</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Medical Conditions */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-warning" />
                              Conditions
                            </h4>
                            <div className="space-y-2">
                              {selectedPatient.conditions.map((condition, index) => (
                                <div key={index} className="p-3 rounded bg-warning/10 text-sm">
                                  {condition}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Allergies */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-destructive" />
                              Allergies
                            </h4>
                            <div className="space-y-2">
                              {selectedPatient.allergies.map((allergy, index) => (
                                <div key={index} className="p-3 rounded bg-destructive/10 text-sm text-destructive">
                                  {allergy}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                          <Dialog open={isPrescriptionOpen} onOpenChange={setIsPrescriptionOpen}>
                            <DialogTrigger asChild>
                              <Button className="flex items-center gap-2">
                                <Pill className="w-4 h-4" />
                                New Rx
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>New Prescription</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Medication</label>
                                  <Input
                                    value={newPrescription.medication}
                                    onChange={(e) => setNewPrescription({...newPrescription, medication: e.target.value})}
                                    placeholder="e.g., Metformin"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Dosage</label>
                                    <Input
                                      value={newPrescription.dosage}
                                      onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                                      placeholder="500mg"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Frequency</label>
                                    <Select 
                                      value={newPrescription.frequency}
                                      onValueChange={(value) => setNewPrescription({...newPrescription, frequency: value})}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="once">Once daily</SelectItem>
                                        <SelectItem value="twice">Twice daily</SelectItem>
                                        <SelectItem value="thrice">Three times daily</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Duration</label>
                                  <Input
                                    value={newPrescription.duration}
                                    onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                                    placeholder="30 days"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Instructions</label>
                                  <Textarea
                                    value={newPrescription.instructions}
                                    onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
                                    placeholder="Take with food"
                                  />
                                </div>
                                <Button onClick={addPrescription} className="w-full">
                                  Add Prescription
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Add Notes
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Clinical Notes</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  value={clinicalNotes}
                                  onChange={(e) => setClinicalNotes(e.target.value)}
                                  placeholder="Enter clinical observations, treatment plans, etc."
                                  rows={6}
                                />
                                <Button onClick={saveNotes} className="w-full">
                                  Save Notes
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button variant="outline" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Schedule
                          </Button>

                          <Button variant="outline" className="flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            Refer
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="history">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Visit History</h4>
                          <div className="space-y-3">
                            <div className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium">Routine Checkup</h5>
                                <span className="text-sm text-muted-foreground">Jan 15, 2024</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Blood pressure stable, diabetes well controlled. Continue current medications.
                              </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium">Follow-up Visit</h5>
                                <span className="text-sm text-muted-foreground">Dec 20, 2023</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Adjusted medication dosage. Patient responding well to treatment.
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="prescriptions">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Current Prescriptions</h4>
                          <div className="space-y-3">
                            <div className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium">Metformin</h5>
                                  <p className="text-sm text-muted-foreground">500mg • Twice daily</p>
                                  <p className="text-sm text-muted-foreground">Take with meals</p>
                                </div>
                                <Badge variant="default">Active</Badge>
                              </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium">Lisinopril</h5>
                                  <p className="text-sm text-muted-foreground">10mg • Once daily</p>
                                  <p className="text-sm text-muted-foreground">Morning dose</p>
                                </div>
                                <Badge variant="default">Active</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="notes">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Clinical Notes</h4>
                          <div className="space-y-3">
                            <div className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-sm text-muted-foreground">Jan 15, 2024</span>
                                <span className="text-sm text-muted-foreground">Dr. Smith</span>
                              </div>
                              <p className="text-sm">
                                Patient reports good adherence to medications. Blood glucose levels improving. 
                                Continue current treatment plan. Schedule follow-up in 3 months.
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorPortal;