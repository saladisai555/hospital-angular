import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import {  RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { SelectButtonModule } from 'primeng/selectbutton';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    DatePickerModule,
    SelectModule,
    TagModule,
    TextareaModule,
    RouterModule,
    AvatarModule,
    SelectButtonModule
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    DatePickerModule,
    SelectModule,
    TagModule,
    TextareaModule,
    RouterModule,
    AvatarModule,
    SelectButtonModule
  ]
})
export class SharedModule {}