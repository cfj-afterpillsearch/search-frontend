import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../../shared/pharmacy';
import { ApiService } from '../../../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PharmacyCardComponent } from '../../../shared/ui/pharmacy-card/pharmacy-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { LoadingSpinnerComponent } from '../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './results-address.component.html',
  styleUrls: ['./results-address.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, PharmacyCardComponent, AreaTitleCardComponent, LoadingSpinnerComponent],
})
export class ResultsAddressComponent implements OnInit {
  pharmacies: Pharmacy[] = [];
  todofuken = '';
  shikuchoson = '';
  loading = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.todofuken = params['todofuken'];
      this.shikuchoson = params['shikuchoson'];
      this.getPharmaciesByAddress();
    });
  }

  getPharmaciesByAddress() {
    this.apiService
      .getPharmaciesByAddress(this.todofuken, this.shikuchoson)
      .subscribe((apiResponse) => {
        this.pharmacies = apiResponse.results;
        this.loading = false;
      });
  }
}
