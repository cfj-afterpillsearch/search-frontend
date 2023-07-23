import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../shared/medical-institution';
import { MedicalInstitutionService } from '../../shared/medical-institution.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './medical-institutions.component.html',
  styleUrls: ['./medical-institutions.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class MedicalInstitutionsComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];
  prefecture = '';
  municipality = '';

  constructor(private medicalInstitutionService: MedicalInstitutionService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe((urlSegments) => {
      const searchType = urlSegments[1].path;
      if (searchType === 'current-location') {
        this.getMedicalInstitutionsByCurrentLocation();
      }
      if (searchType === 'address') {
        this.route.queryParams.subscribe((params) => {
          this.prefecture = params['todofuken'];
          this.municipality = params['shikuchoson'];
          this.getMedicalInstitutionsByAddress();
        });
      }
    });
  }

  getMedicalInstitutionsByCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.medicalInstitutionService
          .getMedicalInstitutionsByCurrentLocation(latitude, longitude)
          .subscribe((apiResponse) => {
            this.medicalInstitutions = apiResponse.results;
          });
      },
      (error) => {
        console.error('現在地の取得に失敗しました', error);
      },
    );
  }

  getMedicalInstitutionsByAddress() {
    this.medicalInstitutionService
      .getMedicalInstitutionsByAddress(this.prefecture, this.municipality)
      .subscribe((apiResponse) => (this.medicalInstitutions = apiResponse.results));
  }
}
