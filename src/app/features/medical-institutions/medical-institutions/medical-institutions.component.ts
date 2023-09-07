import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Addresses } from '../../../shared/types/addresses';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { SearchRequirementsRadioComponent } from 'src/app/shared/ui/search-requirements-radio/search-requirements-radio.component'; 
import { RadioMetaData, SearchRequirements } from 'src/app/shared/types/search-requirements';

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
  selectedTodofuken = '';
  selectedShikuchoson = '';
  currentLocationIsOpenSunday = '0';
  currentLocationIsOpenHoliday = '0';
  addressIsOpenSunday = '0';
  addressIsOpenHoliday = '0';

  searchRequirements: SearchRequirements = {
    first: {
      name: '指定なし',
      value: '0',
    },
    second: {
      name: '△',
      value: '2',
    },
    third: {
      name: '○',
      value: '1',
    },
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Addresses>('assets/addresses.json').subscribe((data) => {
      this.addresses = data;
      this.todofukenList = Object.keys(data);
    });
  }

  setSearchRequirements(radioMetaData: RadioMetaData) {
    switch (radioMetaData.name) {
      case 'currentLocationSunday':
        this.currentLocationIsOpenSunday = radioMetaData.value;
        break;
      case 'currentLocationHoliday':
        this.currentLocationIsOpenSunday = radioMetaData.value;
        break;
      case 'addressSunday':
        this.addressIsOpenSunday = radioMetaData.value;
        break;
      case 'addressHoliday':
        this.addressIsOpenHoliday = radioMetaData.value;
        break;
    }
  }

  onCurrentLocationSearch() {
    this.router.navigate(['/medical-institutions/current-location'], {
      queryParams: {
        is_open_sunday: this.currentLocationIsOpenSunday,
        is_open_holiday: this.currentLocationIsOpenHoliday,
      },
    });
  }

  onPrefectureChange() {
    this.shikuchosonList = this.addresses[this.selectedTodofuken] || [];
  }

  onAddressSearch() {
    if (!this.isTodofukenAndShikuchosonSelected()) {
      window.alert('都道府県と市区町村を選択してください。');
      return;
    }
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
