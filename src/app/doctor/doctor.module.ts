import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { Dashboard } from './dashboard/dashboard';
import { Availability } from './availability/availability';
import { DialogModule } from 'primeng/dialog';
import { DoctorAppointments } from './appointments/appointments';

@NgModule({
  declarations: [Dashboard, Availability,
  DoctorAppointments],

  imports: [CommonModule, RouterModule, SharedModule, DialogModule],

  exports: [Dashboard, Availability],
})
export class DoctorModule {}
