import React, { useState } from 'react';
import { Search, Plus, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PatientCard, Patient } from './PatientCard';
import { QRCodeScanner } from './QRCodeScanner';
import { Badge } from './ui/badge';

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
  {
    id: 'patient_2',
    name: 'Michael Chen',
    age: 45,
    gender: 'Male',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Avenue, Springfield',
    lastVisit: '2024-01-10',
    condition: 'Hypertension'
  },
  {
    id: 'patient_3',
    name: 'Emily Rodriguez',
    age: 28,
    gender: 'Female',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Road, Springfield',
    lastVisit: '2024-01-08',
    condition: 'Asthma'
  }
];

interface DoctorDashboardProps {
  onPatientSelect: (patient: Patient) => void;
}

export const DoctorDashboard = ({ onPatientSelect }: DoctorDashboardProps) => {
  const [patients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  const filteredPatients = patients.filter(patient =>
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
    setSelectedPatient(safePatient);
    onPatientSelect(safePatient);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Status Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Patient Management</h2>
        <div className="flex items-center gap-2">
          <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
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
              <Button variant="medical" size="sm">
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
                No patients found. {searchTerm ? 'Try adjusting your search.' : 'Start by scanning a patient QR code.'}
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
                    onViewRecords={onPatientSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};