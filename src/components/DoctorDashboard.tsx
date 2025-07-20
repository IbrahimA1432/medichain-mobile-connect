import React, { useState, useEffect } from 'react';
import { Search, Plus, QrCode } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PatientCard, Patient } from './PatientCard';
import { QRCodeImage } from './QRCodeImage';
import { Badge } from './ui/badge';
import { useToast } from './ui/use-toast';
import { AddPatientDialog } from './AddPatientDialog'; 
import { patientService } from '../services/patientService';
import { PatientDetailsDialog } from './PatientDetailsDialog';
import { QRCodeScanner } from './QRCodeScanner';

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
  const [qrPatient, setQrPatient] = useState<Patient | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
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
      medications: patientData.medications || '',
      treatments: patientData.treatments || '',
      symptoms: patientData.symptoms || '',
      notes: patientData.notes || '',
      followUp: patientData.followUp || '',
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
    setPatients(savedPatients);
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
            No patients found. {searchTerm ? 'Try adjusting your search.' : 'Start by scanning a QR Code.'}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="relative">
                {/* QR code icon top left */}
                <button
                  className="absolute left-2 top-2 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                  title="Show QR Code"
                  onClick={() => { setQrPatient(patient); setShowQrModal(true); }}
                >
                  <QrCode className="w-5 h-5 text-primary" />
                </button>
                <PatientCard
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
              </div>
            ))}
      {/* QR Code Modal */}
      {showQrModal && qrPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative min-w-[320px]">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowQrModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h4 className="mb-4 text-lg font-semibold">Patient QR Code</h4>
            <QRCodeImage
              text={JSON.stringify({
                id: qrPatient.id,
                name: qrPatient.name,
                age: qrPatient.age,
                gender: qrPatient.gender,
                phone: qrPatient.phone,
                address: qrPatient.address,
                lastVisit: qrPatient.lastVisit,
                condition: qrPatient.condition,
                medications: qrPatient.medications,
                treatments: qrPatient.treatments,
                symptoms: qrPatient.symptoms,
                notes: qrPatient.notes,
                followUp: qrPatient.followUp,
                avatar: qrPatient.avatar
              })}
              size={200}
            />
            <div className="mt-2 text-sm text-muted-foreground text-center">
              Scan this QR code to transfer patient info
            </div>
          </div>
        </div>
      )}
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