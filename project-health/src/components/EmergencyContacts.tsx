import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone, 
  UserPlus, 
  AlertCircle,
  Heart,
  Stethoscope,
  Ambulance,
  Shield,
  Edit,
  Trash2,
  QrCode,
  Share2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
  isPrimary: boolean;
}

interface MedicalInfo {
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyNotes: string;
}

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    bloodType: '',
    allergies: [],
    medications: [],
    conditions: [],
    emergencyNotes: ''
  });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMedicalOpen, setIsMedicalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    alternatePhone: '',
    email: '',
    isPrimary: false
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    const savedMedical = localStorage.getItem('medicalInfo');
    
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
    if (savedMedical) {
      setMedicalInfo(JSON.parse(savedMedical));
    }
  }, []);

  const saveContacts = (updatedContacts: EmergencyContact[]) => {
    setContacts(updatedContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
  };

  const saveMedicalInfo = (updatedInfo: MedicalInfo) => {
    setMedicalInfo(updatedInfo);
    localStorage.setItem('medicalInfo', JSON.stringify(updatedInfo));
  };

  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in name and phone number",
        variant: "destructive"
      });
      return;
    }

    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact
    };

    // If this is set as primary, remove primary from others
    let updatedContacts = [...contacts];
    if (contact.isPrimary) {
      updatedContacts = updatedContacts.map(c => ({ ...c, isPrimary: false }));
    }

    saveContacts([...updatedContacts, contact]);
    setNewContact({
      name: '',
      relationship: '',
      phone: '',
      alternatePhone: '',
      email: '',
      isPrimary: false
    });
    setIsContactOpen(false);

    toast({
      title: "Contact Added",
      description: `${contact.name} has been added to emergency contacts`,
    });
  };

  const deleteContact = (id: string) => {
    const updated = contacts.filter(contact => contact.id !== id);
    saveContacts(updated);
    
    toast({
      title: "Contact Removed",
      description: "Emergency contact has been deleted",
    });
  };

  const callContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const generateEmergencyQR = () => {
    const emergencyData = {
      contacts: contacts.filter(c => c.isPrimary).slice(0, 2),
      medical: {
        bloodType: medicalInfo.bloodType,
        allergies: medicalInfo.allergies.join(', '),
        medications: medicalInfo.medications.join(', '),
        conditions: medicalInfo.conditions.join(', ')
      }
    };
    
    // In a real app, this would generate a QR code
    toast({
      title: "QR Code Generated",
      description: "Emergency info QR code ready for sharing",
    });
  };

  const emergencyServices = [
    { name: 'Ambulance', number: '108', icon: Ambulance, color: 'text-destructive' },
    { name: 'Police', number: '100', icon: Shield, color: 'text-primary' },
    { name: 'Fire', number: '101', icon: AlertCircle, color: 'text-warning' },
    { name: 'Emergency', number: '112', icon: Phone, color: 'text-secondary' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-destructive/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Emergency Contacts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick access to emergency contacts and critical medical information
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-6">
          {/* Emergency Services */}
          <Card className="medical-card border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-6 h-6" />
                Emergency Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {emergencyServices.map((service) => (
                  <Button
                    key={service.name}
                    onClick={() => callContact(service.number)}
                    className="h-auto p-6 flex flex-col items-center gap-3 bg-destructive hover:bg-destructive/90"
                  >
                    <service.icon className="w-8 h-8" />
                    <div>
                      <div className="font-semibold">{service.name}</div>
                      <div className="text-sm opacity-90">{service.number}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Emergency Contacts */}
            <Card className="medical-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Personal Contacts
                  </CardTitle>
                  <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex items-center gap-1">
                        <UserPlus className="w-4 h-4" />
                        Add Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Emergency Contact</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contact-name">Full Name</Label>
                            <Input
                              id="contact-name"
                              value={newContact.name}
                              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                              placeholder="John Smith"
                            />
                          </div>
                          <div>
                            <Label htmlFor="relationship">Relationship</Label>
                            <Select 
                              value={newContact.relationship}
                              onValueChange={(value) => setNewContact({...newContact, relationship: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="spouse">Spouse</SelectItem>
                                <SelectItem value="parent">Parent</SelectItem>
                                <SelectItem value="child">Child</SelectItem>
                                <SelectItem value="sibling">Sibling</SelectItem>
                                <SelectItem value="friend">Friend</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={newContact.phone}
                            onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="alt-phone">Alternate Phone (Optional)</Label>
                          <Input
                            id="alt-phone"
                            value={newContact.alternatePhone}
                            onChange={(e) => setNewContact({...newContact, alternatePhone: e.target.value})}
                            placeholder="+1 (555) 987-6543"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email (Optional)</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newContact.email}
                            onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="primary"
                            checked={newContact.isPrimary}
                            onChange={(e) => setNewContact({...newContact, isPrimary: e.target.checked})}
                          />
                          <Label htmlFor="primary">Set as primary contact</Label>
                        </div>
                        <Button onClick={addContact} className="w-full">
                          Add Contact
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <div className="text-center py-8">
                    <Phone className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No emergency contacts added</p>
                    <Button onClick={() => setIsContactOpen(true)}>Add First Contact</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{contact.name}</span>
                            {contact.isPrimary && (
                              <Badge variant="default" className="text-xs">Primary</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground capitalize">{contact.relationship}</p>
                          <p className="text-sm font-mono">{contact.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => callContact(contact.phone)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteContact(contact.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card className="medical-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Medical Information
                  </CardTitle>
                  <Dialog open={isMedicalOpen} onOpenChange={setIsMedicalOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Edit className="w-4 h-4" />
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Update Medical Information</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="blood-type">Blood Type</Label>
                          <Select 
                            value={medicalInfo.bloodType}
                            onValueChange={(value) => saveMedicalInfo({...medicalInfo, bloodType: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="allergies">Allergies (comma separated)</Label>
                          <Textarea
                            id="allergies"
                            value={medicalInfo.allergies.join(', ')}
                            onChange={(e) => saveMedicalInfo({
                              ...medicalInfo, 
                              allergies: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                            })}
                            placeholder="Penicillin, Peanuts, Shellfish"
                          />
                        </div>
                        <div>
                          <Label htmlFor="medications">Current Medications</Label>
                          <Textarea
                            id="medications"
                            value={medicalInfo.medications.join(', ')}
                            onChange={(e) => saveMedicalInfo({
                              ...medicalInfo, 
                              medications: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                            })}
                            placeholder="Aspirin 100mg, Metformin 500mg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="conditions">Medical Conditions</Label>
                          <Textarea
                            id="conditions"
                            value={medicalInfo.conditions.join(', ')}
                            onChange={(e) => saveMedicalInfo({
                              ...medicalInfo, 
                              conditions: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                            })}
                            placeholder="Diabetes, Hypertension"
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes">Emergency Notes</Label>
                          <Textarea
                            id="notes"
                            value={medicalInfo.emergencyNotes}
                            onChange={(e) => saveMedicalInfo({...medicalInfo, emergencyNotes: e.target.value})}
                            placeholder="Additional important information"
                          />
                        </div>
                        <Button onClick={() => setIsMedicalOpen(false)} className="w-full">
                          Save Information
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Blood Type</Label>
                    <p className="text-lg font-semibold">{medicalInfo.bloodType || 'Not specified'}</p>
                  </div>
                  
                  {medicalInfo.allergies.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Allergies</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {medicalInfo.allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {medicalInfo.medications.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Medications</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {medicalInfo.medications.map((med, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {med}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {medicalInfo.conditions.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Conditions</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {medicalInfo.conditions.map((condition, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <div className="flex gap-2">
                      <Button 
                        onClick={generateEmergencyQR}
                        className="flex-1 flex items-center gap-2"
                        variant="outline"
                      >
                        <QrCode className="w-4 h-4" />
                        Generate QR
                      </Button>
                      <Button 
                        className="flex-1 flex items-center gap-2"
                        variant="outline"
                      >
                        <Share2 className="w-4 h-4" />
                        Share Info
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyContacts;