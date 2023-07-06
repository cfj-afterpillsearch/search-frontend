import { Component, OnInit } from '@angular/core';
import {MedicalInstitution} from "../medical-institution";
import {MedicalInstitutionService} from "../medical-institution.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './medical-institutions.component.html',
  styleUrls: ['./medical-institutions.component.css'],
})
export class MedicalInstitutionsComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];

  constructor(private medicalInstitutionService: MedicalInstitutionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments.map(segment => segment.path).join('/');
      if (path === 'medical-institutions/current-location') {
        this.getMedicalInstitutionsByCurrentLocation();
      }
      if (path === 'medical-institutions/address') {
        // TODO
      }
    });
  }

  getMedicalInstitutionsByCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.medicalInstitutionService.getMedicalInstitutionsByCurrentLocation(latitude, longitude)
          .subscribe(medicalInstitutions => this.medicalInstitutions = medicalInstitutions);
      },
      (error) => {
        console.error('現在地の取得に失敗しました', error);
      }
    );
  }
}
