import { useState, useEffect } from 'react';
import { Heart, Activity, Calendar, Share2, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MedicalRecord, MedicalRecordData } from './MedicalRecord';
import { Badge } from './ui/badge';

// Mock patient data
const mockPatientData = {
  name: 'Sarah Johnson',
  age: 34,
  gender: 'Female',
  bloodType: 'O+',
  allergies: ['Penicillin', 'Shellfish'],
  emergencyContact: '+1 (555) 999-1234'
};

// Mock medical records
const mockRecords: MedicalRecordData[] = [
  {
    id: 'record_1',
    date: '2024-01-15',
    doctor: 'Dr. Smith',
    diagnosis: 'Diabetes Type 2 - Well controlled',
    symptoms: ['Fatigue', 'Increased thirst'],
    treatment: 'Continue current medication regimen, monitor blood glucose levels',
    medications: ['Metformin 500mg twice daily', 'Lisinopril 10mg daily'],
    vitals: {
      temperature: '98.6°F',
      bloodPressure: '125/80',
      heartRate: '72 bpm',
      weight: '150 lbs'
    },
    notes: 'Patient shows good compliance with medication. Blood sugar levels stable.',
    followUp: 'Return in 3 months for routine follow-up'
  },
  {
    id: 'record_2',
    date: '2023-10-10',
    doctor: 'Dr. Smith',
    diagnosis: 'Annual Physical Examination',
    symptoms: ['None reported'],
    treatment: 'Routine physical examination, all systems normal',
    medications: ['Metformin 500mg twice daily'],
    vitals: {
      temperature: '98.4°F',
      bloodPressure: '118/75',
      heartRate: '68 bpm',
      weight: '148 lbs'
    },
    notes: 'Annual physical completed. Patient in good health.',
    followUp: 'Next annual physical in 12 months'
  }
];

export const PatientDashboard = () => {
  const [records] = useState<MedicalRecordData[]>(mockRecords);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecordData | null>(null);

  useEffect(() => {
    // Set the latest record as selected by default
    if (records.length > 0) {
      setSelectedRecord(records[0]);
    }
  }, [records]);

  const handleShareRecord = () => {
    // Simulate sharing functionality
    alert('Record sharing functionality would integrate with NFC here');
  };

  const handleDownloadRecord = () => {
    // Simulate download functionality
    alert('Record download functionality');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Patient Info Header */}
      <Card className="bg-gradient-card shadow-medical-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent" />
            My Medical Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <p className="font-medium">{mockPatientData.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Age:</span>
              <p className="font-medium">{mockPatientData.age} years</p>
            </div>
            <div>
              <span className="text-muted-foreground">Gender:</span>
              <p className="font-medium">{mockPatientData.gender}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Blood Type:</span>
              <p className="font-medium">{mockPatientData.bloodType}</p>
            </div>
          </div>
          
          <div>
            <span className="text-muted-foreground">Allergies:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {mockPatientData.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <span className="text-muted-foreground">Emergency Contact:</span>
            <p className="font-medium">{mockPatientData.emergencyContact}</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={handleShareRecord} className="w-full">
          <Share2 className="w-4 h-4" />
          Share via NFC
        </Button>
        <Button variant="outline" onClick={handleDownloadRecord} className="w-full">
          <Download className="w-4 h-4" />
          Download Records
        </Button>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Medical History ({records.length} records)
        </h3>
        
        {records.length === 0 ? (
          <Card className="p-8 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No medical records found</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {records.map((record, index) => (
              <MedicalRecord
                key={record.id}
                record={record}
                isLatest={index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};