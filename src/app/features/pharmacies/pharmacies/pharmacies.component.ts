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
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.css'],
  standalone: true,
  imports: [ButtonComponent, SearchRequirementsRadioComponent, FormsModule, NgFor],
})
export class PharmaciesComponent implements OnInit {
  addresses: Addresses = {};
  todofukenList: string[] = [];
  shikuchosonList: string[] = [];
  selectedTodofuken = '';
  selectedShikuchoson = '';
  currentLocationHasEmergencyContact = '';
  addressHasEmergencyContact = '';

  searchRequirements: SearchRequirements = {
    first: {
      name: '指定なし',
      value: '',
    },
    second: {
      name: '有',
      value: '1',
    },
    third: {
      name: '無',
      value: '0',
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
      case 'currentLocationEmergencyContact':
        this.currentLocationHasEmergencyContact = radioMetaData.value;
        break;
      case 'addressEmergencyContact':
        this.addressHasEmergencyContact = radioMetaData.value;
        break;
    }
  }

  onCurrentLocationSearch() {
    this.router.navigate(['/pharmacies/current-location'], {
      queryParams: {
        is_out_of_hours: this.currentLocationHasEmergencyContact,
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
    this.router.navigate(['/pharmacies/address'], {
      queryParams: {
        todofuken: this.selectedTodofuken,
        shikuchoson: this.selectedShikuchoson,
        is_out_of_hours: this.addressHasEmergencyContact,
      },
    });
  }

  isTodofukenAndShikuchosonSelected() {
    return this.selectedTodofuken !== '' && this.selectedShikuchoson !== '';
  }
}
