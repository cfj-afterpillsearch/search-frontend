import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Addresses } from '../../../shared/types/addresses';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-search',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.css'],
  standalone: true,
  imports: [ButtonComponent, FormsModule, NgFor],
})
export class PharmaciesComponent implements OnInit {
  addresses: Addresses = {};
  prefectures: string[] = [];
  municipalities: string[] = [];
  selectedPrefecture = '';
  selectedMunicipality = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Addresses>('assets/addresses.json').subscribe((data) => {
      this.addresses = data;
      this.prefectures = Object.keys(data);
    });
  }

  onPrefectureChange() {
    this.municipalities = this.addresses[this.selectedPrefecture] || [];
  }

  onAddressSearch() {
    this.router.navigate(['/pharmacies/address'], {
      queryParams: {
        todofuken: this.selectedPrefecture,
        shikuchoson: this.selectedMunicipality,
      },
    });
  }
}
