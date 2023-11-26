import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../../shared/pharmacy';
import { ApiService } from '../../../shared/api.service';
import { NgFor, NgIf } from '@angular/common';
import { PharmacyCardComponent } from '../../../shared/ui/pharmacy-card/pharmacy-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApsPaginationComponent } from 'src/app/shared/ui/aps-pagination/aps-pagination.component';

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

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isOutOfHours = params['is_out_of_hours'];
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
          .subscribe((apiResponse) => {
            this.pharmacies = apiResponse.results;
            this.todofuken = apiResponse.meta.address_todofuken;
            this.shikuchoson = apiResponse.meta.address_shikuchoson;
            this.totalItems = apiResponse.meta.totalItems;
            this.totalPages = apiResponse.meta.totalPages;
            this.loading = false;
            this.getPageList(this.totalPages);
          });
      },
      (error) => {
        console.error('現在地の取得に失敗しました', error);
      },
    );
  }

  getPageList(totalPages: number) {
    this.pageList = [];
    for (let i = 1; i <= totalPages; i++) {
      this.pageList.push(i);
    }
  }

  pager(page: number) {
    this.currentPage = page;
    this.router.navigate(['/pharmacies/current-location'], {
      queryParams: {
        is_out_of_hours: this.isOutOfHours,
        page: this.currentPage,
      },
    });
  }
}
