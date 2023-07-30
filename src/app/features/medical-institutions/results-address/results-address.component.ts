import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { ApiService } from '../../../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './results-address.component.html',
  styleUrls: ['./results-address.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class ResultsAddressComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];
  prefecture = '';
  municipality = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.prefecture = params['todofuken'];
      this.municipality = params['shikuchoson'];
      this.getMedicalInstitutionsByAddress();
    });
  }

  getMedicalInstitutionsByAddress() {
    this.apiService
      .getMedicalInstitutionsByAddress(this.prefecture, this.municipality)
      .subscribe((apiResponse) => (this.medicalInstitutions = apiResponse.results));
  }
}
