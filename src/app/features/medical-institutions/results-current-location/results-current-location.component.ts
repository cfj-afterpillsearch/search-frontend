import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { ApiService } from '../../../shared/api.service';
import { NgFor, NgIf } from '@angular/common';
import { MedicalInstitutionCardComponent } from '../../../shared/ui/medical-institution-card/medical-institution-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApsPaginationComponent } from 'src/app/shared/ui/aps-pagination/aps-pagination.component';
import { Location } from '@angular/common';

declare const google: any; // Google Maps APIを使用するための宣言

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
  isLoading = true;
  canGetLocation = true;
  isOpenSunday = '';
  isOpenHoliday = '';
  currentPage = 1;
  totalPages = 1;
  pageList: number[] = [];
  map: any = null;
  selectedIndex: number | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isOpenSunday = params['is_open_sunday'];
      this.isOpenHoliday = params['is_open_holiday'];
      this.overwritePageParamater(1);
      this.getMedicalInstitutionsByCurrentLocation();
    });
  }

  // google mapsの初期化
  initMap(center: { lat: number; lng: number }) {
    const _map = new google.maps.Map(document.getElementById('map'), {
      center,
      zoom: 14,
    });

    // 現在地のピン
    new google.maps.Marker({
      position: center,
      map: _map,
      title: '現在地',
    }).addListener('click', () => {
      _map.panTo(center);
    });

    // 医療機関のピン（medicalInstitutions配列を利用）
    this.medicalInstitutions.forEach((institution, idx) => {
      if (institution.location.lat && institution.location.lng) {
        const marker = new google.maps.Marker({
          position: { lat: institution.location.lat, lng: institution.location.lng },
          map: _map,
          title: institution.name, // 医療機関名など
          icon: 'https://img.icons8.com/?size=30&id=14807&format=png&color=000000',
        });

        marker.addListener('click', () => {
          _map.panTo(marker.getPosition());
          this.selectedIndex = idx;

          // indexベースのidにスクロール
          const targetId = 'medical-institution-' + idx;
          this.scrollToListItem(targetId);
        });
      }
    });
    this.map = _map;
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
          .subscribe({
            next: (apiResponse) => {
              this.medicalInstitutions = apiResponse.results;
              this.todofuken = apiResponse.meta.address_todofuken;
              this.shikuchoson = apiResponse.meta.address_shikuchoson;
              this.totalItems = apiResponse.meta.totalItems;
              this.totalPages = apiResponse.meta.totalPages;
              this.isLoading = false;
              // Angularの描画が終わった後に地図を初期化
              setTimeout(() => {
                this.initMap({ lat: latitude, lng: longitude });
              });
            },
            error: (error: HttpErrorResponse) => {
              this.router.navigate(['error', error.status]);
            },
          });
      },
      () => {
        this.isLoading = false;
        this.canGetLocation = false;
      },
    );
  }

  overwritePageParamater(page: number) {
    this.location.replaceState(
      '/medical-institutions/current-location',
      ('&is_open_sunday=' +
        this.isOpenSunday +
        '&is_open_holiday=' +
        this.isOpenHoliday +
        '&page=' +
        page) as unknown as string,
    );
  }

  pager(page: number) {
    this.currentPage = page;
    this.overwritePageParamater(this.currentPage);
    this.getMedicalInstitutionsByCurrentLocation();
  }

  private scrollToListItem(elementId: string) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      (el as HTMLElement).focus();
    } else {
      console.warn('scroll target not found:', elementId);
    }
  }
}
