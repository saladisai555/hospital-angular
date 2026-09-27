import {
  ChangeDetectorRef,
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
  ConfirmationService
} from 'primeng/api';

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
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly confirmationService: ConfirmationService
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

          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(
            'Failed to load appointments:',
            error
          );

          this.errorMessage =
            'Unable to load your appointments.';

          this.loading = false;

          this.cdr.markForCheck();

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

  /*
   * Opens confirmation dialog.
   *
   * The appointment is NOT cancelled here.
   * Cancellation happens only after
   * the user clicks "Yes, Cancel".
   */
  cancelAppointment(
    appointmentId: number
  ): void {

    if (this.cancellingId !== null) {
      return;
    }

    this.confirmationService.confirm({

      header: 'Cancel Appointment',

      message:
        'Are you sure you want to cancel this appointment?',

      icon: 'pi pi-exclamation-triangle',

      acceptLabel: 'Yes, Cancel',

      rejectLabel: 'No',

      acceptButtonStyleClass:
        'p-button-danger',

      rejectButtonStyleClass:
        'p-button-secondary',

      accept: () => {

        this.performCancellation(
          appointmentId
        );

      }

    });

  }

  /*
   * Actually calls the backend cancellation API.
   */
  private performCancellation(
    appointmentId: number
  ): void {

    if (this.cancellingId !== null) {
      return;
    }

    this.cancellingId = appointmentId;

    this.errorMessage = '';

    this.successMessage = '';

    this.cdr.markForCheck();

    this.appointmentService
      .cancelAppointment(appointmentId)
      .subscribe({

        next: () => {

          this.cancellingId = null;

          this.successMessage =
            'Appointment cancelled successfully.';

          this.cdr.markForCheck();

          /*
           * Reload appointments so the
           * status changes to CANCELLED
           * immediately in the UI.
           */
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
              error.error?.message ||
              'This appointment cannot be cancelled.';

          }
          else if (error.status === 403) {

            this.errorMessage =
              'You cannot cancel this appointment.';

          }
          else {

            this.errorMessage =
              error.error?.message ||
              'Unable to cancel appointment.';

          }

          this.cdr.markForCheck();

        }

      });

  }

  goToDoctors(): void {

    this.router.navigate([
      APP_ROUTES.PATIENT.DOCTORS
    ]);

  }

}