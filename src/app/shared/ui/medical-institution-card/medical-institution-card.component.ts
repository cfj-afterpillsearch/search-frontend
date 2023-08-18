import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { MedicalInstitution } from '../../medical-institution';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

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
  @Input() todofuken: String = '';
  @Input() shikuchoson: String = '';

  faEarthAsia = faEarthAsia;
  faPhone = faPhone;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  searchButtonPushTag(medicalInstitution: MedicalInstitution, todofuken: String, shikuchoson: String) {
    const gtmTag = {
      event: 'medical-institution-search-button-click',
      data: {
        name: medicalInstitution.name,
        todofuken: todofuken,
        shikuchoson: shikuchoson,
      },
    };
    this.gtmService.pushTag(gtmTag);
  }

  telButtonPushTag(medicalInstitution: MedicalInstitution, todofuken: String, shikuchoson: String) {
    const gtmTag = {
      event: 'medical-institution-tel-button-click',
      data: {
        name: medicalInstitution.name,
        todofuken: todofuken,
        shikuchoson: shikuchoson,
      },
    };
    this.gtmService.pushTag(gtmTag);
  }
}
