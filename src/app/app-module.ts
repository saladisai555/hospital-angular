import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { NavbarComponent } from './shared/navbar/navbar';

import { DoctorsModule } from './patient/doctors/doctors-module';
import { DoctorModule } from './doctor/doctor.module';
import { AuthModule } from './auth/auth.module';
import { Appointments } from './patient/appointments/appointments';
import { AuthInterceptor } from './auth-interceptors';
import {
  provideHttpClient,
  withInterceptorsFromDi,HTTP_INTERCEPTORS
} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    App,
    NavbarComponent,
    Appointments
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DoctorsModule,
    AuthModule,
    SharedModule,
  DoctorModule
  ],

  providers: [
    ConfirmationService,
     provideHttpClient(
    withInterceptorsFromDi()
  ),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
      darkModeSelector: false,
      license: 'community'
    }
      }

    }),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  bootstrap: [App]
})
export class AppModule {}
