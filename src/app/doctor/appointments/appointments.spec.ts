import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { DoctorAppointments }
  from './appointments';

import { SharedModule }
  from '../../shared/shared.module';

describe('DoctorAppointments', () => {

  let component: DoctorAppointments;

  let fixture:
    ComponentFixture<DoctorAppointments>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [
        DoctorAppointments
      ],

      imports: [
        SharedModule
      ]

    }).compileComponents();

    fixture =
      TestBed.createComponent(
        DoctorAppointments
      );

    component =
      fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();

  });

});