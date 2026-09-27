import {
    ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  AvailabilityService
} from '../../services/availability.service';

import {
  DoctorAvailability,
  DoctorAvailabilityRequest
} from '../../models/doctor-availability';

@Component({
  selector: 'app-doctor-availability',
  standalone: false,
  templateUrl: './availability.html',
  styleUrls: ['./availability.scss']
})
export class Availability
  implements OnInit {

  availabilities: DoctorAvailability[] = [];

  loading = false;

  saving = false;

  errorMessage = '';

  successMessage = '';

  dialogVisible = false;

  editing = false;

  selectedAvailabilityId: number | null = null;

  form: DoctorAvailabilityRequest = {
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    slotDurationMinutes: 30
  };

  readonly daysOfWeek = [
    { label: 'Monday', value: 'MONDAY' },
    { label: 'Tuesday', value: 'TUESDAY' },
    { label: 'Wednesday', value: 'WEDNESDAY' },
    { label: 'Thursday', value: 'THURSDAY' },
    { label: 'Friday', value: 'FRIDAY' },
    { label: 'Saturday', value: 'SATURDAY' },
    { label: 'Sunday', value: 'SUNDAY' }
  ];

  readonly slotDurations = [
    { label: '15 minutes', value: 15 },
    { label: '30 minutes', value: 30 },
    { label: '45 minutes', value: 45 },
    { label: '60 minutes', value: 60 }
  ];

  constructor(
    private readonly availabilityService:
      AvailabilityService,
    
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadAvailability();

  }

  loadAvailability(): void {

    this.loading = true;

    this.errorMessage = '';

    this.availabilityService
      .getMyAvailability()
      .subscribe({

        next: (response) => {

          this.availabilities = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Failed to load availability:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'Unable to load your availability.';

          this.loading = false;
          this.cdr.markForCheck();
        }

      });
  }

  openCreateDialog(): void {

    this.editing = false;

    this.selectedAvailabilityId = null;

    this.form = {
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      slotDurationMinutes: 30
    };

    this.errorMessage = '';

    this.successMessage = '';

    this.dialogVisible = true;

  }

  openEditDialog(
  availability: DoctorAvailability
): void {

  this.editing = true;

  this.selectedAvailabilityId =
    availability.id;

  this.form = {
    dayOfWeek: availability.dayOfWeek,

    startTime: this.normalizeTime(
      availability.startTime
    ),

    endTime: this.normalizeTime(
      availability.endTime
    ),

    slotDurationMinutes:
      availability.slotDurationMinutes
  };

  this.errorMessage = '';

  this.successMessage = '';

  this.dialogVisible = true;
}

private normalizeTime(time: string): string {

  if (!time) {
    return '';
  }

  return time.substring(0, 5);
}

  saveAvailability(): void {

    if (!this.isFormValid()) {

      this.errorMessage =
        'Please enter valid availability details.';

      return;

    }

    this.saving = true;

    this.errorMessage = '';

    this.successMessage = '';

   const request: DoctorAvailabilityRequest = {
  dayOfWeek: this.form.dayOfWeek,

  startTime: this.normalizeTime(
    this.form.startTime
  ),

  endTime: this.normalizeTime(
    this.form.endTime
  ),

  slotDurationMinutes:
    this.form.slotDurationMinutes
};

    const operation =
      this.editing &&
      this.selectedAvailabilityId !== null

        ? this.availabilityService.updateAvailability(
            this.selectedAvailabilityId,
            request
          )

        : this.availabilityService
            .createAvailability(request);

    operation.subscribe({

      next: () => {

        this.saving = false;

        this.dialogVisible = false;

        this.successMessage =
          this.editing
            ? 'Availability updated successfully.'
            : 'Availability added successfully.';

        this.loadAvailability();
        this.cdr.markForCheck();

      },

      error: (error: HttpErrorResponse) => {

        console.error(
          'Failed to save availability:',
          error
        );

        this.saving = false;

        this.errorMessage =
          error.error?.message ??
          'Unable to save availability.';
          this.cdr.markForCheck();

      }

    });
  }

  deleteAvailability(
    availability: DoctorAvailability
  ): void {

    if (!availability.id) {
      return;
    }

    this.availabilityService
      .deleteAvailability(availability.id)
      .subscribe({

        next: () => {

          this.successMessage =
            'Availability deleted successfully.';

          this.loadAvailability();
          this.cdr.markForCheck();

        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Failed to delete availability:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'Unable to delete availability.';
            this.cdr.markForCheck();

        }

      });
  }

  isFormValid(): boolean {

  if (
    !this.form.dayOfWeek ||
    !this.form.startTime ||
    !this.form.endTime ||
    !this.form.slotDurationMinutes
  ) {
    return false;
  }

  const start =
    this.timeToMinutes(this.form.startTime);

  const end =
    this.timeToMinutes(this.form.endTime);

  return start < end;
}

private timeToMinutes(time: string): number {

  const [hours, minutes] =
    time.substring(0, 5)
      .split(':')
      .map(Number);

  return hours * 60 + minutes;
}

  closeDialog(): void {

    if (!this.saving) {

      this.dialogVisible = false;

    }

  }
}