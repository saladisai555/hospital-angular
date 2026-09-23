import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { APP_ROUTES } from '../../core/constants/app-routes';
import { AuthService } from '../../services/auth.service';
import { ROLES } from '../../core/constants/roles';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit{
  readonly registerRoute =
  APP_ROUTES.AUTH.REGISTER;
  loginForm!: FormGroup;

  // loginForm = new FormGroup({
  //   email: new FormControl(
  //     '',
  //     [
  //       Validators.required,
  //       Validators.email
  //     ]
  //   ),

  //   password: new FormControl(
  //     '',
  //     [
  //       Validators.required
  //     ]
  //   )
  // });

  loading:boolean = false;
  errorMessage :string= "";

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly fb : FormBuilder,
  ) {}
 ngOnInit(): void {
  this.initializeLoginForm();
}
private initializeLoginForm(): void {

  this.loginForm = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ]

  });

}


  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const request = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.authService.login(request)
      .subscribe({
        next: (response) => {

          this.loading = false;

        if (response.role === ROLES.PATIENT) {

  this.router.navigate([
    APP_ROUTES.PATIENT.DOCTORS
  ]);

}
else if (response.role === ROLES.DOCTOR) {

  this.router.navigate([
    APP_ROUTES.DOCTOR.DASHBOARD
  ]);

}
else if (response.role === ROLES.ADMIN) {

  this.router.navigate([
    APP_ROUTES.ADMIN.DASHBOARD
  ]);

}
else {

  this.router.navigate([
    APP_ROUTES.PATIENT.DOCTORS
  ]);

}
        },

        error: (error) => {

          console.error('Login failed:', error);

          this.loading = false;

          if (error.status === 401) {
            this.errorMessage =
              'Invalid email or password.';
          }
          else {
            this.errorMessage =
              'Unable to login. Please try again.';
          }
        }
      });
  }
}