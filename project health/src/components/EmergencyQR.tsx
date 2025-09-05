import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { QrCode, AlertTriangle, Heart, Phone, Download, Edit, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EmergencyInfo {
  name: string;
  age: string;
  bloodType: string;
  allergies: string;
  medications: string;
  conditions: string;
  emergencyContact1: string;
  emergencyContact2: string;
  doctor: string;
  insurance: string;
  notes: string;
}

const EmergencyQR = () => {
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyInfo>({
    name: 'John Doe',
    age: '32',
    bloodType: 'O+',
    allergies: 'Penicillin, Shellfish',
    medications: 'Lisinopril 10mg daily, Metformin 500mg twice daily',
    conditions: 'Hypertension, Type 2 Diabetes',
    emergencyContact1: 'Jane Doe (Wife) - +1-555-0123',
    emergencyContact2: 'Mark Doe (Brother) - +1-555-0456',
    doctor: 'Dr. Sarah Wilson - City General Hospital - +1-555-0789',
    insurance: 'Blue Cross Blue Shield - Policy #BC123456789',
    notes: 'Patient prefers right arm for blood pressure. Diabetic - check blood sugar if unconscious.'
  });

  useEffect(() => {
    generateQRCode();
  }, [emergencyInfo]);

  const generateQRCode = () => {
    const data = {
      type: 'MEDICAL_EMERGENCY',
      name: emergencyInfo.name,
      age: emergencyInfo.age,
      bloodType: emergencyInfo.bloodType,
      allergies: emergencyInfo.allergies,
      medications: emergencyInfo.medications,
      conditions: emergencyInfo.conditions,
      emergencyContacts: [emergencyInfo.emergencyContact1, emergencyInfo.emergencyContact2],
      doctor: emergencyInfo.doctor,
      insurance: emergencyInfo.insurance,
      notes: emergencyInfo.notes,
      lastUpdated: new Date().toISOString()
    };

    // In a real app, you'd generate an actual QR code image
    // For demo, we'll create a data URL that represents the info
    const qrData = btoa(JSON.stringify(data));
    setQrCodeData(qrData);
  };

  const handleSave = () => {
    generateQRCode();
    setIsEditModalOpen(false);
    
    toast({
      title: "Emergency Info Updated",
      description: "Your QR code has been regenerated with the new information",
    });
  };

  const downloadQRCode = () => {
    // In a real implementation, this would download the actual QR code image
    toast({
      title: "QR Code Downloaded",
      description: "Emergency QR code saved to your device",
    });
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Emergency Medical Information',
          text: 'Emergency medical QR code for quick access to critical health information',
          url: window.location.href
        });
      } catch (error) {
        // Share was cancelled or failed
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Emergency info link copied to clipboard",
      });
    }
  };

  const getCriticalityBadge = (field: string, value: string) => {
    if (!value || value.trim() === '') return null;
    
    const criticalFields = ['allergies', 'medications', 'conditions'];
    if (criticalFields.includes(field.toLowerCase())) {
      return <Badge variant="destructive" className="ml-2">Critical</Badge>;
    }
    return null;
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <QrCode className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-3xl font-bold">Emergency QR Code</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick access to critical medical information for emergency responders
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Code Display */}
          <div className="space-y-6">
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-red-700 dark:text-red-300">Emergency Access</CardTitle>
                </div>
                <CardDescription>
                  Scan this QR code to access critical medical information
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {/* Mock QR Code Display */}
                <div className="bg-white p-8 rounded-lg shadow-inner mx-auto max-w-xs">
                  <div className="aspect-square bg-black/90 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1 p-4">
                      {Array.from({ length: 64 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 ${
                            Math.random() > 0.5 ? 'bg-white' : 'bg-black'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Medical Emergency QR Code</p>
                </div>

                <div className="flex gap-2 justify-center">
                  <Button onClick={downloadQRCode} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={shareQRCode} variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800 dark:text-amber-200">
                      <p className="font-medium mb-1">Important:</p>
                      <p>Keep this QR code accessible on your phone's lock screen or print it for your wallet. Update information regularly.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Usage Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <p className="text-sm">Save QR code to your phone's photos or print it</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <p className="text-sm">Emergency responders can scan to access critical info</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <p className="text-sm">Update information regularly for accuracy</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Emergency Information</CardTitle>
                  <CardDescription>
                    Critical details for first responders
                  </CardDescription>
                </div>
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Emergency Information</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={emergencyInfo.name}
                            onChange={(e) => setEmergencyInfo({...emergencyInfo, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            value={emergencyInfo.age}
                            onChange={(e) => setEmergencyInfo({...emergencyInfo, age: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bloodType">Blood Type</Label>
                        <Input
                          id="bloodType"
                          value={emergencyInfo.bloodType}
                          onChange={(e) => setEmergencyInfo({...emergencyInfo, bloodType: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="allergies">Allergies (Critical)</Label>
                        <Textarea
                          id="allergies"
                          value={emergencyInfo.allergies}
                          onChange={(e) => setEmergencyInfo({...emergencyInfo, allergies: e.target.value})}
                          placeholder="List all known allergies"
                        />
                      </div>

                      <div>
                        <Label htmlFor="medications">Current Medications</Label>
                        <Textarea
                          id="medications"
                          value={emergencyInfo.medications}
                          onChange={(e) => setEmergencyInfo({...emergencyInfo, medications: e.target.value})}
                          placeholder="List all current medications and dosages"
                        />
                      </div>

                      <div>
                        <Label htmlFor="conditions">Medical Conditions</Label>
                        <Textarea
                          id="conditions"
                          value={emergencyInfo.conditions}
                          onChange={(e) => setEmergencyInfo({...emergencyInfo, conditions: e.target.value})}
                          placeholder="List chronic conditions, disabilities, etc."
                        />
                      </div>

                      <div>
                        <Label htmlFor="emergencyContact1">Emergency Contact 1</Label>
                        <Input
                          id="emergencyContact1"
                          value={emergencyInfo.emergencyContact1}
                          onChange={(e) => setEmergencyInfo({...emergencyInfo, emergencyContact1: e.target.value})}
                          placeholder="Name, relationship, phone number"
                        />
                      </div>

                      <div>
                        <Label htmlFor="emergencyContact2">Emergency Contact 2</Label>
                        <Input
                          id="emergencyContact2"
                          value={emergencyInfo.emergencyContact2}
                          onChange={(e) => setEmergencyInfo({...emergencyInfo, emergencyContact2: e.target.value})}
                          placeholder="Name, relationship, phone number"
                        />
                      </div>

                      <div>
                        <Label htmlFor="doctor">Primary Doctor</Label>
                        <Input
                          id="doctor"
                          value={emergencyInfo.doctor}
                          onChange={(e) => setEmergencyInfo({...emergencyInfo, doctor: e.target.value})}
                          placeholder="Doctor name, hospital, contact"
                        />
                      </div>

                      <div>
                        <Label htmlFor="insurance">Insurance Information</Label>
                        <Input
                          id="insurance"
                          value={emergencyInfo.insurance}
                          onChange={(e) => setEmergencyInfo({...emergencyInfo, insurance: e.target.value})}
                          placeholder="Insurance provider and policy number"
                        />
                      </div>

                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={emergencyInfo.notes}
                          onChange={(e) => setEmergencyInfo({...emergencyInfo, notes: e.target.value})}
                          placeholder="Any other important medical information"
                        />
                      </div>

                      <Button onClick={handleSave} className="w-full">
                        Save and Update QR Code
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">Name:</span>
                      <span className="ml-2">{emergencyInfo.name}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">Age:</span>
                      <span className="ml-2">{emergencyInfo.age} years old</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">Blood Type:</span>
                      <span className="ml-2">{emergencyInfo.bloodType}</span>
                      <Badge variant="outline" className="ml-2">Critical</Badge>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start">
                      <span className="font-medium text-sm">Allergies:</span>
                      <div className="ml-2 flex-1">
                        <span className="text-red-600 dark:text-red-400">{emergencyInfo.allergies}</span>
                        {getCriticalityBadge('allergies', emergencyInfo.allergies)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start">
                      <span className="font-medium text-sm">Medications:</span>
                      <div className="ml-2 flex-1">
                        <span>{emergencyInfo.medications}</span>
                        {getCriticalityBadge('medications', emergencyInfo.medications)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start">
                      <span className="font-medium text-sm">Conditions:</span>
                      <div className="ml-2 flex-1">
                        <span>{emergencyInfo.conditions}</span>
                        {getCriticalityBadge('conditions', emergencyInfo.conditions)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start">
                      <span className="font-medium text-sm">Emergency Contacts:</span>
                      <div className="ml-2 space-y-1">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span className="text-sm">{emergencyInfo.emergencyContact1}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span className="text-sm">{emergencyInfo.emergencyContact2}</span>
                        </div>
                      </div>
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

export default EmergencyQR;