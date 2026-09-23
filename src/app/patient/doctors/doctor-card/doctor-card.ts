import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Doctor } from '../../../models/doctor';

@Component({
  selector: 'app-doctor-card',
  standalone:false,
  templateUrl: './doctor-card.html',
  styleUrls: ['./doctor-card.scss']
})
export class DoctorCardComponent {

  @Input() doctor!: Doctor;

  @Output() viewDetails = new EventEmitter<number>();

  viewDoctor(): void {
    this.viewDetails.emit(this.doctor.id);
  }
}