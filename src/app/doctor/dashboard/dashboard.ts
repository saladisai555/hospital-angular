import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { APP_ROUTES } from '../../core/constants/app-routes';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {

  readonly availabilityRoute =
    APP_ROUTES.DOCTOR.AVAILABILITY;

  readonly appointmentsRoute =
    APP_ROUTES.DOCTOR.APPOINTMENTS;

  constructor(
    private readonly router: Router
  ) {}

  goToAvailability(): void {

    this.router.navigate([
      this.availabilityRoute
    ]);

  }

  goToAppointments(): void {

    this.router.navigate([
      this.appointmentsRoute
    ]);

  }
}