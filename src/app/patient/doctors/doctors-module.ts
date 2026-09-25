import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DoctorListComponent } from './doctor-list/doctor-list';
import {  DoctorCardComponent } from './doctor-card/doctor-card';
import { DoctorDetailsComponent } from './doctor-details/doctor-details';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorCardComponent,
    DoctorDetailsComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],

  exports: [
    DoctorListComponent
  ]
})
export class DoctorsModule {}