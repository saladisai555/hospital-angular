import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../core/constants/app-routes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone:false,
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register implements OnInit{
readonly loginRoute =
  APP_ROUTES.AUTH.LOGIN;
  registerForm!: FormGroup;

  // registerForm = new FormGroup({

  //   name: new FormControl(
  //     '',
  //     [
  //       Validators.required,
  //       Validators.maxLength(150)
  //     ]
  //   ),

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
  //       Validators.required,
  //       Validators.minLength(8)
  //     ]
  //   ),

  //   phone: new FormControl(''),

  //   dateOfBirth: new FormControl(''),

  //   gender: new FormControl(''),

  //   address: new FormControl('')
  // });

  loading = false;
  errorMessage = '';
  successMessage = '';
 genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' }
  ];
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly fb:FormBuilder,
  private readonly cdr: ChangeDetectorRef
  ) {}ngOnInit(): void {
  this.initializeRegisterForm();
}

private initializeRegisterForm(): void {
       this.registerForm = this.fb.group({
      name:['',[Validators.required,Validators.maxLength(150)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      phone:['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      dateOfBirth: [''], 
      gender:[''],
      address:['',[Validators.maxLength(500)]]

    })
  }
  private formatDate(date: Date | string | null): string {

  if (!date) {
    return '';
  }

  if (typeof date === 'string') {
    return date;
  }

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    date.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
  onSubmit(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      phone: this.registerForm.value.phone || '',
      dateOfBirth:
    this.formatDate(
      this.registerForm.value.dateOfBirth
    ),
      gender: this.registerForm.value.gender || '',
      address: this.registerForm.value.address || ''
    };
this.authService
  .register(request)
  .pipe(
    finalize(() => {
      this.loading = false;
    })
  )
      .subscribe({

       next: () => {

  this.loading = false;

  this.successMessage =
    'Registration successful. Redirecting to login...';

  this.cdr.markForCheck();

  setTimeout(() => {

    this.router.navigate([
      APP_ROUTES.AUTH.LOGIN
    ]);

  }, 1000);

},
        error: (error) => {

  console.error(
    'Registration failed:',
    error
  );

  this.loading = false;

  if (error.status === 409) {

    this.errorMessage =
      'An account with this email already exists.';

  }
  else if (error.status === 400) {

    this.errorMessage =
      error.error?.message ||
      'Please check the entered information.';

  }
  else {

    this.errorMessage =
      'Unable to register. Please try again.';

  }

  this.cdr.markForCheck();
}
      });
  }
}