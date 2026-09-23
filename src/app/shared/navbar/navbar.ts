import { Component } from '@angular/core';

import { APP_ROUTES } from '../../core/constants/app-routes';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
constructor(

  public readonly authService: AuthService,

  private readonly router: Router

) {}
readonly patientAppointmentsRoute =
  APP_ROUTES.PATIENT.APPOINTMENTS;
  readonly loginRoute =
  APP_ROUTES.AUTH.LOGIN;

logout(): void {

  this.authService.logout();

  this.router.navigate([
    APP_ROUTES.AUTH.LOGIN
  ]);

}
  appName: string = 'MediCare';

  readonly doctorsRoute =
    APP_ROUTES.PATIENT.DOCTORS;

}