import { Component, OnInit } from '@angular/core';
import {MedicalInstitute} from "../medical-institute";

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './medical-institutions.component.html',
  styleUrls: ['./medical-institutions.component.css'],
})
export class MedicalInstitutionsComponent implements OnInit {
  medicalInstitutions: MedicalInstitute[] = [];

  ngOnInit() {
    this.getMedicalInstitutions();
  }

  getMedicalInstitutions() {
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
  }
}
