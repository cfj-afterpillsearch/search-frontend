import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { MedicalInstitution } from '../../medical-institution';
import { NewlineToBrPipe } from '../../newline-to-br.pipe';
import { NgIf } from '@angular/common';
import { SearchResultItemCardComponent } from '../search-result-item-card/search-result-item-card.component';

@Component({
  selector: 'app-medical-institution-card',
  templateUrl: './medical-institution-card.component.html',
  styleUrls: ['./medical-institution-card.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, NewlineToBrPipe, NgIf, SearchResultItemCardComponent],
})
export class MedicalInstitutionCardComponent {
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
    isOpenSunday: '',
    isOpenHoliday: '',
  };

  faMagnifyingGlass = faMagnifyingGlass;
  faPhone = faPhone;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;
}
