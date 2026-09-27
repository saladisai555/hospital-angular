import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Doctor } from '../models/doctor';
import { PageResponse } from '../models/page-response';
import { DoctorAvailability } from '../models/doctor-availability';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private readonly apiUrl =
    'http://localhost:8080/api/doctors';

  constructor(
    private readonly http: HttpClient
  ) {}

  getDoctors(
    page: number = 0,
    size: number = 10,
    departmentId?: number,
    search?: string
  ): Observable<PageResponse<Doctor>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (departmentId !== undefined) {
      params = params.set(
        'departmentId',
        departmentId
      );
    }

    if (
      search?.trim()
    ) {
      params = params.set(
        'search',
        search.trim()
      );
    }

    return this.http.get<PageResponse<Doctor>>(
      this.apiUrl,
      { params }
    );
  }

  getDoctorById(
    id: number
  ): Observable<Doctor> {

    return this.http.get<Doctor>(
      `${this.apiUrl}/${id}`
    );
  }

  getAvailability(
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
      `${this.apiUrl}/${doctorId}/availability`,
      { params }
    );
  }
}