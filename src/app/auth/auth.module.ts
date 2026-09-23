import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Login } from './login/login';
import { Register } from './register/register';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  }
];

@NgModule({
  declarations: [
    Login,
    Register
  ],

  imports: [
    SharedModule
  ]
})
export class AuthModule {}