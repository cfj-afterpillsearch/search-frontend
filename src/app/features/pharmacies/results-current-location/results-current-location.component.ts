import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../../shared/pharmacy';
import { ApiService } from '../../../shared/api.service';
import { NgFor, NgIf } from '@angular/common';
import { PharmacyCardComponent } from '../../../shared/ui/pharmacy-card/pharmacy-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApsPaginationComponent } from 'src/app/shared/ui/aps-pagination/aps-pagination.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './results-current-location.component.html',
  styleUrls: ['./results-current-location.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, PharmacyCardComponent, AreaTitleCardComponent, ApsPaginationComponent],
})
export class ResultsCurrentLocationComponent implements OnInit {
  pharmacies: Pharmacy[] = [];
  todofuken = '';
  shikuchoson = '';
  totalItems = 0;
  loading = true;
  isOutOfHours = '';
  currentPage = 1;
  totalPages = 1;
  pageList: number[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isOutOfHours = params['is_out_of_hours'];
      this.overwritePageParamater(1);
      this.getPharmaciesByCurrentLocation();
    });
  }

  getPharmaciesByCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.apiService
        .getPharmaciesByCurrentLocation(latitude, longitude, this.isOutOfHours, this.currentPage)
        .subscribe({
          next: (apiResponse) => {
            this.pharmacies = apiResponse.results;
            this.todofuken = apiResponse.meta.address_todofuken;
            this.shikuchoson = apiResponse.meta.address_shikuchoson;
            this.totalItems = apiResponse.meta.totalItems;
            this.totalPages = apiResponse.meta.totalPages;
            this.loading = false;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
            this.router.navigate(['/error']);
          }
        });
      },
      (error) => {
        console.error('現在地の取得に失敗しました', error);
      },
    );
  }

  overwritePageParamater(page: number) {
    this.location.replaceState(
      '/pharmacies/current-location',
      ('&is_out_of_hours=' + this.isOutOfHours + '&page=' + page) as unknown as string,
    );
  }

  pager(page: number) {
    this.currentPage = page;
    this.overwritePageParamater(this.currentPage);
    this.getPharmaciesByCurrentLocation();
  }
}
