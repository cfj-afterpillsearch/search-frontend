import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Addresses } from '../../../shared/types/addresses';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { SearchRequirementsRadioComponent } from 'src/app/shared/ui/search-requirements-radio/search-requirements-radio.component';
import { Radio, SearchRequirement } from 'src/app/shared/types/search-requirements';

@Component({
  selector: 'app-search',
  templateUrl: './medical-institutions.component.html',
  styleUrls: ['./medical-institutions.component.css'],
  standalone: true,
  imports: [ButtonComponent, SearchRequirementsRadioComponent, FormsModule, NgFor],
})
export class MedicalInstitutionsComponent implements OnInit {
  addresses: Addresses = {};
  todofukenList: string[] = [];
  shikuchosonList: string[] = [];
  selectedTodofuken = this.getSessionStorageValue(sessionStorage.getItem('medicalInstitutionTodofuken'), '');
  selectedShikuchoson = this.getSessionStorageValue(sessionStorage.getItem('medicalInstitutionShikuchoson'), '');
  currentLocationIsOpenSunday = this.getSessionStorageValue(
    sessionStorage.getItem('medicalInstitutionCurrentLocationIsOpenSunday'),
    '0',
  );
  currentLocationIsOpenHoliday = this.getSessionStorageValue(
    sessionStorage.getItem('medicalInstitutionCurrentLocationIsOpenHoliday'),
    '0',
  );
  addressIsOpenSunday = this.getSessionStorageValue(
    sessionStorage.getItem('medicalInstitutionAddressIsOpenSunday'),
    '0',
  );
  addressIsOpenHoliday = this.getSessionStorageValue(
    sessionStorage.getItem('medicalInstitutionAddressIsOpenHoliday'),
    '0',
  );

  currentLocationIsOpenSundayRadioList: Radio[] = [
    {
      label: '指定なし',
      value: '0',
      initialIsChecked: false,
    },
    {
      label: '△',
      value: '2',
      initialIsChecked: false,
    },
    {
      label: '◯',
      value: '1',
      initialIsChecked: false,
    },
  ];

  currentLocationIsOpenHolidayRadioList: Radio[] = [
    {
      label: '指定なし',
      value: '0',
      initialIsChecked: false,
    },
    {
      label: '△',
      value: '2',
      initialIsChecked: false,
    },
    {
      label: '◯',
      value: '1',
      initialIsChecked: false,
    },
  ];

  addressIsOpenSundayRadioList: Radio[] = [
    {
      label: '指定なし',
      value: '0',
      initialIsChecked: false,
    },
    {
      label: '△',
      value: '2',
      initialIsChecked: false,
    },
    {
      label: '◯',
      value: '1',
      initialIsChecked: false,
    },
  ];

  addressIsOpenHolidayRadioList: Radio[] = [
    {
      label: '指定なし',
      value: '0',
      initialIsChecked: false,
    },
    {
      label: '△',
      value: '2',
      initialIsChecked: false,
    },
    {
      label: '◯',
      value: '1',
      initialIsChecked: false,
    },
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Addresses>('assets/addresses.json').subscribe((data) => {
      this.addresses = data;
      this.todofukenList = Object.keys(data);
      this.onTodofukenChange();
    });
    this.setDefaultRadio(this.currentLocationIsOpenSundayRadioList, this.currentLocationIsOpenSunday);
    this.setDefaultRadio(this.currentLocationIsOpenHolidayRadioList, this.currentLocationIsOpenHoliday);
    this.setDefaultRadio(this.addressIsOpenSundayRadioList, this.addressIsOpenSunday);
    this.setDefaultRadio(this.addressIsOpenHolidayRadioList, this.addressIsOpenHoliday);
  }

  setDefaultRadio(radioList: Radio[], value: string) {
    switch (value) {
      case '0':
        radioList[0].initialIsChecked = true;
        break;
      case '1':
        radioList[2].initialIsChecked = true;
        break;
      case '2':
        radioList[1].initialIsChecked = true;
        break;
      default:
        break;
    }
  }

  getSessionStorageValue(sessionStorageValue: string | null, defaultValue: string): string {
    if (sessionStorageValue === null) {
      return defaultValue;
    } else {
      return sessionStorageValue;
    }
  }

  setSearchRequirements(searchRequirement: SearchRequirement) {
    switch (searchRequirement.name) {
      case 'currentLocationSunday':
        this.currentLocationIsOpenSunday = searchRequirement.radioMetaData.value;
        break;
      case 'currentLocationHoliday':
        this.currentLocationIsOpenHoliday = searchRequirement.radioMetaData.value;
        break;
      case 'addressSunday':
        this.addressIsOpenSunday = searchRequirement.radioMetaData.value;
        break;
      case 'addressHoliday':
        this.addressIsOpenHoliday = searchRequirement.radioMetaData.value;
        break;
    }
  }

  onCurrentLocationSearch() {
    sessionStorage.setItem('medicalInstitutionCurrentLocationIsOpenSunday', this.currentLocationIsOpenSunday);
    sessionStorage.setItem('medicalInstitutionCurrentLocationIsOpenHoliday', this.currentLocationIsOpenHoliday);
    this.router.navigate(['/medical-institutions/current-location'], {
      queryParams: {
        is_open_sunday: this.currentLocationIsOpenSunday,
        is_open_holiday: this.currentLocationIsOpenHoliday,
      },
    });
  }

  onTodofukenChange() {
    this.shikuchosonList = this.addresses[this.selectedTodofuken] || [];
  }

  onAddressSearch() {
    if (!this.isTodofukenAndShikuchosonSelected()) {
      window.alert('都道府県と市区町村を選択してください。');
      return;
    }
    sessionStorage.setItem('medicalInstitutionTodofuken', this.selectedTodofuken);
    sessionStorage.setItem('medicalInstitutionShikuchoson', this.selectedShikuchoson);
    sessionStorage.setItem('medicalInstitutionAddressIsOpenSunday', this.addressIsOpenSunday);
    sessionStorage.setItem('medicalInstitutionAddressIsOpenHoliday', this.addressIsOpenHoliday);
    this.router.navigate(['/medical-institutions/address'], {
      queryParams: {
        todofuken: this.selectedTodofuken,
        shikuchoson: this.selectedShikuchoson,
        is_open_sunday: this.addressIsOpenSunday,
        is_open_holiday: this.addressIsOpenHoliday,
      },
    });
  }

  isTodofukenAndShikuchosonSelected() {
    return this.selectedTodofuken !== '' && this.selectedShikuchoson !== '';
  }
}
