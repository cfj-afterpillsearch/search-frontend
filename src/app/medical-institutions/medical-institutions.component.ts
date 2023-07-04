import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './medical-institutions.component.html',
  styleUrls: ['./medical-institutions.component.css'],
})
export class MedicalInstitutionsComponent implements OnInit {
  currentLocation = '';
  medicalInstitutions: unknown[] = [];

  ngOnInit() {
    this.getCurrentLocation();
    this.getMedicalInstitutions();
  }

  getCurrentLocation() {
    this.currentLocation = '東京都';
  }

  getMedicalInstitutions() {
    this.medicalInstitutions = [
      {
        name: '北里大学 北里研究所病院',
        address: '東京都渋谷区',
        website: 'https://hospital-a.example.com',
        phoneNumber: '03-3444-6161',
        officeHours: '平日 8：30-11：30土（第4除く） 8：30-11：30',
      },
      {
        name: '北里大学 北里研究所病院',
        address: '東京都渋谷区',
        website: 'https://hospital-b.example.com',
        phoneNumber: '03-3444-6161',
        officeHours: '平日 8：30-11：30土（第4除く） 8：30-11：30',
      },
    ];
  }
}
