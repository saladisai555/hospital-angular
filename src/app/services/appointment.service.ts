import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  Appointment,
  AppointmentBookingRequest
} from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private readonly apiUrl =
    'http://localhost:8080/api/appointments';

  constructor(
    private http: HttpClient
  ) {}

  bookAppointment(
    request: AppointmentBookingRequest
  ): Observable<Appointment> {

    return this.http.post<Appointment>(
      this.apiUrl,
      request
    );

  }

  getMyAppointments(): Observable<Appointment[]> {

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

}