import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Addresses } from '../../../shared/types/addresses';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { SearchRequirementsRadioComponent } from 'src/app/shared/ui/search-requirements-radio/search-requirements-radio.component';
import { Radio, SearchRequirement } from 'src/app/shared/types/search-requirements';
import { OutofhoursExplainTextComponent } from 'src/app/shared/ui/outofhours-explain-text/outofhours-explain-text.component';

@Component({
  selector: 'app-search',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.css'],
  standalone: true,
  imports: [ButtonComponent, SearchRequirementsRadioComponent, OutofhoursExplainTextComponent, FormsModule, NgFor],
})
export class PharmaciesComponent implements OnInit {
  addresses: Addresses = {};
  todofukenList: string[] = [];
  shikuchosonList: string[] = [];
  selectedTodofuken = this.getSessionStorageValue(sessionStorage.getItem('pharmacyTodofuken'), '');
  selectedShikuchoson = this.getSessionStorageValue(sessionStorage.getItem('pharmacyShikuchoson'), '');
  currentLocationIsOutOfHours = this.getSessionStorageValue(
    sessionStorage.getItem('pharmacyCurrentLocationIsOutOfHours'),
    '0',
  );
  addressIsOutOfHours = this.getSessionStorageValue(sessionStorage.getItem('pharmacyAddressIsOutOfHours'), '0');

  currentLocationIsOutOfHoursRadioList: Radio[] = [
    {
      label: '指定なし',
      value: '0',
      initialIsChecked: false,
    },
    {
      label: '有',
      value: '1',
      initialIsChecked: false,
    },
  ];

  addressIsOutOfHoursRadioList: Radio[] = [
    {
      label: '指定なし',
      value: '0',
      initialIsChecked: false,
    },
    {
      label: '有',
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
    this.setDefaultRadio(this.currentLocationIsOutOfHoursRadioList, this.currentLocationIsOutOfHours);
    this.setDefaultRadio(this.addressIsOutOfHoursRadioList, this.addressIsOutOfHours);
  }

  setDefaultRadio(radioList: Radio[], value: string) {
    switch (value) {
      case '0':
        radioList[0].initialIsChecked = true;
        break;
      case '1':
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
      case 'currentLocationIsOutOfHours':
        this.currentLocationIsOutOfHours = searchRequirement.radioMetaData.value;
        break;
      case 'addressIsOutOfHours':
        this.addressIsOutOfHours = searchRequirement.radioMetaData.value;
        break;
    }
  }

  onCurrentLocationSearch() {
    sessionStorage.setItem('pharmacyCurrentLocationIsOutOfHours', this.currentLocationIsOutOfHours);
    this.router.navigate(['/pharmacies/current-location'], {
      queryParams: {
        is_out_of_hours: this.currentLocationIsOutOfHours,
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
    sessionStorage.setItem('pharmacyTodofuken', this.selectedTodofuken);
    sessionStorage.setItem('pharmacyShikuchoson', this.selectedShikuchoson);
    sessionStorage.setItem('pharmacyAddressIsOutOfHours', this.addressIsOutOfHours);
    this.router.navigate(['/pharmacies/address'], {
      queryParams: {
        todofuken: this.selectedTodofuken,
        shikuchoson: this.selectedShikuchoson,
        is_out_of_hours: this.addressIsOutOfHours,
      },
    });
  }

  isTodofukenAndShikuchosonSelected() {
    return this.selectedTodofuken !== '' && this.selectedShikuchoson !== '';
  }
}
