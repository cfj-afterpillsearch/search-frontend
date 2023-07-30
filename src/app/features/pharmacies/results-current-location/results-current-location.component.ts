import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../../shared/pharmacy';
import { PharmacyService } from '../../../shared/pharmacy.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './results-current-location.component.html',
  styleUrls: ['./results-current-location.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class ResultsCurrentLocationComponent implements OnInit {
  pharmacies: Pharmacy[] = [];

  constructor(private pharmacyService: PharmacyService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getPharmaciesByCurrentLocation();
  }

  getPharmaciesByCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.pharmacyService
          .getPharmaciesByCurrentLocation(latitude, longitude)
          .subscribe((apiResponse) => {
            this.pharmacies = apiResponse.results;
          });
      },
      (error) => {
        console.error('現在地の取得に失敗しました', error);
      },
    );
  }
}
