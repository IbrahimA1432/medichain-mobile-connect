import { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Header } from '@/components/Header';
import { DoctorDashboard } from '@/components/DoctorDashboard';
import { PatientDashboard } from '@/components/PatientDashboard';
import { Patient } from '@/components/PatientCard';

const Index = () => {
  const [userRole, setUserRole] = useState<'doctor' | 'patient'>('doctor');
  const [userName] = useState('Dr. Johnson');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleRoleSwitch = () => {
    setUserRole(prev => prev === 'doctor' ? 'patient' : 'doctor');
    setSelectedPatient(null);
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  return (
    <MobileLayout>
      <Header 
        role={userRole}
        userName={userName}
        onRoleSwitch={handleRoleSwitch}
      />
      
      {userRole === 'doctor' ? (
        <DoctorDashboard onPatientSelect={handlePatientSelect} />
      ) : (
        <PatientDashboard />
      )}
    </MobileLayout>
  );
};

export default Index;
