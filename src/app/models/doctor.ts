import { Department } from './department';

export interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: Department;
  specialization: string;
  licenseNumber: string;
  experienceYears: number;
  consultationFee: number;
  bio: string;
  active: boolean;
}