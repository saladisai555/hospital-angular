import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import {
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from '../models/auth';
import { ROLES } from '../core/constants/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =
    'http://localhost:8080/api/auth';

  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  constructor(private readonly http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(
        tap(response => {
          this.saveAuthData(response);
        })
      );
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      request
    );
  }
hasRole(role: string): boolean {

  const user = this.getUser();

  return user?.role === role;

}

isPatient(): boolean {

  return this.hasRole(ROLES.PATIENT);

}

isDoctor(): boolean {

  return this.hasRole(ROLES.DOCTOR);

}

isAdmin(): boolean {

  return this.hasRole(ROLES.ADMIN);

}

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): AuthResponse | null {
    const user = localStorage.getItem(this.userKey);

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private saveAuthData(response: AuthResponse): void {
    localStorage.setItem(
      this.tokenKey,
      response.token
    );

    localStorage.setItem(
      this.userKey,
      JSON.stringify(response)
    );
  }
}