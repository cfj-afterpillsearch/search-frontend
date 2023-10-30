import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { ApiService } from '../../../shared/api.service';
import { NgFor, NgIf } from '@angular/common';
import { MedicalInstitutionCardComponent } from '../../../shared/ui/medical-institution-card/medical-institution-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './results-current-location.component.html',
  styleUrls: ['./results-current-location.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, MedicalInstitutionCardComponent, AreaTitleCardComponent],
})
export class ResultsCurrentLocationComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];
  todofuken = '';
  shikuchoson = '';
  totalItems = 0;
  loading = true;
  is_open_sunday = '';
  is_open_holiday = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.is_open_sunday = params['is_open_sunday'];
      this.is_open_holiday = params['is_open_holiday'];
      this.getMedicalInstitutionsByCurrentLocation();
    });
  }

  getMedicalInstitutionsByCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.apiService
          .getMedicalInstitutionsByCurrentLocation(latitude, longitude, this.is_open_sunday, this.is_open_holiday)
          .subscribe({
            next: (apiResponse) => {
              this.medicalInstitutions = apiResponse.results;
            this.todofuken = apiResponse.meta.address_todofuken;
            this.shikuchoson = apiResponse.meta.address_shikuchoson;
            this.totalItems = apiResponse.meta.totalItems;
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
}
