import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import {
  Appointment,
  AppointmentStatus,
  AppointmentStatusUpdateRequest
} from '../../models/appointment';

import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-doctor-appointments',
  standalone: false,
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.scss']
})
         
export class DoctorAppointments implements OnInit {

  appointments: Appointment[] = [];

  loading = false;

  updatingStatus = false;

  errorMessage = '';

  successMessage = '';

  statusErrorMessage = '';

  statusDialogVisible = false;

  selectedAppointment: Appointment | null = null;

  selectedStatus: AppointmentStatus | null = null;

  statusNotes = '';

  readonly AppointmentStatus = AppointmentStatus;

  readonly statusOptions = [
    {
      label: 'Confirmed',
      value: AppointmentStatus.CONFIRMED
    },
    {
      label: 'Completed',
      value: AppointmentStatus.COMPLETED
    },
    {
      label: 'Rejected',
      value: AppointmentStatus.REJECTED
    },
    {
      label: 'No Show',
      value: AppointmentStatus.NO_SHOW
    }
  ];

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {

    this.loading = true;

    this.errorMessage = '';

    this.appointmentService
      .getDoctorAppointments()
      .subscribe({

        next: (response) => {

          this.appointments = response;

          this.loading = false;

          this.cdr.markForCheck();
        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Failed to load doctor appointments:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'Unable to load appointments.';

          this.loading = false;

          this.cdr.markForCheck();
        }

      });
  }

  openStatusDialog(
    appointment: Appointment
  ): void {

    this.selectedAppointment = appointment;

    this.selectedStatus = null;

    this.statusNotes = '';

    this.statusErrorMessage = '';

    this.statusDialogVisible = true;
  }

  closeStatusDialog(): void {

    if (this.updatingStatus) {
      return;
    }

    this.statusDialogVisible = false;

    this.selectedAppointment = null;

    this.selectedStatus = null;

    this.statusNotes = '';

    this.statusErrorMessage = '';
  }

  updateStatus(): void {

    if (
      !this.selectedAppointment ||
      !this.selectedStatus ||
      this.updatingStatus
    ) {
      return;
    }

    this.updatingStatus = true;

    this.statusErrorMessage = '';

    const request: AppointmentStatusUpdateRequest = {
      status: this.selectedStatus,
      notes: this.statusNotes.trim() || undefined
    };

    this.appointmentService
      .updateAppointmentStatus(
        this.selectedAppointment.id,
        request
      )
      .subscribe({

        next: (updatedAppointment) => {

          this.updatingStatus = false;

          const index =
            this.appointments.findIndex(
              appointment =>
                appointment.id ===
                updatedAppointment.id
            );

          if (index !== -1) {

            this.appointments = [
              ...this.appointments.slice(
                0,
                index
              ),

              updatedAppointment,

              ...this.appointments.slice(
                index + 1
              )
            ];

          }

          this.cdr.markForCheck();

          this.statusDialogVisible = false;

          this.successMessage =
            'Appointment status updated successfully.';

          this.selectedAppointment = null;

          this.selectedStatus = null;

          this.statusNotes = '';


        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Failed to update appointment status:',
            error
          );

          this.updatingStatus = false;

          this.statusErrorMessage =
            error.error?.message ??
            'Unable to update appointment status.';

          this.cdr.markForCheck();
        }

      });
  }

  getStatusSeverity(
    status: AppointmentStatus
  ): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {

    switch (status) {

      case AppointmentStatus.CONFIRMED:
        return 'success';

      case AppointmentStatus.COMPLETED:
        return 'info';

      case AppointmentStatus.CANCELLED:
        return 'secondary';

      case AppointmentStatus.REJECTED:
        return 'danger';

      case AppointmentStatus.NO_SHOW:
        return 'warn';

      case AppointmentStatus.BOOKED:
      default:
        return 'info';
    }
  }

  canUpdateStatus(
    appointment: Appointment
  ): boolean {

    return ![
      AppointmentStatus.CANCELLED,
      AppointmentStatus.COMPLETED,
      AppointmentStatus.REJECTED,
      AppointmentStatus.NO_SHOW
    ].includes(appointment.status);
  }

  isFinalStatus(
    status: AppointmentStatus
  ): boolean {

    return [
      AppointmentStatus.CANCELLED,
      AppointmentStatus.COMPLETED,
      AppointmentStatus.REJECTED,
      AppointmentStatus.NO_SHOW
    ].includes(status);
  }
}