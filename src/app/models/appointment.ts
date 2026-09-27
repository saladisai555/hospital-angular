export enum AppointmentStatus {
  BOOKED = 'BOOKED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  NO_SHOW = 'NO_SHOW'
}

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  departmentName: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  reason: string;
  notes: string;
  createdAt: string;
}


export interface AppointmentBookingRequest {
  doctorId: number;
  appointmentDate: string;
  startTime: string;
  reason?: string;
}

export interface AppointmentStatusUpdateRequest {
  status: AppointmentStatus;
  notes?: string;
}





