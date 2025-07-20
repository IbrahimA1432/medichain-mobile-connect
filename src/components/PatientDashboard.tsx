import { useState, useEffect } from 'react';
import { Heart, Activity, Calendar, Download, QrCode, Scan } from 'lucide-react';
import { QRCodeImage } from './QRCodeImage';
import { QRCodeScanner } from './QRCodeScanner';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MedicalRecord, MedicalRecordData } from './MedicalRecord';
import { Badge } from './ui/badge';

// Initial patient data (empty for real use)
const initialPatientData = {
  id: '',
  name: '',
  age: '',
  gender: '',
  bloodType: '',
  allergies: [],
  emergencyContact: ''
};

// Mock medical records (for demo)
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
  const [patientData, setPatientData] = useState<any>(initialPatientData);
  const [showQR, setShowQR] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (records.length > 0) {
      setSelectedRecord(records[0]);
    }
  }, [records]);

  // Handle QR scan and update patient info
  const handleQRScan = (scanned: any) => {
    try {
      const data = typeof scanned === 'string' ? JSON.parse(scanned) : scanned;
      if (data && data.id && data.name) {
        setPatientData(data);
        setShowScanner(false);
        alert('Profile updated from QR code!');
      } else {
        alert('Scanned QR code does not contain valid patient info.');
      }
    } catch (e) {
      alert('Invalid QR code format.');
      setShowScanner(false);
    }
  };

  const handleShowQR = () => setShowQR(true);


  return (
    <div className="p-6 space-y-6">
      {/* Patient Info Header */}
      <Card className="bg-gradient-card shadow-medical-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent" />
            My Medical Profile
            <Button variant="outline" size="icon" onClick={handleShowQR} className="ml-auto">
              <QrCode className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowScanner(true)} className="ml-2" title="Scan QR to update profile">
              <Scan className="w-5 h-5" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* QR Code Scanner Modal */}
          {showScanner && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative min-w-[320px]">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                  onClick={() => setShowScanner(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <h4 className="mb-4 text-lg font-semibold">Scan Doctor's QR Code</h4>
                <QRCodeScanner onScanComplete={handleQRScan} />
                <div className="mt-2 text-sm text-muted-foreground text-center">
                  Scan the QR code shown by your doctor to update your profile
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <p className="font-medium">{patientData.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Age:</span>
              <p className="font-medium">{patientData.age} years</p>
            </div>
            <div>
              <span className="text-muted-foreground">Gender:</span>
              <p className="font-medium">{patientData.gender}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span>
              <p className="font-medium">{patientData.phone}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Address:</span>
              <p className="font-medium">{patientData.address}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Last Visit:</span>
              <p className="font-medium">{patientData.lastVisit}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Condition:</span>
              <p className="font-medium">{patientData.condition}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Medications:</span>
              <p className="font-medium">{patientData.medications}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Treatments:</span>
              <p className="font-medium">{patientData.treatments}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Symptoms:</span>
              <p className="font-medium">{patientData.symptoms}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Notes:</span>
              <p className="font-medium">{patientData.notes}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Follow Up:</span>
              <p className="font-medium">{patientData.followUp}</p>
            </div>
          </div>
          {showQR && (
            <div className="flex flex-col items-center gap-2 mt-4">
              {/* Always include all fields required by the Patient interface for QR code */}
              <QRCodeImage
                text={JSON.stringify({
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
                })}
                size={180}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={handleShowQR} className="w-full">
          <QrCode className="w-4 h-4" />
          Show QR Code
        </Button>
        <Button variant="outline" onClick={() => alert('Record download functionality')} className="w-full">
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