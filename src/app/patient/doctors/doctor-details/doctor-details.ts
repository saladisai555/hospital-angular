import {
  ActivatedRoute
} from '@angular/router';

import { APP_ROUTES } from '../../../core/constants/app-routes';

import { Doctor } from '../../../models/doctor';

import {
  DoctorService
} from '../../../services/doctor.service';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  AvailabilityService
} from '../../../services/availability.service';

import {
  AppointmentService
} from '../../../services/appointment.service';

import {
  DoctorAvailability
} from '../../../models/doctor-availability';

import {
  AppointmentBookingRequest
} from '../../../models/appointment';


@Component({
  selector: 'app-doctor-details',
  standalone:false,
  templateUrl: './doctor-details.html',
  styleUrls: ['./doctor-details.scss']
})
export class DoctorDetailsComponent
  implements OnInit {

  readonly doctorsRoute =
    APP_ROUTES.PATIENT.DOCTORS;

  doctorId!: number;

  doctor: Doctor | null = null;
  loading = false;

  errorMessage = '';
  selectedDate: Date | null = null;

today = '';

todayDate!: Date;

availability: DoctorAvailability[] = [];
timeSlots: { label: string; value: string }[] = [];

selectedTime = '';

reason = '';

availabilityLoading = false;

booking = false;

availabilityError = '';

bookingError = '';

bookingSuccess = '';

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
  private availabilityService: AvailabilityService,
  private appointmentService: AppointmentService,
  private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

     this.doctorId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  this.today = this.getTodayDate();

  this.todayDate = new Date();

  this.selectedDate = new Date();

  this.loadDoctor();

  this.loadAvailability();

  }

  loadAvailability(): void {

  if (!this.selectedDate) {
    return;
  }

  const selectedDate =
    this.getSelectedDateString();

  if (!selectedDate) {
    return;
  }

  this.availabilityLoading = true;

  this.availabilityError = '';

  this.selectedTime = '';

  this.timeSlots = [];

  this.availabilityService
    .getDoctorAvailability(
      this.doctorId,
      selectedDate
    )
    .subscribe({

      next: (availability) => {

        this.availability =
          availability;

        this.timeSlots =
          this.generateTimeSlots(
            availability
          );
        
        this.availabilityLoading = false;
           this.cdr.markForCheck();

      },

      error: (error) => {

        console.error(
          'Failed to load availability:',
          error
        );

        this.availabilityError =
          'Unable to load doctor availability.';

        this.availabilityLoading = false;
           this.cdr.markForCheck();

      }

    });

}

  loadDoctor(): void {

    this.loading = true;

    this.errorMessage = '';

    this.doctorService
      .getDoctorById(this.doctorId)
      .subscribe({

        next: (doctor) => {

          this.doctor = doctor;

          this.loading = false;
           this.cdr.markForCheck();


        },

        error: (error) => {

          console.error(
            'Failed to load doctor:',
            error
          );

          this.errorMessage =
            'Unable to load doctor details.';

          this.loading = false;

  this.cdr.markForCheck();

        }

      });

  }

  retryLoading(): void {

    this.loadDoctor();

  }
private getTodayDate(): string {

  const date = new Date();

  const year =
    date.getFullYear();

  const month =
    String(date.getMonth() + 1)
      .padStart(2, '0');

  const day =
    String(date.getDate())
      .padStart(2, '0');

  return `${year}-${month}-${day}`;

}
private generateTimeSlots(
  availability: DoctorAvailability[]
): { label: string; value: string }[] {

  const slots: { label: string; value: string }[] = [];

  for (const rule of availability) {

    let current = this.timeToMinutes(rule.startTime);
    const end = this.timeToMinutes(rule.endTime);

    while (current < end) {

      const slotEnd =
        current + rule.slotDurationMinutes;

      if (slotEnd > end) {
        break;
      }

      const time = this.minutesToTime(current);

      slots.push({
        label: time,
        value: time
      });

      current = slotEnd;
    }
  }

  return slots;
}
private timeToMinutes(
  time: string
): number {

  const [
    hours,
    minutes
  ] = time
    .substring(0, 5)
    .split(':')
    .map(Number);

  return hours * 60 + minutes;

}
private getSelectedDateString(): string {

  if (!this.selectedDate) {
    return '';
  }

  const year =
    this.selectedDate.getFullYear();

  const month =
    String(
      this.selectedDate.getMonth() + 1
    ).padStart(2, '0');

  const day =
    String(
      this.selectedDate.getDate()
    ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

private minutesToTime(
  totalMinutes: number
): string {

  const hours =
    Math.floor(totalMinutes / 60);

  const minutes =
    totalMinutes % 60;

  return (
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}`
  );

}

onDateChange(): void {

  this.bookingError = '';

  this.bookingSuccess = '';

  this.loadAvailability();

}

onTimeChange(): void {

  this.bookingError = '';

  this.bookingSuccess = '';

}

bookAppointment(): void {

  if (!this.selectedDate) {

    this.bookingError =
      'Please select a date.';

    return;
  }

  if (!this.selectedTime) {

    this.bookingError =
      'Please select a time slot.';

    return;
  }

  if (this.booking) {
    return;
  }

  this.booking = true;
  this.bookingError = '';
  this.bookingSuccess = '';

  const request: AppointmentBookingRequest = {

    doctorId: this.doctorId,

    appointmentDate:
      this.getSelectedDateString(),

    startTime:
      this.selectedTime,

    reason:
      this.reason.trim()
  };

  this.appointmentService
    .bookAppointment(request)
    .subscribe({

      next: (appointment) => {

        console.log(
          'Appointment booked:',
          appointment
        );

        this.booking = false;

        this.bookingSuccess =
          'Appointment booked successfully.';

        this.reason = '';
        this.selectedTime = '';

        this.loadAvailability();

      },

      error: (error) => {

        console.error(
          'Booking failed:',
          error
        );

        this.booking = false;

        if (error.status === 409) {

          this.bookingError =
            error.error?.message ||
            'This time slot is already booked. Please choose another slot.';

          this.loadAvailability();

        }
        else if (error.status === 400) {

          this.bookingError =
            error.error?.message ||
            'Please check the appointment details.';

        }
        else if (error.status === 401) {

          this.bookingError =
            'Your session has expired. Please login again.';

        }
        else if (error.status === 403) {

          this.bookingError =
            'You are not allowed to book this appointment.';

        }
        else {

          this.bookingError =
            error.error?.message ||
            'Unable to book the appointment. Please try again.';

        }
           this.cdr.markForCheck();
      }

    });

}


  }