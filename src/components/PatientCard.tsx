import { Calendar, MapPin, Phone, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  lastVisit: string;
  condition: string;
  medications: string;
  treatments: string;
  symptoms: string;
  notes: string;
  followUp: string;
  avatar?: string;
}
interface PatientCardProps {
  patient: Patient;
  onSelect?: (patient: Patient) => void;
  onViewRecords?: (patient: Patient) => void;
  onDelete?: (patientId: string) => void;
  isSelected?: boolean;
  role: 'doctor' | 'patient';
}

export const PatientCard = ({ patient, onSelect, onViewRecords, onDelete, isSelected, role }: PatientCardProps) => {
  return (
    <Card 
      className={`transition-all duration-300 cursor-pointer hover:shadow-medical-md ${
        isSelected ? 'ring-2 ring-primary shadow-medical-glow' : ''
      } ${role === 'patient' ? 'bg-gradient-card' : ''}`}
      onClick={() => onSelect?.(patient)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={patient.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{patient.name}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{patient.age} years • {patient.gender}</span>
              <Badge variant="outline" className="text-xs">
                {patient.condition}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{patient.phone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{patient.address}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last visit: {patient.lastVisit}</span>
          </div>
        </div>

        {role === 'doctor' && onViewRecords && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-3"
            onClick={(e) => {
              e.stopPropagation();
              onViewRecords(patient);
            }}
          >
            <User className="w-4 h-4" />
            View Records
          </Button>
        )}
        {role === 'doctor' && onDelete && (
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full mt-2"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(patient.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
            Delete Patient
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export type { Patient };