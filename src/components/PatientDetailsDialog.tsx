import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Patient } from './PatientCard';
import { Edit2, Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PatientDetailsDialogProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (patient: Patient) => void;
}

export const PatientDetailsDialog = ({ patient, open, onClose, onUpdate }: PatientDetailsDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    setEditedPatient(patient);
    setIsEditing(false);
  }, [patient]);

  if (!patient || !editedPatient) return null;

  const handleSave = () => {
    if (editedPatient) {
      onUpdate(editedPatient);
      setIsEditing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle>Patient Details</DialogTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                {isEditing ? (
                  <Input
                    value={editedPatient.name}
                    onChange={(e) => setEditedPatient({ ...editedPatient, name: e.target.value })}
                  />
                ) : (
                  <p className="mt-1">{patient.name}</p>
                )}
              </div>
              <div>
                <Label>Age</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedPatient.age}
                    onChange={(e) => setEditedPatient({ ...editedPatient, age: parseInt(e.target.value) })}
                  />
                ) : (
                  <p className="mt-1">{patient.age}</p>
                )}
              </div>
              <div>
                <Label>Gender</Label>
                {isEditing ? (
                  <Select
                    value={editedPatient.gender}
                    onValueChange={(value) => setEditedPatient({ ...editedPatient, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1">{patient.gender}</p>
                )}
              </div>
              <div>
                <Label>Phone</Label>
                {isEditing ? (
                  <Input
                    value={editedPatient.phone}
                    onChange={(e) => setEditedPatient({ ...editedPatient, phone: e.target.value })}
                  />
                ) : (
                  <p className="mt-1">{patient.phone}</p>
                )}
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                {isEditing ? (
                  <Input
                    value={editedPatient.address}
                    onChange={(e) => setEditedPatient({ ...editedPatient, address: e.target.value })}
                  />
                ) : (
                  <p className="mt-1">{patient.address}</p>
                )}
              </div>
              <div>
                <Label>Condition</Label>
                {isEditing ? (
                  <Input
                    value={editedPatient.condition}
                    onChange={(e) => setEditedPatient({ ...editedPatient, condition: e.target.value })}
                  />
                ) : (
                  <p className="mt-1">{patient.condition}</p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {isEditing && (
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditing(false);
              setEditedPatient(patient);
            }}>
              Cancel
            </Button>
            <Button variant="medical" onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};