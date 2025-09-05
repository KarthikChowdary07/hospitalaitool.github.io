import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus, UserCircle, Calendar, Weight, Activity } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  bloodGroup: string;
  conditions: string[];
  lastCheckup: string;
}

const FamilyProfiles = () => {
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<string>('self');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: 'self',
      name: 'You',
      relation: 'Self',
      age: 32,
      bloodGroup: 'O+',
      conditions: ['Hypertension'],
      lastCheckup: '2024-08-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      relation: 'Spouse',
      age: 29,
      bloodGroup: 'A+',
      conditions: ['Diabetes Type 2'],
      lastCheckup: '2024-07-20'
    },
    {
      id: '3',
      name: 'Emma Johnson',
      relation: 'Daughter',
      age: 8,
      bloodGroup: 'O+',
      conditions: ['Asthma'],
      lastCheckup: '2024-09-01'
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    relation: '',
    age: '',
    bloodGroup: '',
    conditions: ''
  });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.relation || !newMember.age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const member: FamilyMember = {
      id: Date.now().toString(),
      name: newMember.name,
      relation: newMember.relation,
      age: parseInt(newMember.age),
      bloodGroup: newMember.bloodGroup || 'Unknown',
      conditions: newMember.conditions ? newMember.conditions.split(',').map(c => c.trim()) : [],
      lastCheckup: new Date().toISOString().split('T')[0]
    };

    setFamilyMembers([...familyMembers, member]);
    setNewMember({ name: '', relation: '', age: '', bloodGroup: '', conditions: '' });
    setIsAddModalOpen(false);

    toast({
      title: "Success",
      description: "Family member added successfully",
    });
  };

  const switchProfile = (memberId: string) => {
    setSelectedMember(memberId);
    const member = familyMembers.find(m => m.id === memberId);
    toast({
      title: "Profile Switched",
      description: `Now viewing ${member?.name}'s health profile`,
    });
  };

  const currentMember = familyMembers.find(m => m.id === selectedMember);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-3xl font-bold">Family Health Profiles</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage health profiles for your entire family in one place
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Family Members List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Family Members</CardTitle>
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Family Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={newMember.name}
                          onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                          placeholder="Enter name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="relation">Relation *</Label>
                        <Select value={newMember.relation} onValueChange={(value) => setNewMember({...newMember, relation: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Spouse">Spouse</SelectItem>
                            <SelectItem value="Child">Child</SelectItem>
                            <SelectItem value="Parent">Parent</SelectItem>
                            <SelectItem value="Sibling">Sibling</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="age">Age *</Label>
                        <Input
                          id="age"
                          type="number"
                          value={newMember.age}
                          onChange={(e) => setNewMember({...newMember, age: e.target.value})}
                          placeholder="Enter age"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Select value={newMember.bloodGroup} onValueChange={(value) => setNewMember({...newMember, bloodGroup: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
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
                        <Label htmlFor="conditions">Medical Conditions</Label>
                        <Input
                          id="conditions"
                          value={newMember.conditions}
                          onChange={(e) => setNewMember({...newMember, conditions: e.target.value})}
                          placeholder="Enter conditions (comma separated)"
                        />
                      </div>
                      <Button onClick={handleAddMember} className="w-full">
                        Add Member
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {familyMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMember === member.id 
                          ? 'bg-primary/10 border-primary' 
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => switchProfile(member.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.relation}</p>
                        </div>
                        {selectedMember === member.id && (
                          <Badge variant="secondary">Active</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Member Profile */}
          <div className="lg:col-span-2">
            {currentMember && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg">
                          {currentMember.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl">{currentMember.name}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span>{currentMember.relation} • {currentMember.age} years old</span>
                          <Badge variant="outline">{currentMember.bloodGroup}</Badge>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Medical Conditions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {currentMember.conditions.length > 0 ? (
                          currentMember.conditions.map((condition, index) => (
                            <Badge key={index} variant="secondary">
                              {condition}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-muted-foreground">No conditions recorded</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Last Checkup
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold">
                        {new Date(currentMember.lastCheckup).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {Math.floor((Date.now() - new Date(currentMember.lastCheckup).getTime()) / (1000 * 60 * 60 * 24))} days ago
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                        <UserCircle className="h-6 w-6" />
                        <span className="text-sm">View Profile</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                        <Calendar className="h-6 w-6" />
                        <span className="text-sm">Book Appointment</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                        <Weight className="h-6 w-6" />
                        <span className="text-sm">Add Vitals</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                        <Activity className="h-6 w-6" />
                        <span className="text-sm">View Reports</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyProfiles;