import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../../shared/pharmacy';
import { ApiService } from '../../../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PharmacyCardComponent } from '../../../shared/ui/pharmacy-card/pharmacy-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ApsPaginationComponent } from 'src/app/shared/ui/aps-pagination/aps-pagination.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './results-address.component.html',
  styleUrls: ['./results-address.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, PharmacyCardComponent, AreaTitleCardComponent, ApsPaginationComponent],
})
export class ResultsAddressComponent implements OnInit {
  pharmacies: Pharmacy[] = [];
  todofuken = '';
  shikuchoson = '';
  totalItems = 0;
  loading = true;
  isOutOfHours = '';
  currentPage = 1;
  totalPages = 1;
  pageList: number[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.todofuken = params['todofuken'];
      this.shikuchoson = params['shikuchoson'];
      this.isOutOfHours = params['is_out_of_hours'];
      this.currentPage = params['page'];
      this.getPharmaciesByAddress();
      this.overwritePageParamater();
    });
  }

  getPharmaciesByAddress() {
    this.apiService
      .getPharmaciesByAddress(this.todofuken, this.shikuchoson, this.isOutOfHours, this.currentPage)
      .subscribe({
        next: (apiResponse) => {
          this.pharmacies = apiResponse.results;
          this.totalItems = apiResponse.meta.totalItems;
          this.totalPages = apiResponse.meta.totalPages;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.router.navigate(['error', error.status]);
        }
      });
  }

  overwritePageParamater() {
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
      this.location.replaceState(
        '/pharmacies/address',
        'todofuken=' +
          this.todofuken +
          '&shikuchoson=' +
          this.shikuchoson +
          '&is_out_of_hours=' +
          this.isOutOfHours +
          '&page=1',
      );
    }
  }

  pager(page: number) {
    this.currentPage = page;
    this.router.navigate(['/pharmacies/address'], {
      queryParams: {
        todofuken: this.todofuken,
        shikuchoson: this.shikuchoson,
        is_out_of_hours: this.isOutOfHours,
        page: this.currentPage,
      },
    });
  }
}
