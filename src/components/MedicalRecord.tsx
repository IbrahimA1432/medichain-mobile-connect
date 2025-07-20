import { Calendar, FileText, Thermometer, Heart, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface MedicalRecordData {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  medications: string[];
  vitals: {
    temperature: string;
    bloodPressure: string;
    heartRate: string;
    weight: string;
  };
  notes: string;
  followUp?: string;
}

interface MedicalRecordProps {
  record: MedicalRecordData;
  isLatest?: boolean;
}

export const MedicalRecord = ({ record, isLatest }: MedicalRecordProps) => {
  return (
    <Card className={`${isLatest ? 'ring-2 ring-accent shadow-medical-md' : 'shadow-medical-sm'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Medical Record
            {isLatest && <Badge className="bg-accent text-accent-foreground">Latest</Badge>}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {record.date}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Dr. {record.doctor}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Diagnosis */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">Diagnosis</h4>
          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            {record.diagnosis}
          </p>
        </div>

        {/* Symptoms */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">Symptoms</h4>
          <div className="flex flex-wrap gap-2">
            {record.symptoms.map((symptom, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {symptom}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Vitals */}
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent" />
            Vital Signs
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-warning" />
              <span className="text-muted-foreground">Temp:</span>
              <span className="font-medium">{record.vitals.temperature}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-destructive" />
              <span className="text-muted-foreground">HR:</span>
              <span className="font-medium">{record.vitals.heartRate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">BP:</span>
              <span className="font-medium">{record.vitals.bloodPressure}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center text-xs font-bold text-success">W</span>
              <span className="text-muted-foreground">Weight:</span>
              <span className="font-medium">{record.vitals.weight}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Treatment */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">Treatment</h4>
          <p className="text-sm text-muted-foreground">{record.treatment}</p>
        </div>

        {/* Medications */}
        {record.medications.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground mb-2">Medications</h4>
            <div className="space-y-1">
              {record.medications.map((medication, index) => (
                <div key={index} className="text-sm text-muted-foreground bg-success/10 p-2 rounded">
                  • {medication}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {record.notes && (
          <div>
            <h4 className="font-semibold text-foreground mb-2">Notes</h4>
            <p className="text-sm text-muted-foreground italic">{record.notes}</p>
          </div>
        )}

        {/* Follow-up */}
        {record.followUp && (
          <div className="bg-accent/10 p-3 rounded-md">
            <h4 className="font-semibold text-accent mb-1">Follow-up</h4>
            <p className="text-sm text-muted-foreground">{record.followUp}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export type { MedicalRecordData };