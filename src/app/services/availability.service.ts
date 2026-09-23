import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  DoctorAvailability
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

    return this.http.get<
      DoctorAvailability[]
    >(
      `${this.publicApiUrl}/${doctorId}/availability`,
      { params }
    );

  }

  getMyAvailability():
    Observable<DoctorAvailability[]> {

    return this.http.get<
      DoctorAvailability[]
    >(
      this.doctorApiUrl
    );

  }

}