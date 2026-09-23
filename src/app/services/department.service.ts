import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly apiUrl =
    'http://localhost:8080/api/departments';

  constructor(
    private readonly http: HttpClient
  ) {}

  getDepartments():
    Observable<Department[]> {

    return this.http.get<Department[]>(
      this.apiUrl
    );

  }

  getDepartmentById(
    id: number
  ): Observable<Department> {

    return this.http.get<Department>(
      `${this.apiUrl}/${id}`
    );

  }

}