import { Patient } from '../components/PatientCard';

const STORAGE_KEY = 'medichain_patients';

export const patientService = {
  getAll: (): Patient[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  save: (patients: Patient[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  },

  add: (patient: Patient): Patient[] => {
    const patients = patientService.getAll();
    patients.push(patient);
    patientService.save(patients);
    return patients;
  },

  update: (updatedPatient: Patient): Patient[] => {
    const patients = patientService.getAll();
    const index = patients.findIndex(p => p.id === updatedPatient.id);
    if (index !== -1) {
      patients[index] = updatedPatient;
      patientService.save(patients);
    }
    return patients;
  },

  delete: (patientId: string): Patient[] => {
    const patients = patientService.getAll();
    const filtered = patients.filter(p => p.id !== patientId);
    patientService.save(filtered);
    return filtered;
  }
};