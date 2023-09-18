import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Pharmacy } from '../../pharmacy';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { NewlineToBrPipe } from '../../newline-to-br.pipe';

@Component({
  selector: 'app-pharmacy-card',
  templateUrl: './pharmacy-card.component.html',
  styleUrls: ['./pharmacy-card.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, NewlineToBrPipe, NgIf],
})
export class PharmacyCardComponent implements OnInit {
  constructor(private gtmService: GoogleTagManagerService) {}

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
      lng: 0,
    },
  };

  readonly regexpPhoneNumber =
    /(0(\d{1}-\d{4}|\d{2}-\d{3}|\d{3}-\d{2}|\d{4}-\d{1})-\d{4}|0[5789]0-\d{4}-\d{4}|0120-\d{3}-\d{3})/;

  isEmergencyContact = false;

  faMagnifyingGlass = faMagnifyingGlass;
  faPhone = faPhone;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  ngOnInit() {
    this.isEmergencyContact = this.regexpPhoneNumber.test(this.pharmacy.emergency_contact_phone);
  }

  searchButtonPushTag(pharmacy: Pharmacy) {
    window.open(`https://www.google.com/search?q=${pharmacy.name}`, '_blank');
    const gtmTag = {
      event: 'pharmacy-search-button-click',
      data: {
        name: pharmacy.name,
      },
    };
    this.gtmService.pushTag(gtmTag);
  }

  telButtonPushTag(pharmacy: Pharmacy) {
    window.open(`tel:${pharmacy.tel}`);
    const gtmTag = {
      event: 'pharmacy-tel-button-click',
      data: {
        name: pharmacy.name,
      },
    };
    this.gtmService.pushTag(gtmTag);
  }
}
