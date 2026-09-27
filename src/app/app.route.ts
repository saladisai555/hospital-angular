import { Routes } from '@angular/router';

import { DoctorListComponent }
  from './patient/doctors/doctor-list/doctor-list';

import { DoctorDetailsComponent }
  from './patient/doctors/doctor-details/doctor-details';
import { Dashboard }
  from './doctor/dashboard/dashboard';

import { Availability }
  from './doctor/availability/availability';
import { Login }
  from './auth/login/login';

import { Register }
  from './auth/register/register';

import { Appointments }
  from './patient/appointments/appointments';
import { DoctorAppointments }
  from './doctor/appointments/appointments';
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
// Doctor - Dashboard

{
  path: 'doctor',
  component: Dashboard,
  canActivate: [authGuard],
  data: {
    roles: [ROLES.DOCTOR]
  }
},


// Doctor - Availability

{
  path: 'doctor/availability',
  component: Availability,
  canActivate: [authGuard],
  data: {
    roles: [ROLES.DOCTOR]
  }
},

{
  path: 'doctor/appointments',
  component: DoctorAppointments,
  canActivate: [authGuard],
  data: {
    roles: [ROLES.DOCTOR]
  }
},
  // Unknown route

  {
    path: '**',
    redirectTo: 'auth/login'
  }

];