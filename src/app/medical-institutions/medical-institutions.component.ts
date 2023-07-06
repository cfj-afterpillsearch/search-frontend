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

        // this.medicalInstitutionService.getMedicalInstitutionsByCurrentLocation(latitude, longitude)
        //   .subscribe(medicalInstitutions => this.medicalInstitutions = medicalInstitutions);

        this.medicalInstitutions = [
          {
            name: '北里大学 北里研究所病院',
            address: '東京都渋谷区',
            url: 'https://hospital-a.example.com',
            tel: '03-3444-6161',
            memo_available_time: '平日 8：30-11：30土（第4除く） 8：30-11：30',
          },
          {
            name: '北里大学 北里研究所病院',
            address: '東京都渋谷区',
            url: 'https://hospital-b.example.com',
            tel: '03-3444-6161',
            memo_available_time: '平日 8：30-11：30土（第4除く） 8：30-11：30',
          },
        ];
      },
      (error) => {
        console.error('現在地の取得に失敗しました', error);
      }
    );
  }
}
