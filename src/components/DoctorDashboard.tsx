import React, { useState, useEffect } from 'react';
import { Search, Plus, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PatientCard, Patient } from './PatientCard';
import { NFCScanner } from './NFCScanner';
import { Badge } from './ui/badge';
import { useToast } from './ui/use-toast';
import { AddPatientDialog } from './AddPatientDialog'; 
import { patientService } from '../services/patientService';
import { PatientDetailsDialog } from './PatientDetailsDialog';
import { QRCodeScanner } from './QRCodeScanner';
// Mock patient data
const mockPatients: Patient[] = [
  {
    id: 'patient_1',
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    phone: '+1 (555) 123-4567',
    address: '123 Maple Street, Springfield',
    lastVisit: '2024-01-15',
    condition: 'Diabetes Type 2'
  },
];

interface DoctorDashboardProps {
  onPatientSelect: (patient: Patient) => void;
}

export const DoctorDashboard = ({ onPatientSelect }: DoctorDashboardProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const { toast } = useToast();
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleQRScan = (patientData: any) => {
    // Defensive: check for required fields, provide fallbacks
    if (!patientData || typeof patientData !== 'object' || !patientData.name) {
      alert('Scanned QR code does not contain valid patient info.');
      return;
    }
    const safePatient = {
      id: patientData.id || 'unknown',
      name: patientData.name || 'Unknown',
      age: patientData.age || 0,
      gender: patientData.gender || 'Unknown',
      phone: patientData.phone || 'N/A',
      address: patientData.address || 'N/A',
      lastVisit: patientData.lastVisit || 'N/A',
      condition: patientData.condition || 'N/A',
      avatar: patientData.avatar || undefined
    };
    const existingPatient = patients.find(p => p.id === safePatient.id);
  
  if (existingPatient) {
    setSelectedPatient(existingPatient);
    setIsViewingDetails(true); // Open the details dialog
    onPatientSelect(existingPatient);
  } else {
    // Add new patient and show their details
    const updatedPatients = patientService.add(safePatient);
    setPatients(updatedPatients);
    setSelectedPatient(safePatient);
    setIsViewingDetails(true); // Open the details dialog
    onPatientSelect(safePatient);
    
    toast({
      title: 'Success',
      description: `Added new patient record for ${safePatient.name}.`
    });
  }
};
  // Load patients on component mount
  useEffect(() => {
    const savedPatients = patientService.getAll();
    setPatients(savedPatients.length ? savedPatients : mockPatients);
  }, []);

  const handleAddPatient = (newPatient: Omit<Patient, 'id'>) => {
    const patientWithId = {
      ...newPatient,
      id: `patient_${Date.now()}` // Use timestamp for unique ID
    };
    
    const updatedPatients = patientService.add(patientWithId);
    setPatients(updatedPatients);
    setIsAddPatientOpen(false);
    
    toast({
      title: 'Success',
      description: `Patient ${newPatient.name} has been added.`
    });
  };

  const handleDeletePatient = (patientId: string) => {
    if (window.confirm('Are you sure you want to delete this patient record? This action cannot be undone.')) {
      const updatedPatients = patientService.delete(patientId);
      setPatients(updatedPatients);
      
      if (selectedPatient?.id === patientId) {
        setSelectedPatient(null);
      }
      
      toast({
        title: 'Success',
        description: 'Patient record has been deleted.',
        variant: 'destructive'
      });
    }
  };
  const handleUpdatePatient = (updatedPatient: Patient) => {
    const updatedPatients = patientService.update(updatedPatient);
    setPatients(updatedPatients);
    setSelectedPatient(updatedPatient);
    
    toast({
      title: 'Success',
      description: `Patient ${updatedPatient.name}'s information has been updated.`
    });
  };
  const handleNFCScan = (patientId: string) => {
    const existingPatient = patients.find(p => p.id === patientId);
    
    if (existingPatient) {
      setSelectedPatient(existingPatient);
      onPatientSelect(existingPatient);
    } else {
      const newPatient = {
        id: patientId,
        name: 'New NFC Patient',
        age: 0,
        gender: 'Unknown',
        phone: '',
        address: 'NFC Scanned Patient',
        lastVisit: new Date().toISOString().split('T')[0],
        condition: 'Initial Checkup'
      };
      
      const updatedPatients = patientService.add(newPatient);
      setPatients(updatedPatients);
      setSelectedPatient(newPatient);
      onPatientSelect(newPatient);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Status Bar */}
      <div className="flex items-center justify-center">
        <h2 className="text-xl font-semibold text-foreground">Patient Management</h2>
        <div className="flex items-center gap-2">
        </div>
      </div>

      {selectedPatient ? (
        <div className="space-y-4">
          <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>
            ← Back
          </Button>
          {selectedPatient && selectedPatient.name && selectedPatient.age !== undefined && selectedPatient.gender && selectedPatient.phone && selectedPatient.address && selectedPatient.lastVisit && selectedPatient.condition ? (
            <PatientCard
              patient={selectedPatient}
              role="doctor"
              isSelected={true}
              onViewRecords={onPatientSelect}
            />
          ) : (
            <div className="text-destructive text-center p-4 border border-destructive rounded">
              Error: Scanned QR code does not contain valid or complete patient info.<br />
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setSelectedPatient(null)}>Scan Again</Button>
            </div>
          )}
          </div>
      ) : (
        <>
          {/* QR Code Scanner */}
          <QRCodeScanner onScanComplete={handleQRScan} />
        </>
      )}
      {/* Search and Add Patient */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="medical" size="sm" onClick={() => setIsAddPatientOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Patients List */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-foreground">
          Recent Patients ({filteredPatients.length})
        </h3>
        
        {filteredPatients.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No patients found. {searchTerm ? 'Try adjusting your search.' : 'Start by scanning an NFC device.'}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                role="doctor"
                isSelected={selectedPatient?.id === patient.id}
                onSelect={(patient) => {
                  setSelectedPatient(patient);
                  onPatientSelect(patient);
                }}
                onViewRecords={() => {
                  setSelectedPatient(patient);
                  setIsViewingDetails(true);
                }}
                onDelete={handleDeletePatient}
              />
            ))}
          </div>
        
        )}
      </div>
      {/* Patient Details Dialog */}
        <PatientDetailsDialog
          patient={selectedPatient}
          open={isViewingDetails}
          onClose={() => setIsViewingDetails(false)}
          onUpdate={handleUpdatePatient}
        />
        {/* Add Patient Dialog */}
        <AddPatientDialog
          open={isAddPatientOpen}
          onClose={() => setIsAddPatientOpen(false)}
          onSubmit={handleAddPatient}
        />
    </div>
  );
};