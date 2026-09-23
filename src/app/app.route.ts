import { Routes } from '@angular/router';

import { DoctorListComponent }
  from './patient/doctors/doctor-list/doctor-list';

import { DoctorDetailsComponent }
  from './patient/doctors/doctor-details/doctor-details';

import { Login }
  from './auth/login/login';

import { Register }
  from './auth/register/register';

import { Appointments }
  from './patient/appointments/appointments';

import { authGuard }
  from './core/guard/auth.guard';

import { ROLES }
  from './core/constants/roles';


export const APP_ROUTES: Routes = [

  // Default route

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },


  // Authentication

  {
    path: 'auth/login',
    component: Login
  },

  {
    path: 'auth/register',
    component: Register
  },


  // Patient - Doctors

  {
    path: 'patient/doctors',
    component: DoctorListComponent,
    canActivate: [authGuard],
    data: {
      roles: [ROLES.PATIENT]
    }
  },


  // Patient - Doctor Details

  {
    path: 'patient/doctors/:id',
    component: DoctorDetailsComponent,
    canActivate: [authGuard],
    data: {
      roles: [ROLES.PATIENT]
    }
  },


  // Patient - Appointments

  {
    path: 'patient/appointments',
    component: Appointments,
    canActivate: [authGuard],
    data: {
      roles: [ROLES.PATIENT]
    }
  },


  // Unknown route

  {
    path: '**',
    redirectTo: 'auth/login'
  }

];