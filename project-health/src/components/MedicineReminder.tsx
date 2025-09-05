import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Pill, 
  Clock, 
  Plus, 
  Bell, 
  Check,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string[];
  startDate: string;
  endDate: string;
  taken: boolean;
  nextDose: string;
}

const MedicineReminder = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    frequency: 'once',
    times: ['09:00'],
    startDate: '',
    endDate: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('medicines');
    if (saved) {
      setMedicines(JSON.parse(saved));
    }
  }, []);

  const saveMedicines = (updatedMedicines: Medicine[]) => {
    setMedicines(updatedMedicines);
    localStorage.setItem('medicines', JSON.stringify(updatedMedicines));
  };

  const addMedicine = () => {
    if (!newMedicine.name || !newMedicine.dosage) {
      toast({
        title: "Missing Information",
        description: "Please fill in medicine name and dosage",
        variant: "destructive"
      });
      return;
    }

    const medicine: Medicine = {
      id: Date.now().toString(),
      name: newMedicine.name,
      dosage: newMedicine.dosage,
      frequency: newMedicine.frequency,
      time: newMedicine.times,
      startDate: newMedicine.startDate || new Date().toISOString().split('T')[0],
      endDate: newMedicine.endDate || '',
      taken: false,
      nextDose: newMedicine.times[0]
    };

    saveMedicines([...medicines, medicine]);
    setNewMedicine({
      name: '',
      dosage: '',
      frequency: 'once',
      times: ['09:00'],
      startDate: '',
      endDate: ''
    });
    setIsOpen(false);

    toast({
      title: "Medicine Added",
      description: `${medicine.name} reminder has been set`,
    });
  };

  const markAsTaken = (id: string) => {
    const updated = medicines.map(med => 
      med.id === id ? { ...med, taken: true } : med
    );
    saveMedicines(updated);
    
    toast({
      title: "Medicine Taken",
      description: "Marked as taken successfully",
    });
  };

  const deleteMedicine = (id: string) => {
    const updated = medicines.filter(med => med.id !== id);
    saveMedicines(updated);
    
    toast({
      title: "Medicine Removed",
      description: "Reminder has been deleted",
    });
  };

  const getTimeStatus = (time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const medicineTime = new Date();
    medicineTime.setHours(hours, minutes, 0, 0);
    
    if (now > medicineTime) return 'overdue';
    if (now.getTime() - medicineTime.getTime() < 30 * 60 * 1000) return 'due';
    return 'upcoming';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-medical-light to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Medicine Reminders</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Never miss a dose with our intelligent medicine reminder system
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Pill className="w-5 h-5 text-primary" />
              Your Medications
            </h3>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Medicine
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Medicine</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="medicine-name">Medicine Name</Label>
                    <Input
                      id="medicine-name"
                      value={newMedicine.name}
                      onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                      placeholder="e.g., Aspirin"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      value={newMedicine.dosage}
                      onChange={(e) => setNewMedicine({...newMedicine, dosage: e.target.value})}
                      placeholder="e.g., 100mg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select 
                      value={newMedicine.frequency} 
                      onValueChange={(value) => setNewMedicine({...newMedicine, frequency: value})}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={newMedicine.startDate}
                        onChange={(e) => setNewMedicine({...newMedicine, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={newMedicine.endDate}
                        onChange={(e) => setNewMedicine({...newMedicine, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={addMedicine} className="w-full">
                    Add Medicine
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {medicines.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Pill className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No medicines added yet</p>
                <Button onClick={() => setIsOpen(true)}>Add Your First Medicine</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {medicines.map((medicine) => {
                const status = getTimeStatus(medicine.nextDose);
                return (
                  <Card key={medicine.id} className="medical-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            medicine.taken ? 'bg-success/10' : 
                            status === 'overdue' ? 'bg-destructive/10' : 
                            status === 'due' ? 'bg-warning/10' : 'bg-primary/10'
                          }`}>
                            <Pill className={`w-6 h-6 ${
                              medicine.taken ? 'text-success' : 
                              status === 'overdue' ? 'text-destructive' : 
                              status === 'due' ? 'text-warning' : 'text-primary'
                            }`} />
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-lg">{medicine.name}</h4>
                            <p className="text-muted-foreground">{medicine.dosage} • {medicine.frequency}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Next dose: {medicine.nextDose}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge variant={
                            medicine.taken ? 'default' : 
                            status === 'overdue' ? 'destructive' : 
                            status === 'due' ? 'secondary' : 'outline'
                          }>
                            {medicine.taken ? 'Taken' : 
                             status === 'overdue' ? 'Overdue' : 
                             status === 'due' ? 'Due Now' : 'Upcoming'}
                          </Badge>
                          
                          {!medicine.taken && (
                            <Button
                              size="sm"
                              onClick={() => markAsTaken(medicine.id)}
                              className="flex items-center gap-1"
                            >
                              <Check className="w-4 h-4" />
                              Take
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteMedicine(medicine.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MedicineReminder;