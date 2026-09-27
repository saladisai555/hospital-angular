import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  Appointment,
  AppointmentBookingRequest,
  AppointmentStatusUpdateRequest
} from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private readonly apiUrl =
    'http://localhost:8080/api/appointments';

  private readonly doctorApiUrl =
    'http://localhost:8080/api/doctor/appointments';

  constructor(
    private readonly http: HttpClient
  ) {}

  // -------------------------
  // PATIENT APIs
  // -------------------------

  bookAppointment(
    request: AppointmentBookingRequest
  ): Observable<Appointment> {

    return this.http.post<Appointment>(
      this.apiUrl,
      request
    );
  }

  getMyAppointments():
    Observable<Appointment[]> {

    return this.http.get<Appointment[]>(
      `${this.apiUrl}/my`
    );
  }

  cancelAppointment(
    appointmentId: number
  ): Observable<Appointment> {

    return this.http.patch<Appointment>(
      `${this.apiUrl}/${appointmentId}/cancel`,
      {}
    );
  }

  // -------------------------
  // DOCTOR APIs
  // -------------------------

  getDoctorAppointments():
    Observable<Appointment[]> {

    return this.http.get<Appointment[]>(
      this.doctorApiUrl
    );
  }

  updateAppointmentStatus(
    appointmentId: number,
    request: AppointmentStatusUpdateRequest
  ): Observable<Appointment> {

    return this.http.patch<Appointment>(
      `${this.doctorApiUrl}/${appointmentId}/status`,
      request
    );
  }
}