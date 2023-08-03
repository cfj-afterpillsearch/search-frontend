import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Pharmacy } from '../../pharmacy';

@Component({
  selector: 'app-pharmacy-card',
  templateUrl: './pharmacy-card.component.html',
  styleUrls: ['./pharmacy-card.component.css'],
  standalone: true,
  imports: [NgIf, FontAwesomeModule],
})
export class PharmacyCardComponent {
  @Input() pharmacy: Pharmacy = {
    name: '',
    postalcode: '',
    address: '',
    tel: '',
    memo_openinghours: '',
    emergency_contact: '',
    emergency_contact_phone: '',
    location: {
      lat: 0,
      lng: 0
    }
  };
  isEmergencyContact: boolean = false;
  faEarthAsia = faEarthAsia;
  faPhone = faPhone;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  ngOnInit() {
    this.isEmergencyContact = this.pharmacy.emergency_contact === '有' ? true : false;
  }
}

