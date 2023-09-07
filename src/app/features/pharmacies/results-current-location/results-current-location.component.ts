import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../../shared/pharmacy';
import { ApiService } from '../../../shared/api.service';
import { NgFor, NgIf } from '@angular/common';
import { PharmacyCardComponent } from '../../../shared/ui/pharmacy-card/pharmacy-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './results-current-location.component.html',
  styleUrls: ['./results-current-location.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, PharmacyCardComponent, AreaTitleCardComponent],
})
export class ResultsCurrentLocationComponent implements OnInit {
  pharmacies: Pharmacy[] = [];
  todofuken = '';
  shikuchoson = '';
  totalItems = 0;
  loading = true;

  is_out_of_hours = '';
  
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.is_open_sunday = params['is_open_sunday'];
      this.is_open_holiday = params['is_open_holiday'];
      this.getPharmaciesByCurrentLocation();
    })
  }

  getPharmaciesByCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.apiService.getPharmaciesByCurrentLocation(latitude, longitude, this.is_out_of_hours).subscribe((apiResponse) => {
          this.pharmacies = apiResponse.results;
          this.todofuken = apiResponse.meta.address_todofuken;
          this.shikuchoson = apiResponse.meta.address_shikuchoson;
          this.totalItems = apiResponse.meta.totalItems;
          this.loading = false;
        });
      },
      (error) => {
        console.error('現在地の取得に失敗しました', error);
      },
    );
  }
}
