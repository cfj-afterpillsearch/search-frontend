import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../../shared/pharmacy';
import { ApiService } from '../../../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PharmacyCardComponent } from '../../../shared/ui/pharmacy-card/pharmacy-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './results-address.component.html',
  styleUrls: ['./results-address.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, PharmacyCardComponent, AreaTitleCardComponent],
})
export class ResultsAddressComponent implements OnInit {
  pharmacies: Pharmacy[] = [];
  prefecture = '';
  municipality = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.prefecture = params['todofuken'];
      this.municipality = params['shikuchoson'];
      this.getPharmaciesByAddress();
    });
  }

  getPharmaciesByAddress() {
    this.apiService
      .getPharmaciesByAddress(this.prefecture, this.municipality)
      .subscribe((apiResponse) => (this.pharmacies = apiResponse.results));
  }
}
