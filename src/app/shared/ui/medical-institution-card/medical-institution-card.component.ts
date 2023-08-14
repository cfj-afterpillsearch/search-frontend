import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { MedicalInstitution } from '../../medical-institution';
import { GoogleTagManagerService } from 'angular-google-tag-manager'

@Component({
  selector: 'app-medical-institution-card',
  templateUrl: './medical-institution-card.component.html',
  styleUrls: ['./medical-institution-card.component.css'],
  standalone: true,
  imports: [FontAwesomeModule],
})
export class MedicalInstitutionCardComponent {
  constructor(private gtmService: GoogleTagManagerService) {}

  @Input() medicalInstitution: MedicalInstitution = {
    name: '',
    postalcode: '',
    address: '',
    tel: '',
    url: '',
    memo_openinghours: '',
    location: {
      lat: 0,
      lng: 0,
    },
  };

  faEarthAsia = faEarthAsia;
  faPhone = faPhone;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  searchButtonPushTag(medicalInstitution: MedicalInstitution) {
    const gtmTag = {
      event: 'search-button-click',
      data: {
        name:medicalInstitution.name
      },
    };
    this.gtmService.pushTag(gtmTag);
  }
}
