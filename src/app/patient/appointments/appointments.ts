import {
  Component,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

import {
  Appointment,
  AppointmentStatus
} from '../../models/appointment';

import {
  AppointmentService
} from '../../services/appointment.service';

import {
  APP_ROUTES
} from '../../core/constants/app-routes';

@Component({
  selector: 'app-my-appointments',
  standalone: false,
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.scss']
})
export class Appointments implements OnInit {

  appointments: Appointment[] = [];

  loading = false;

  cancellingId: number | null = null;

  errorMessage = '';

  successMessage = '';

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {

    this.loadAppointments();

  }

  loadAppointments(): void {

    this.loading = true;

    this.errorMessage = '';

    this.appointmentService
      .getMyAppointments()
      .subscribe({

        next: (appointments) => {

          this.appointments = appointments;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Failed to load appointments:',
            error
          );

          this.errorMessage =
            'Unable to load your appointments.';

          this.loading = false;

        }

      });

  }

  canCancel(
    appointment: Appointment
  ): boolean {

    return (
      appointment.status ===
        AppointmentStatus.BOOKED ||
      appointment.status ===
        AppointmentStatus.CONFIRMED
    );

  }

  cancelAppointment(
    appointmentId: number
  ): void {

    if (this.cancellingId !== null) {
      return;
    }

    this.cancellingId = appointmentId;

    this.errorMessage = '';

    this.successMessage = '';

    this.appointmentService
      .cancelAppointment(appointmentId)
      .subscribe({

        next: () => {

          this.cancellingId = null;

          this.successMessage =
            'Appointment cancelled successfully.';

          this.loadAppointments();

        },

        error: (error) => {

          console.error(
            'Failed to cancel appointment:',
            error
          );

          this.cancellingId = null;

          if (error.status === 409) {

            this.errorMessage =
              'This appointment cannot be cancelled.';

          }
          else if (error.status === 403) {

            this.errorMessage =
              'You cannot cancel this appointment.';

          }
          else {

            this.errorMessage =
              'Unable to cancel appointment.';

          }

        }

      });

  }

  goToDoctors(): void {

    this.router.navigate([
      APP_ROUTES.PATIENT.DOCTORS
    ]);

  }

}