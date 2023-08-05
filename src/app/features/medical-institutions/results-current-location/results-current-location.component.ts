import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { ApiService } from '../../../shared/api.service';
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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getMedicalInstitutionsByCurrentLocation();
  }

  getMedicalInstitutionsByCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.apiService.getMedicalInstitutionsByCurrentLocation(latitude, longitude).subscribe((apiResponse) => {
          this.medicalInstitutions = apiResponse.results;
        });
      },
      (error) => {
        console.error('現在地の取得に失敗しました', error);
      },
    );
  }
}
