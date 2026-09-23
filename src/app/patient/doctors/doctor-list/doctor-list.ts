import {
  Component,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

import { APP_ROUTES } from '../../../core/constants/app-routes';

import { Doctor } from '../../../models/doctor';

import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-list',
  standalone:false,
  templateUrl: './doctor-list.html',
  styleUrls: ['./doctor-list.scss']
})
export class DoctorListComponent
  implements OnInit {

  title = 'Find a Doctor';

  searchText = '';

  doctors: Doctor[] = [];

  loading = false;

  errorMessage = '';

  currentPage = 0;

  pageSize = 10;

  totalPages = 0;

  totalElements = 0;

  constructor(
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadDoctors();

  }

  loadDoctors(): void {

    this.loading = true;

    this.errorMessage = '';

    this.doctorService
      .getDoctors(
        this.currentPage,
        this.pageSize,
        undefined,
        this.searchText
      )
      .subscribe({

        next: (response) => {

          this.doctors =
            response.content;

          this.totalPages =
            response.totalPages;

          this.totalElements =
            response.totalElements;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Failed to load doctors:',
            error
          );

          this.errorMessage =
            'Unable to load doctors.';

          this.loading = false;

        }

      });

  }

  searchDoctors(): void {

    this.currentPage = 0;

    this.loadDoctors();

  }
onViewDoctor(
  doctorId: number
): void {

  this.router.navigate([
    APP_ROUTES.PATIENT.DOCTORS,
    doctorId
  ]);

}

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages - 1
    ) {

      this.currentPage++;

      this.loadDoctors();

    }

  }

  previousPage(): void {

    if (this.currentPage > 0) {

      this.currentPage--;

      this.loadDoctors();

    }

  }

  retryLoading(): void {

    this.loadDoctors();

  }

}