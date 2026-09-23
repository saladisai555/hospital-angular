import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { NavbarComponent } from './shared/navbar/navbar';

import { DoctorsModule } from './patient/doctors/doctors-module';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Appointments } from './patient/appointments/appointments';
import { AuthInterceptor } from './auth-interceptors';
import { SharedModule } from './shared/shared.module';

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
    SharedModule
  ],

  providers: [
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
