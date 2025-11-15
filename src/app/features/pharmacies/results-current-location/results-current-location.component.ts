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

declare const google: any; // Google Maps APIを使用するための宣言

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
  isLoading = true;
  canGetLocation = true;
  isOutOfHours = '';
  currentPage = 1;
  totalPages = 1;
  pageList: number[] = [];
  map: any = null;
  selectedIndex: number | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isOutOfHours = params['is_out_of_hours'];
      this.overwritePageParamater(1);
      this.getPharmaciesByCurrentLocation();
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
    this.pharmacies.forEach((pharmacy, idx) => {
      if (pharmacy.location.lat && pharmacy.location.lng) {
        const marker = new google.maps.Marker({
          position: { lat: pharmacy.location.lat, lng: pharmacy.location.lng },
          map: _map,
          title: pharmacy.name,
          icon: 'https://img.icons8.com/?size=30&id=14807&format=png&color=000000',
        });

        marker.addListener('click', () => {
          _map.panTo(marker.getPosition());
          this.selectedIndex = idx;

          // indexベースのidにスクロール
          const targetId = 'pharmacy-' + idx;
          this.scrollToListItem(targetId);
        });
      }
    });
    this.map = _map;
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
      '/pharmacies/current-location',
      ('&is_out_of_hours=' + this.isOutOfHours + '&page=' + page) as unknown as string,
    );
  }

  pager(page: number) {
    this.currentPage = page;
    this.overwritePageParamater(this.currentPage);
    this.getPharmaciesByCurrentLocation();
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
