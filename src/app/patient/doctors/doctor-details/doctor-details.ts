import {
  ActivatedRoute
} from '@angular/router';

import { APP_ROUTES } from '../../../core/constants/app-routes';

import { Doctor } from '../../../models/doctor';

import {
  DoctorService
} from '../../../services/doctor.service';
import { Component, OnInit } from '@angular/core';


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

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {

    this.doctorId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadDoctor();

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

        },

        error: (error) => {

          console.error(
            'Failed to load doctor:',
            error
          );

          this.errorMessage =
            'Unable to load doctor details.';

          this.loading = false;

        }

      });

  }

  retryLoading(): void {

    this.loadDoctor();

  }

}