import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { ApiService } from '../../../shared/api.service';
import { NgFor, NgIf } from '@angular/common';
import { MedicalInstitutionCardComponent } from '../../../shared/ui/medical-institution-card/medical-institution-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApsPaginationComponent } from 'src/app/shared/ui/aps-pagination/aps-pagination.component';

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './results-current-location.component.html',
  styleUrls: ['./results-current-location.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, MedicalInstitutionCardComponent, AreaTitleCardComponent, ApsPaginationComponent],
})
export class ResultsCurrentLocationComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];
  todofuken = '';
  shikuchoson = '';
  totalItems = 0;
  loading = true;
  isOpenSunday = '';
  isOpenHoliday = '';
  currentPage = 1;
  totalPages = 1;
  pageList: number[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isOpenSunday = params['is_open_sunday'];
      this.isOpenHoliday = params['is_open_holiday'];
      this.getMedicalInstitutionsByCurrentLocation();
    });
  }

  getMedicalInstitutionsByCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.apiService
          .getMedicalInstitutionsByCurrentLocation(
            latitude,
            longitude,
            this.isOpenSunday,
            this.isOpenHoliday,
            this.currentPage,
          )
          .subscribe((apiResponse) => {
            this.medicalInstitutions = apiResponse.results;
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
    this.router.navigate(['/medical-institutions/current-location'], {
      queryParams: {
        is_open_sunday: this.isOpenSunday,
        is_open_holiday: this.isOpenHoliday,
        page: this.currentPage,
      },
    });
  }
}
