export interface DoctorAvailability {
  id: number;
  doctorId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  active: boolean;
}

export interface DoctorAvailabilityRequest {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
}