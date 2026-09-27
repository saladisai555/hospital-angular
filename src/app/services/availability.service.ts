import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  DoctorAvailability,
  DoctorAvailabilityRequest
} from '../models/doctor-availability';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  private readonly publicApiUrl =
    'http://localhost:8080/api/doctors';

  private readonly doctorApiUrl =
    'http://localhost:8080/api/doctor/availability';

  constructor(
    private readonly http: HttpClient
  ) {}

  // Patient/Doctor can view a doctor's availability
  getDoctorAvailability(
    doctorId: number,
    date?: string
  ): Observable<DoctorAvailability[]> {

    let params = new HttpParams();

    if (date) {

      params = params.set(
        'date',
        date
      );

    }

    return this.http.get<DoctorAvailability[]>(
      `${this.publicApiUrl}/${doctorId}/availability`,
      { params }
    );
  }

  // Doctor: view own availability
  getMyAvailability():
    Observable<DoctorAvailability[]> {

    return this.http.get<DoctorAvailability[]>(
      this.doctorApiUrl
    );
  }

  // Doctor: create availability
  createAvailability(
    request: DoctorAvailabilityRequest
  ): Observable<DoctorAvailability> {

    return this.http.post<DoctorAvailability>(
      this.doctorApiUrl,
      request
    );
  }

  // Doctor: update availability
  updateAvailability(
    id: number,
    request: DoctorAvailabilityRequest
  ): Observable<DoctorAvailability> {

    return this.http.put<DoctorAvailability>(
      `${this.doctorApiUrl}/${id}`,
      request
    );
  }

  // Doctor: delete/deactivate availability
  deleteAvailability(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.doctorApiUrl}/${id}`
    );
  }
}