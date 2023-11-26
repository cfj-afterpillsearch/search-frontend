import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { ApiService } from '../../../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MedicalInstitutionCardComponent } from '../../../shared/ui/medical-institution-card/medical-institution-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ApsPaginationComponent } from 'src/app/shared/ui/aps-pagination/aps-pagination.component';
import { Location } from '@angular/common';=======

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './results-address.component.html',
  styleUrls: ['./results-address.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, MedicalInstitutionCardComponent, AreaTitleCardComponent, ApsPaginationComponent],
})
export class ResultsAddressComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];
  todofuken = '';
  shikuchoson = '';
  totalItems = 0;
  loading = true;
  isOpenSunday = '';
  isOpenHoliday = '';
  currentPage = 1;
  totalPages = 1;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.todofuken = params['todofuken'];
      this.shikuchoson = params['shikuchoson'];
      this.isOpenSunday = params['is_open_sunday'];
      this.isOpenHoliday = params['is_open_holiday'];
      this.currentPage = params['page'];
      this.getMedicalInstitutionsByAddress();
      this.overwritePageParamater();
    });
  }

  getMedicalInstitutionsByAddress() {
    this.apiService
      .getMedicalInstitutionsByAddress(
        this.todofuken,
        this.shikuchoson,
        this.isOpenSunday,
        this.isOpenHoliday,
        this.currentPage,
      )
      .subscribe({
        next: (apiResponse) => {
          this.medicalInstitutions = apiResponse.results;
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
        '/medical-institutions/address',
        'todofuken=' +
          this.todofuken +
          '&shikuchoson=' +
          this.shikuchoson +
          '&is_open_sunday=' +
          this.isOpenSunday +
          '&is_open_holiday=' +
          this.isOpenHoliday +
          '&page=1',
      );
    }
  }

  pager(page: number) {
    this.currentPage = page;
    this.router.navigate(['/medical-institutions/address'], {
      queryParams: {
        todofuken: this.todofuken,
        shikuchoson: this.shikuchoson,
        is_open_sunday: this.isOpenSunday,
        is_open_holiday: this.isOpenHoliday,
        page: this.currentPage,
      },
    });
  }
}
