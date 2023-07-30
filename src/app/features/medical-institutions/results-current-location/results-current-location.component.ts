import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { MedicalInstitutionService } from '../../../shared/medical-institution.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './results-current-location.component.html',
  styleUrls: ['./results-current-location.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class ResultsCurrentLocationComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];

  constructor(private medicalInstitutionService: MedicalInstitutionService) {}

  ngOnInit() {
    this.getMedicalInstitutionsByCurrentLocation();
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
}
